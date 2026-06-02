-- =============================================================================
-- Account-level Vibe funnel: ADMINS ONLY, BY ENTRY POINT
-- Steps: Seeing vibe → Prompt sent → Preview rendered → Clicked publish
-- Entry points: Board view, Web, Icon, Add view menu, Landing page, Left pane
-- =============================================================================
-- Counts distinct pulse_account_id per step. Each account attributed to one
-- entry point by first entry event in the period.
-- Use in Redash with date_range (date-range).
-- =============================================================================

WITH params AS (
  SELECT DATE('{{date_range.start}}') AS start_date, DATE('{{date_range.end}}') AS end_date
),

admin_users AS (
  SELECT DISTINCT pulse_account_id, pulse_user_id
  FROM bigbrain.final.dusers
  WHERE is_admin = 1 AND enabled = 1
),

-- Entry-point event names (all ways to "see vibe")
entry_events AS (
  SELECT 'board_view_create_clicked'    AS name, 'Board view'     AS entry_point UNION ALL
  SELECT 'ai_app_page_viewed',           'Landing page' UNION ALL
  SELECT 'ai_app_sign_in_attempted',    'Web'          UNION ALL
  SELECT 'surface_button_clicked',      'Icon'         UNION ALL
  SELECT 'ai_app_add_view_menu_clicked', 'Add view menu' UNION ALL
  SELECT 'navigate_from_leftpane',      'Left pane'    UNION ALL   -- Monday AI section
  SELECT 'ai_app_workspace_menu_vibe_clicked', 'Left pane'         -- Add menu from left pane
),

ev AS (
  SELECT e.pulse_account_id, e.pulse_user_id, e.name, e.created_at
  FROM bigbrain.final.events e
  INNER JOIN admin_users a ON a.pulse_account_id = e.pulse_account_id AND a.pulse_user_id = e.pulse_user_id
  CROSS JOIN params p
  WHERE DATE(e.created_at) BETWEEN p.start_date AND p.end_date
    AND (
      e.name IN (SELECT name FROM entry_events)
      OR e.name IN ('ai_app_user_prompt_received', 'ai_app_preview_rendered', 'ai_app_publish_clicked')
    )
),

-- First entry event per account (earliest in period)
first_entry AS (
  SELECT pulse_account_id, name AS first_entry_event,
    ROW_NUMBER() OVER (PARTITION BY pulse_account_id ORDER BY created_at) AS rn
  FROM ev
  WHERE name IN (SELECT name FROM entry_events)
),

account_entry AS (
  SELECT pulse_account_id, ee.entry_point
  FROM first_entry fe
  JOIN entry_events ee ON ee.name = fe.first_entry_event
  WHERE fe.rn = 1
),

-- Accounts that did at least one funnel step (so we only attribute entry for in-funnel accounts)
accounts_in_funnel AS (
  SELECT DISTINCT pulse_account_id
  FROM ev
  WHERE name IN ('ai_app_user_prompt_received', 'ai_app_preview_rendered', 'ai_app_publish_clicked')
),

account_entry_in_funnel AS (
  SELECT ae.pulse_account_id, ae.entry_point
  FROM account_entry ae
  INNER JOIN accounts_in_funnel a ON a.pulse_account_id = ae.pulse_account_id
),

-- "Seeing vibe" = any entry event; then Prompt sent, Preview rendered, Clicked publish
step_accounts AS (
  SELECT DISTINCT e.pulse_account_id, 'Seeing vibe' AS step, 1 AS step_order, ee.entry_point
  FROM ev e
  INNER JOIN account_entry_in_funnel ee ON ee.pulse_account_id = e.pulse_account_id
  WHERE e.name IN (SELECT name FROM entry_events)
  UNION ALL
  SELECT DISTINCT e.pulse_account_id, 'Prompt sent', 2, ee.entry_point
  FROM ev e
  INNER JOIN account_entry_in_funnel ee ON ee.pulse_account_id = e.pulse_account_id
  WHERE e.name = 'ai_app_user_prompt_received'
  UNION ALL
  SELECT DISTINCT e.pulse_account_id, 'Preview rendered', 3, ee.entry_point
  FROM ev e
  INNER JOIN account_entry_in_funnel ee ON ee.pulse_account_id = e.pulse_account_id
  WHERE e.name = 'ai_app_preview_rendered'
  UNION ALL
  SELECT DISTINCT e.pulse_account_id, 'Clicked publish', 4, ee.entry_point
  FROM ev e
  INNER JOIN account_entry_in_funnel ee ON ee.pulse_account_id = e.pulse_account_id
  WHERE e.name = 'ai_app_publish_clicked'
),

funnel_by_entry AS (
  SELECT step, step_order, entry_point, COUNT(DISTINCT pulse_account_id) AS accounts
  FROM step_accounts
  GROUP BY step, step_order, entry_point
)

SELECT step, entry_point, accounts AS value
FROM funnel_by_entry
ORDER BY step_order, entry_point;
