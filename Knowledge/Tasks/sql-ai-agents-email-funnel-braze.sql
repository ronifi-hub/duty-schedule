-- AI Agents / Pro-below email campaigns — Braze funnel (Snowflake)
-- Redash (edit in place): https://redash.bigbrain.me/queries/142579/source
-- Funnel viz: use **section C** only → New Visualization → **Funnel** → Step = FUNNEL_STEP, Value = USERS (sort STEP_ORDER).
-- Source: bigbrain.L2.BRAZE_MARKETING_EVENTS
-- Window: last 14 days (edit DATEADD as needed)
--
-- Campaign scope: **admin-named** Braze campaigns only (three sends with `_admins_` in the name).
-- Excluded here: `_users_*`, `AI_Agents_20K_accounts_*`. Uncomment those lines in the IN ( ) list
-- if you want accounts blasts or member sends in the same funnel.
-- Engagement rate (how to read the numbers)
--   * engagement_rate_vs_delivered — headline “did anything?” rate:
--       unique users with ≥1 open OR click / unique users with ≥1 delivery.
--       (Apple Mail Privacy etc. can inflate opens; clicks are the harder signal.)
--   * ctr_vs_delivered — “deep” engagement: unique clickers / delivered.
--   * ctor — of people who opened (or only clicked, if tracked as click), what % also clicked.
--   * engagement_rate_vs_sent — opened or clicked / sent (includes non-delivered; lower is normal).
--
-- Redash: run section A alone, or save as Query 1; copy section B to Query 2
-- (some clients error on two statements in one run).

--------------------------------------------------------------------------------
-- A) OVERALL FUNNEL (single row)
--------------------------------------------------------------------------------
WITH braze_events AS (
    SELECT
        e.CAMPAIGN_NAME AS campaign_name,
        e.CANVAS_STEP_NAME AS canvas_step_name,
        e.KIND AS kind,
        e.EXTERNAL_USER_ID AS user_id,
        e.TIME AS event_time
    FROM bigbrain.L2.BRAZE_MARKETING_EVENTS e
    WHERE e.SOURCE = 'braze'
      AND e.EXTERNAL_USER_ID IS NOT NULL
      AND e.KIND IN ('send', 'delivery', 'open', 'click')
      AND e.TIME >= DATEADD(day, -14, CURRENT_DATE)
      AND e.CAMPAIGN_NAME IN (
            'AI_agents_admins_30K_pro_below_email_body_test_11052026',
            'AI_agents_admins_above_15_seats_pro_below_email_06052026',
            'AI_agents_admins_15seats_pro_below_email_06052026'
      )
)

SELECT
    COUNT(DISTINCT CASE WHEN kind = 'send' THEN user_id END) AS users_sent,
    COUNT(DISTINCT CASE WHEN kind = 'delivery' THEN user_id END) AS users_delivered,
    COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END) AS users_engaged_open_or_click,
    COUNT(DISTINCT CASE WHEN kind = 'click' THEN user_id END) AS users_clicked,
    ROUND(
        COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind = 'delivery' THEN user_id END), 0),
        4
    ) AS engagement_rate_vs_delivered,
    ROUND(
        COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind = 'send' THEN user_id END), 0),
        4
    ) AS engagement_rate_vs_sent,
    ROUND(
        COUNT(DISTINCT CASE WHEN kind = 'click' THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind = 'delivery' THEN user_id END), 0),
        4
    ) AS ctr_vs_delivered,
    ROUND(
        COUNT(DISTINCT CASE WHEN kind = 'click' THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END), 0),
        4
    ) AS ctor,
    -- When delivery rows are sparse but opens exist
    ROUND(
        COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind IN ('delivery', 'open', 'click') THEN user_id END), 0),
        4
    ) AS open_rate_vs_delivered_or_engaged
FROM braze_events;

--------------------------------------------------------------------------------
-- B) FUNNEL BY CAMPAIGN (one row per campaign)
--------------------------------------------------------------------------------
WITH braze_events AS (
    SELECT
        e.CAMPAIGN_NAME AS campaign_name,
        e.KIND AS kind,
        e.EXTERNAL_USER_ID AS user_id,
        e.TIME AS event_time
    FROM bigbrain.L2.BRAZE_MARKETING_EVENTS e
    WHERE e.SOURCE = 'braze'
      AND e.EXTERNAL_USER_ID IS NOT NULL
      AND e.KIND IN ('send', 'delivery', 'open', 'click')
      AND e.TIME >= DATEADD(day, -14, CURRENT_DATE)
      AND e.CAMPAIGN_NAME IN (
            'AI_agents_admins_30K_pro_below_email_body_test_11052026',
            'AI_agents_admins_above_15_seats_pro_below_email_06052026',
            'AI_agents_admins_15seats_pro_below_email_06052026'
      )
)

