-- =============================================================================
-- AI credits free grant — Redash funnel (Snowflake / bigbrain.final.events)
-- =============================================================================
-- Steps (two parallel cohorts, same downstream):
--   Funnel A — denominator: first ai_credits_free_grant_on_done in date range
--     1 Completed grant → 2 First AI try (after done, within W days)
--     → 3 Credits consumed (after first try, within W days of that try)
--   Funnel B — denominator: first ai_credits_free_grant_on_close in date range
--     1 Dismiss (X) → 2 First AI try (after close, within W) → 3 Consume (after try, within W of try)
--
-- Impression / UX (not sequential with the two cohorts):
--   users_on_show — distinct users with on_show in the same date range (edit if needed).
--
-- CONFIGURE (search below):
--   * try_events   — replace VALUES with your canonical “first meaningful AI use” event name(s).
--   * consume_events — replace VALUES with credit debit / consumption event name(s).
--   * window_days — lookforward window W (days) from entry (done_at or first_close_at, then try).
--
-- Redash parameters:
--   * date_range (Date Range) → {{ date_range.start }} / {{ date_range.end }}
--   * Optional: duplicate query and set window_days in params, or replace 7 with {{ window_days }}
--     if you add a Number parameter named window_days in Redash.
--
-- Visualization:
--   * Funnel chart: use SECTION B result — filter or split by funnel_name (After on_done vs After on_close).
--   * Table / KPI row: run SECTION A only.
--
-- Caveat: done and close cohorts can overlap the same user in the window; see overlap_users in SECTION A.
-- =============================================================================

--------------------------------------------------------------------------------
-- SECTION A — One KPI row (counts + rates)
--------------------------------------------------------------------------------
WITH params AS (
  SELECT
    DATE('{{date_range.start}}') AS start_date,
    DATE('{{date_range.end}}')   AS end_date,
    7 AS window_days
),

-- >>> CONFIGURE: first meaningful AI try (one or more event names from events catalog)
try_events AS (
  SELECT column1 AS n FROM VALUES
    ('__REPLACE_FIRST_AI_TRY_EVENT__')
),

-- >>> CONFIGURE: credit consumption / debit tied to metered AI
consume_events AS (
  SELECT column1 AS n FROM VALUES
    ('__REPLACE_AI_CREDITS_CONSUMED_EVENT__')
),

-- Pull grant + downstream events in [start_date, end_date + W] so lookforward is covered
ev_window AS (
  SELECT
    e.pulse_account_id,
    e.pulse_user_id,
    e.name,
    e.created_at
  FROM bigbrain.final.events e
  CROSS JOIN params p
  WHERE DATE(e.created_at) BETWEEN p.start_date AND DATEADD(day, p.window_days, p.end_date)
    AND (
      e.name IN (
        'ai_credits_free_grant_on_show',
        'ai_credits_free_grant_on_close',
        'ai_credits_free_grant_on_done'
      )
      OR e.name IN (SELECT n FROM try_events)
      OR e.name IN (SELECT n FROM consume_events)
    )
),

done_cohort AS (
  SELECT
    e.pulse_account_id,
    e.pulse_user_id,
    MIN(e.created_at) AS entry_at
  FROM bigbrain.final.events e
  CROSS JOIN params p
  WHERE e.name = 'ai_credits_free_grant_on_done'
    AND DATE(e.created_at) BETWEEN p.start_date AND p.end_date
  GROUP BY 1, 2
),

close_cohort AS (
  SELECT
    e.pulse_account_id,
    e.pulse_user_id,
    MIN(e.created_at) AS entry_at
  FROM bigbrain.final.events e
  CROSS JOIN params p
  WHERE e.name = 'ai_credits_free_grant_on_close'
    AND DATE(e.created_at) BETWEEN p.start_date AND p.end_date
  GROUP BY 1, 2
),

show_users AS (
  SELECT DISTINCT e.pulse_account_id, e.pulse_user_id
  FROM bigbrain.final.events e
  CROSS JOIN params p
  WHERE e.name = 'ai_credits_free_grant_on_show'
    AND DATE(e.created_at) BETWEEN p.start_date AND p.end_date
),

done_with_try AS (
  SELECT
    d.pulse_account_id,
    d.pulse_user_id,
    d.entry_at,
    MIN(t.created_at) AS first_try_at
  FROM done_cohort d
  INNER JOIN ev_window t
    ON t.pulse_account_id = d.pulse_account_id
   AND t.pulse_user_id = d.pulse_user_id
   AND t.name IN (SELECT n FROM try_events)
  CROSS JOIN params p
  WHERE t.created_at > d.entry_at
    AND t.created_at <= DATEADD(day, p.window_days, d.entry_at)
  GROUP BY 1, 2, 3
),

