-- AI Agents admin email → in-product outcomes (Snowflake / Redash)
--
-- Funnel story (simple):
--   1) Email sent → 2) delivered → 3) opened or clicked
--   4) Same users who ALSO (within the same rolling window) either:
--        · ran a published platform agent (success), OR
--        · consumed AI trial credits (L3 trial features daily)
--
-- Join: Braze EXTERNAL_USER_ID = monday pulse_user_id (cast numeric).
--
-- Nuances (validate with your data owner if needed):
--   · Agent runs are NOT “trial credits” in the product sense — trial consumption
--     is tracked in fact_users_trial_ai_features_daily; agents are dim_monday_agents_runs.
--   · Attribution here is calendar cohorted (last 14d) on all legs — not strict
--     “after first email timestamp”. Tighten with per-user MIN(email_time) if you need it.
--
-- Redash: run block A (wide) or uncomment block B (funnel viz).
-- Agents table: use run_triggered_by_pulse_user_id (not pulse_user_id); boolean = TRUE not IS TRUE.

--------------------------------------------------------------------------------
-- A) WIDE — one row: email steps + downstream OR-outcome + splits
--------------------------------------------------------------------------------
WITH params AS (
    SELECT DATEADD(day, -14, CURRENT_DATE()) AS d_start
),
braze_raw AS (
    SELECT
        TRY_TO_NUMBER(e.EXTERNAL_USER_ID) AS pulse_user_id,
        e.KIND AS kind,
        e.TIME AS event_time
    FROM bigbrain.L2.BRAZE_MARKETING_EVENTS e
    CROSS JOIN params p
    WHERE e.SOURCE = 'braze'
      AND e.EXTERNAL_USER_ID IS NOT NULL
      AND TRY_TO_NUMBER(e.EXTERNAL_USER_ID) IS NOT NULL
      AND e.KIND IN ('send', 'delivery', 'open', 'click')
      AND e.TIME >= p.d_start
      AND e.CAMPAIGN_NAME IN (
            'AI_agents_admins_30K_pro_below_email_body_test_11052026',
            'AI_agents_admins_above_15_seats_pro_below_email_06052026',
            'AI_agents_admins_15seats_pro_below_email_06052026'
      )
),
email_users AS (
    SELECT
        pulse_user_id,
        MAX(CASE WHEN kind = 'send' THEN 1 ELSE 0 END) AS had_send,
        MAX(CASE WHEN kind = 'delivery' THEN 1 ELSE 0 END) AS had_delivery,
        MAX(CASE WHEN kind IN ('open', 'click') THEN 1 ELSE 0 END) AS had_engaged
    FROM braze_raw
    GROUP BY 1
),
email_counts AS (
    SELECT
        COUNT(DISTINCT CASE WHEN had_send = 1 THEN pulse_user_id END) AS users_sent,
        COUNT(DISTINCT CASE WHEN had_delivery = 1 THEN pulse_user_id END) AS users_delivered,
        COUNT(DISTINCT CASE WHEN had_engaged = 1 THEN pulse_user_id END) AS users_engaged_open_or_click
    FROM email_users
),
delivered_cohort AS (
    SELECT pulse_user_id
    FROM email_users
    WHERE had_delivery = 1
),
agent_users AS (
    SELECT DISTINCT mar.run_triggered_by_pulse_user_id AS pulse_user_id
    FROM bigbrain.l3.dim_monday_agents_runs mar
    CROSS JOIN params p
    INNER JOIN delivered_cohort d ON d.pulse_user_id = mar.run_triggered_by_pulse_user_id
    WHERE mar.run_started_at >= p.d_start
      AND mar.is_published_agent_run = TRUE
      AND mar.run_finish_status = 'success'
      AND mar.run_triggered_by_pulse_user_id IS NOT NULL
),
trial_credit_users AS (
    SELECT DISTINCT f.pulse_user_id
    FROM bigbrain.l3.fact_users_trial_ai_features_daily f
    CROSS JOIN params p
    INNER JOIN delivered_cohort d ON d.pulse_user_id = f.pulse_user_id
    WHERE f.day >= p.d_start
      AND f.num_credits_consumed > 0
      AND f.pulse_user_id IS NOT NULL
),
either_outcome AS (
    SELECT pulse_user_id FROM agent_users
    UNION
    SELECT pulse_user_id FROM trial_credit_users
)
SELECT
    e.users_sent,
    e.users_delivered,
    e.users_engaged_open_or_click,
    (SELECT COUNT(*) FROM agent_users) AS users_delivered_then_agent_run,
    (SELECT COUNT(*) FROM trial_credit_users) AS users_delivered_then_trial_credits,
    (SELECT COUNT(*) FROM either_outcome) AS users_delivered_then_agent_or_trial_credits,
    ROUND(
        e.users_engaged_open_or_click / NULLIF(e.users_delivered, 0),
        4
    ) AS engagement_rate_vs_delivered,
    ROUND(
        (SELECT COUNT(*) FROM either_outcome) / NULLIF(e.users_delivered, 0),
        4
    ) AS downstream_rate_vs_delivered
