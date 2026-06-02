-- =============================================================================
-- User-level Vibe funnel: ADMINS ONLY
-- Steps: Seeing vibe → Prompt sent → Preview rendered → Clicked publish
-- =============================================================================
-- Restricts to users who are admins (bigbrain.final.dusers: is_admin = 1,
-- enabled = 1). Counts distinct pulse_user_id per step.
-- "Seeing vibe" = any entry event (board view, web, icon, add view menu, etc.).
-- Use in Redash with date_range (date-range). Funnel viz: step, value.
-- =============================================================================

WITH params AS (
  SELECT
    DATE('{{date_range.start}}') AS start_date,
    DATE('{{date_range.end}}')   AS end_date
),

admin_users AS (
  SELECT DISTINCT pulse_account_id, pulse_user_id
  FROM bigbrain.final.dusers
  WHERE is_admin = 1 AND enabled = 1
),

-- Entry events = "Seeing vibe" (user saw Vibe from any entry point)
-- Include: Board view, Web, Icon, Add view menu, Landing page, Left pane
seeing_vibe_names AS (
  SELECT 'board_view_create_clicked'     AS n UNION ALL
  SELECT 'ai_app_page_viewed'            UNION ALL
  SELECT 'ai_app_sign_in_attempted'      UNION ALL
  SELECT 'surface_button_clicked'       UNION ALL
  SELECT 'ai_app_add_view_menu_clicked'  UNION ALL
  SELECT 'navigate_from_leftpane'        UNION ALL   -- Left pane (Monday AI section)
  SELECT 'ai_app_workspace_menu_vibe_clicked'       -- Left pane (Add menu)
),

-- All relevant events for admin users in range
ev AS (
  SELECT e.pulse_user_id, e.pulse_account_id, e.name, e.created_at
  FROM bigbrain.final.events e
  INNER JOIN admin_users a
    ON a.pulse_account_id = e.pulse_account_id AND a.pulse_user_id = e.pulse_user_id
  CROSS JOIN params p
  WHERE DATE(e.created_at) BETWEEN p.start_date AND p.end_date
    AND (
      e.name IN (SELECT n FROM seeing_vibe_names)
      OR e.name IN ('ai_app_user_prompt_received', 'ai_app_preview_rendered', 'ai_app_publish_clicked')
    )
),

-- 4-step user-level funnel: Seeing vibe → Prompt sent → Preview rendered → Clicked publish
step_counts AS (
  SELECT 'Seeing vibe'      AS step, 1 AS step_order, COUNT(DISTINCT pulse_user_id) AS users
  FROM ev WHERE name IN (SELECT n FROM seeing_vibe_names)
  UNION ALL
  SELECT 'Prompt sent',     2, COUNT(DISTINCT pulse_user_id) FROM ev WHERE name = 'ai_app_user_prompt_received'
  UNION ALL
  SELECT 'Preview rendered', 3, COUNT(DISTINCT pulse_user_id) FROM ev WHERE name = 'ai_app_preview_rendered'
  UNION ALL
  SELECT 'Clicked publish', 4, COUNT(DISTINCT pulse_user_id) FROM ev WHERE name = 'ai_app_publish_clicked'
)

SELECT step, users AS value
FROM step_counts
ORDER BY step_order;