done_try_consume AS (
  SELECT
    dwt.pulse_account_id,
    dwt.pulse_user_id,
    dwt.entry_at,
    dwt.first_try_at,
    MIN(c.created_at) AS first_consume_at
  FROM done_with_try dwt
  INNER JOIN ev_window c
    ON c.pulse_account_id = dwt.pulse_account_id
   AND c.pulse_user_id = dwt.pulse_user_id
   AND c.name IN (SELECT n FROM consume_events)
  CROSS JOIN params p
  WHERE c.created_at > dwt.first_try_at
    AND c.created_at <= DATEADD(day, p.window_days, dwt.first_try_at)
  GROUP BY 1, 2, 3, 4
),

close_with_try AS (
  SELECT
    c.pulse_account_id,
    c.pulse_user_id,
    c.entry_at,
    MIN(t.created_at) AS first_try_at
  FROM close_cohort c
  INNER JOIN ev_window t
    ON t.pulse_account_id = c.pulse_account_id
   AND t.pulse_user_id = c.pulse_user_id
   AND t.name IN (SELECT n FROM try_events)
  CROSS JOIN params p
  WHERE t.created_at > c.entry_at
    AND t.created_at <= DATEADD(day, p.window_days, c.entry_at)
  GROUP BY 1, 2, 3
),

close_try_consume AS (
  SELECT
    cwt.pulse_account_id,
    cwt.pulse_user_id,
    cwt.entry_at,
    cwt.first_try_at,
    MIN(x.created_at) AS first_consume_at
  FROM close_with_try cwt
  INNER JOIN ev_window x
    ON x.pulse_account_id = cwt.pulse_account_id
   AND x.pulse_user_id = cwt.pulse_user_id
   AND x.name IN (SELECT n FROM consume_events)
  CROSS JOIN params p
  WHERE x.created_at > cwt.first_try_at
    AND x.created_at <= DATEADD(day, p.window_days, cwt.first_try_at)
  GROUP BY 1, 2, 3, 4
),

counts AS (
  SELECT
    (SELECT COUNT(DISTINCT CONCAT(pulse_account_id, ':', pulse_user_id)) FROM show_users) AS users_on_show,
    (SELECT COUNT(*) FROM done_cohort) AS users_done_entry,
    (SELECT COUNT(*) FROM close_cohort) AS users_close_entry,
    (SELECT COUNT(*) FROM done_with_try) AS users_done_then_try,
    (SELECT COUNT(*) FROM done_try_consume) AS users_done_try_consume,
    (SELECT COUNT(*) FROM close_with_try) AS users_close_then_try,
    (SELECT COUNT(*) FROM close_try_consume) AS users_close_try_consume,
    (
      SELECT COUNT(DISTINCT CONCAT(d.pulse_account_id, ':', d.pulse_user_id))
      FROM done_cohort d
      INNER JOIN close_cohort c
        ON c.pulse_account_id = d.pulse_account_id
       AND c.pulse_user_id = d.pulse_user_id
    ) AS overlap_done_and_close_users
  FROM params
)

SELECT
  c.*,
  ROUND(c.users_done_then_try / NULLIF(c.users_done_entry, 0), 4) AS rate_try_after_done,
  ROUND(c.users_done_try_consume / NULLIF(c.users_done_then_try, 0), 4) AS rate_consume_after_try_given_done_cohort,
  ROUND(c.users_done_try_consume / NULLIF(c.users_done_entry, 0), 4) AS rate_consume_after_done_end_to_end,
  ROUND(c.users_close_then_try / NULLIF(c.users_close_entry, 0), 4) AS rate_try_after_close,
  ROUND(c.users_close_try_consume / NULLIF(c.users_close_then_try, 0), 4) AS rate_consume_after_try_given_close_cohort,
  ROUND(c.users_close_try_consume / NULLIF(c.users_close_entry, 0), 4) AS rate_consume_after_close_end_to_end,
  ROUND(c.users_done_entry / NULLIF(c.users_on_show, 0), 4) AS rate_done_per_show,
  ROUND(c.users_close_entry / NULLIF(c.users_on_show, 0), 4) AS rate_close_per_show
FROM counts c;

--------------------------------------------------------------------------------
-- SECTION B — Long format for Redash Funnel viz (filter by funnel_name)
-- Run separately from SECTION A (two statements).
--------------------------------------------------------------------------------
WITH params AS (
  SELECT
    DATE('{{date_range.start}}') AS start_date,
    DATE('{{date_range.end}}')   AS end_date,
    7 AS window_days
),

try_events AS (
  SELECT column1 AS n FROM VALUES
    ('__REPLACE_FIRST_AI_TRY_EVENT__')
),

consume_events AS (
  SELECT column1 AS n FROM VALUES
    ('__REPLACE_AI_CREDITS_CONSUMED_EVENT__')
),