FROM email_counts e;

--------------------------------------------------------------------------------
-- B) LONG FORMAT — Redash Funnel viz (Step = FUNNEL_STEP, Value = USERS)
--------------------------------------------------------------------------------
/*
WITH params AS (
    SELECT DATEADD(day, -14, CURRENT_DATE()) AS d_start
),
braze_raw AS (
    SELECT
        TRY_TO_NUMBER(e.EXTERNAL_USER_ID) AS pulse_user_id,
        e.KIND AS kind,
        e.TIME AS event_time
    FROM bigbrain.L2.BRAZE_MARKETING_EVENTS e
    CROSS JOIN params p
    WHERE e.SOURCE = 'braze'
      AND e.EXTERNAL_USER_ID IS NOT NULL
      AND TRY_TO_NUMBER(e.EXTERNAL_USER_ID) IS NOT NULL
      AND e.KIND IN ('send', 'delivery', 'open', 'click')
      AND e.TIME >= p.d_start
      AND e.CAMPAIGN_NAME IN (
            'AI_agents_admins_30K_pro_below_email_body_test_11052026',
            'AI_agents_admins_above_15_seats_pro_below_email_06052026',
            'AI_agents_admins_15seats_pro_below_email_06052026'
      )
),
email_users AS (
    SELECT
        pulse_user_id,
        MAX(CASE WHEN kind = 'send' THEN 1 ELSE 0 END) AS had_send,
        MAX(CASE WHEN kind = 'delivery' THEN 1 ELSE 0 END) AS had_delivery,
        MAX(CASE WHEN kind IN ('open', 'click') THEN 1 ELSE 0 END) AS had_engaged
    FROM braze_raw
    GROUP BY 1
),
agg AS (
    SELECT
        COUNT(DISTINCT CASE WHEN had_send = 1 THEN pulse_user_id END) AS users_sent,
        COUNT(DISTINCT CASE WHEN had_delivery = 1 THEN pulse_user_id END) AS users_delivered,
        COUNT(DISTINCT CASE WHEN had_engaged = 1 THEN pulse_user_id END) AS users_engaged,
        (
            SELECT COUNT(DISTINCT x.pulse_user_id)
            FROM (
                SELECT mar.run_triggered_by_pulse_user_id AS pulse_user_id
                FROM bigbrain.l3.dim_monday_agents_runs mar
                CROSS JOIN params p
                INNER JOIN email_users eu ON eu.pulse_user_id = mar.run_triggered_by_pulse_user_id AND eu.had_delivery = 1
                WHERE mar.run_started_at >= p.d_start
                  AND mar.is_published_agent_run = TRUE
                  AND mar.run_finish_status = 'success'
                  AND mar.run_triggered_by_pulse_user_id IS NOT NULL
                UNION
                SELECT f.pulse_user_id
                FROM bigbrain.l3.fact_users_trial_ai_features_daily f
                CROSS JOIN params p
                INNER JOIN email_users eu ON eu.pulse_user_id = f.pulse_user_id AND eu.had_delivery = 1
                WHERE f.day >= p.d_start
                  AND f.num_credits_consumed > 0
                  AND f.pulse_user_id IS NOT NULL
            ) x
        ) AS users_agent_or_trial
    FROM email_users
)
SELECT 1 AS step_order, '1 · Sent' AS funnel_step, users_sent AS users FROM agg
UNION ALL SELECT 2, '2 · Delivered', users_delivered FROM agg
UNION ALL SELECT 3, '3 · Open or click', users_engaged FROM agg
UNION ALL SELECT 4, '4 · Delivered + (agent run OR trial credits)', users_agent_or_trial FROM agg
ORDER BY step_order;
*/