SELECT
    campaign_name,
    COUNT(DISTINCT CASE WHEN kind = 'send' THEN user_id END) AS users_sent,
    COUNT(DISTINCT CASE WHEN kind = 'delivery' THEN user_id END) AS users_delivered,
    COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END) AS users_engaged_open_or_click,
    COUNT(DISTINCT CASE WHEN kind = 'click' THEN user_id END) AS users_clicked,
    ROUND(
        COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind = 'delivery' THEN user_id END), 0),
        4
    ) AS engagement_rate_vs_delivered,
    ROUND(
        COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind = 'send' THEN user_id END), 0),
        4
    ) AS engagement_rate_vs_sent,
    ROUND(
        COUNT(DISTINCT CASE WHEN kind = 'click' THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind = 'delivery' THEN user_id END), 0),
        4
    ) AS ctr_vs_delivered,
    ROUND(
        COUNT(DISTINCT CASE WHEN kind = 'click' THEN user_id END)
        / NULLIF(COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END), 0),
        4
    ) AS ctor
FROM braze_events
GROUP BY 1
ORDER BY users_sent DESC;

--------------------------------------------------------------------------------
-- C) REDASH FUNNEL CHART (long format — one row per funnel step)
--    Use this query alone in Redash, then: + New Visualization → Funnel
--    Map: Step column = FUNNEL_STEP (or STAGE_LABEL), Value column = USERS
--    Sort by: STEP_ORDER ascending
--    https://redash.bigbrain.me/queries/142579/source (or duplicate query and paste this block)
--------------------------------------------------------------------------------
WITH braze_events AS (
    SELECT
        e.CAMPAIGN_NAME AS campaign_name,
        e.KIND AS kind,
        e.EXTERNAL_USER_ID AS user_id,
        e.TIME AS event_time
    FROM bigbrain.L2.BRAZE_MARKETING_EVENTS e
    WHERE e.SOURCE = 'braze'
      AND e.EXTERNAL_USER_ID IS NOT NULL
      AND e.KIND IN ('send', 'delivery', 'open', 'click')
      AND e.TIME >= DATEADD(day, -14, CURRENT_DATE)
      AND e.CAMPAIGN_NAME IN (
            'AI_agents_admins_30K_pro_below_email_body_test_11052026',
            'AI_agents_admins_above_15_seats_pro_below_email_06052026',
            'AI_agents_admins_15seats_pro_below_email_06052026'
      )
),
agg AS (
    SELECT
        COUNT(DISTINCT CASE WHEN kind = 'send' THEN user_id END) AS users_sent,
        COUNT(DISTINCT CASE WHEN kind = 'delivery' THEN user_id END) AS users_delivered,
        COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END) AS users_engaged_open_or_click,
        COUNT(DISTINCT CASE WHEN kind = 'click' THEN user_id END) AS users_clicked
    FROM braze_events
)
SELECT
    1 AS step_order,
    '1 · Sent' AS funnel_step,
    users_sent AS users
FROM agg
UNION ALL
SELECT
    2 AS step_order,
    '2 · Delivered' AS funnel_step,
    users_delivered AS users
FROM agg
UNION ALL
SELECT
    3 AS step_order,
    '3 · Open or click' AS funnel_step,
    users_engaged_open_or_click AS users
FROM agg
UNION ALL
SELECT
    4 AS step_order,
    '4 · Clicked' AS funnel_step,
    users_clicked AS users
FROM agg
ORDER BY step_order;

--------------------------------------------------------------------------------
-- D) REDASH — same funnel, split by campaign (12 rows: 3 campaigns × 4 steps)
--    Visualization: Chart → Bar (stacked or grouped), X = FUNNEL_STEP, Y = USERS,
--    Group by CAMPAIGN_NAME — or use Pivot table. Native "Funnel" is usually one series.
--------------------------------------------------------------------------------
/*
WITH braze_events AS (
    SELECT
        e.CAMPAIGN_NAME AS campaign_name,
        e.KIND AS kind,
        e.EXTERNAL_USER_ID AS user_id,
        e.TIME AS event_time
    FROM bigbrain.L2.BRAZE_MARKETING_EVENTS e
    WHERE e.SOURCE = 'braze'
      AND e.EXTERNAL_USER_ID IS NOT NULL
      AND e.KIND IN ('send', 'delivery', 'open', 'click')
      AND e.TIME >= DATEADD(day, -14, CURRENT_DATE)
      AND e.CAMPAIGN_NAME IN (
            'AI_agents_admins_30K_pro_below_email_body_test_11052026',
            'AI_agents_admins_above_15_seats_pro_below_email_06052026',
            'AI_agents_admins_15seats_pro_below_email_06052026'
      )
),
per AS (
    SELECT
        campaign_name,
        COUNT(DISTINCT CASE WHEN kind = 'send' THEN user_id END) AS users_sent,
        COUNT(DISTINCT CASE WHEN kind = 'delivery' THEN user_id END) AS users_delivered,
        COUNT(DISTINCT CASE WHEN kind IN ('open', 'click') THEN user_id END) AS users_engaged_open_or_click,
        COUNT(DISTINCT CASE WHEN kind = 'click' THEN user_id END) AS users_clicked
    FROM braze_events
    GROUP BY 1
)
SELECT campaign_name, 1 AS step_order, '1 · Sent' AS funnel_step, users_sent AS users FROM per
UNION ALL SELECT campaign_name, 2, '2 · Delivered', users_delivered FROM per
UNION ALL SELECT campaign_name, 3, '3 · Open or click', users_engaged_open_or_click FROM per
UNION ALL SELECT campaign_name, 4, '4 · Clicked', users_clicked FROM per
ORDER BY campaign_name, step_order;
*/