ev_window AS (
  SELECT
    e.pulse_account_id,
    e.pulse_user_id,
    e.name,
    e.created_at
  FROM bigbrain.final.events e
  CROSS JOIN params p
  WHERE DATE(e.created_at) BETWEEN p.start_date AND DATEADD(day, p.window_days, p.end_date)
    AND (
      e.name IN (
        'ai_credits_free_grant_on_show',
        'ai_credits_free_grant_on_close',
        'ai_credits_free_grant_on_done'
      )
      OR e.name IN (SELECT n FROM try_events)
      OR e.name IN (SELECT n FROM consume_events)
    )
),

done_cohort AS (
  SELECT e.pulse_account_id, e.pulse_user_id, MIN(e.created_at) AS entry_at
  FROM bigbrain.final.events e
  CROSS JOIN params p
  WHERE e.name = 'ai_credits_free_grant_on_done'
    AND DATE(e.created_at) BETWEEN p.start_date AND p.end_date
  GROUP BY 1, 2
),

close_cohort AS (
  SELECT e.pulse_account_id, e.pulse_user_id, MIN(e.created_at) AS entry_at
  FROM bigbrain.final.events e
  CROSS JOIN params p
  WHERE e.name = 'ai_credits_free_grant_on_close'
    AND DATE(e.created_at) BETWEEN p.start_date AND p.end_date
  GROUP BY 1, 2
),

done_with_try AS (
  SELECT d.pulse_account_id, d.pulse_user_id, d.entry_at, MIN(t.created_at) AS first_try_at
  FROM done_cohort d
  INNER JOIN ev_window t
    ON t.pulse_account_id = d.pulse_account_id AND t.pulse_user_id = d.pulse_user_id
   AND t.name IN (SELECT n FROM try_events)
  CROSS JOIN params p
  WHERE t.created_at > d.entry_at
    AND t.created_at <= DATEADD(day, p.window_days, d.entry_at)
  GROUP BY 1, 2, 3
),

done_try_consume AS (
  SELECT dwt.pulse_account_id, dwt.pulse_user_id, dwt.entry_at, dwt.first_try_at, MIN(c.created_at) AS first_consume_at
  FROM done_with_try dwt
  INNER JOIN ev_window c
    ON c.pulse_account_id = dwt.pulse_account_id AND c.pulse_user_id = dwt.pulse_user_id
   AND c.name IN (SELECT n FROM consume_events)
  CROSS JOIN params p
  WHERE c.created_at > dwt.first_try_at
    AND c.created_at <= DATEADD(day, p.window_days, dwt.first_try_at)
  GROUP BY 1, 2, 3, 4
),

close_with_try AS (
  SELECT c.pulse_account_id, c.pulse_user_id, c.entry_at, MIN(t.created_at) AS first_try_at
  FROM close_cohort c
  INNER JOIN ev_window t
    ON t.pulse_account_id = c.pulse_account_id AND t.pulse_user_id = c.pulse_user_id
   AND t.name IN (SELECT n FROM try_events)
  CROSS JOIN params p
  WHERE t.created_at > c.entry_at
    AND t.created_at <= DATEADD(day, p.window_days, c.entry_at)
  GROUP BY 1, 2, 3
),

close_try_consume AS (
  SELECT cwt.pulse_account_id, cwt.pulse_user_id, cwt.entry_at, cwt.first_try_at, MIN(x.created_at) AS first_consume_at
  FROM close_with_try cwt
  INNER JOIN ev_window x
    ON x.pulse_account_id = cwt.pulse_account_id AND x.pulse_user_id = cwt.pulse_user_id
   AND x.name IN (SELECT n FROM consume_events)
  CROSS JOIN params p
  WHERE x.created_at > cwt.first_try_at
    AND x.created_at <= DATEADD(day, p.window_days, cwt.first_try_at)
  GROUP BY 1, 2, 3, 4
)

SELECT 'After on_done' AS funnel_name, 1 AS step_order, '1 Completed grant (on_done)' AS step, COUNT(*) AS users
FROM done_cohort
UNION ALL
SELECT 'After on_done', 2, '2 First AI try (within W)', COUNT(*)
FROM done_with_try
UNION ALL
SELECT 'After on_done', 3, '3 Credits consumed (within W of try)', COUNT(*)
FROM done_try_consume
UNION ALL
SELECT 'After on_close', 1, '1 Dismissed — X (on_close)', COUNT(*)
FROM close_cohort
UNION ALL
SELECT 'After on_close', 2, '2 First AI try (within W)', COUNT(*)
FROM close_with_try
UNION ALL
SELECT 'After on_close', 3, '3 Credits consumed (within W of try)', COUNT(*)
FROM close_try_consume
ORDER BY funnel_name, step_order;
