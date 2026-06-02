# PM at monday.com — MCP & tools setup

One place for everything you need in Cursor as a monday PM: MCPs to connect, what “Big Brain” is, and where to configure.

---

## Clarification: “Big Brain” is not an MCP

**Big Brain** = monday.com’s internal analytics/event system (e.g. `bigbrain.final.events`, `bigbrain.final.dusers`). You use it via:

- Internal SQL / BI tools (e.g. your Vibe funnel queries)
- Event specs in code (e.g. `bigBrainEvents.ts`)

There is no “Big Brain MCP” to install. For self-serve analytics in Cursor you have the **Kremer** MCP (Data Expert stack): use it for Snowflake SQL when it’s wired; fall back to **Redash** when a tool fails or times out.

### Kremer MCP tools (Snowflake / dbt)

| Cursor tool (typical name) | Use | If it fails |
|----------------------------|-----|-------------|
| `execute-sql-query` | Run SQL against Snowflake (BigBrain). **Primary path** to re-run repo queries (e.g. `vibe/user_level_vibe_funnel_admins_only.sql`). | Keep queries **bounded** (date filters, limits). Wide scans can return **504** or connection errors — run the same SQL in **internal Redash** instead. |
| `dbt-query` | Explore dbt models / lineage for an environment. | **`DBT_MCP_TOOL_LOAD_FAILED`** means the server’s dbt environment (e.g. prod bundle) did not load — use Redash or internal dbt docs until infra fixes the MCP backend. |
| `data-expert-agent` | Natural-language → SQL via an LLM agent. | **`401 Incorrect API key`** is the **model provider** key on the MCP server, not your Snowflake login. Use `execute-sql-query` with saved SQL or Redash until whoever operates Kremer MCP rotates/fixes that key. |
| `knowledge-base-query` | KB search for dashboard/analysis docs. | Same auth/backend as other Kremer tools; if unavailable, use existing workspace markdown + Redash. |

**Redash:** Your Vibe funnel SQL files already say to use Redash with `date_range` params — that path is the reliable fallback for heavy queries, dashboards, and sharing results.

---

## MCPs to connect (in order of impact for PM)

| MCP | What it does | How to connect |
|-----|----------------|-----------------|
| **Figma** | Read Figma designs → generate/adapt code (HTML, React, etc.) | **Cursor Settings → MCP** → find **figma** → **Connect** (browser OAuth). Stays connected; no desktop app needed. See [CURSOR_FIGMA_GITHUB_SETUP.md](/CURSOR_FIGMA_GITHUB_SETUP.md) (workspace root). |
| **monday.com** | Create/update items, columns, boards; used by interview-summarizer & interview-aggregator skills | Add to `~/.cursor/mcp.json` (see template below). Need a [monday.com API token](https://developer.monday.com/api-reference/docs/authentication). |
| **Slack** | Pull channel history for weekly feedback synthesis (e.g. C0A4UFBV45C, C099J0VV1QV) | Add to `~/.cursor/mcp.json`. Need Slack App Bot token (scopes: `channels:history`, `channels:read`). See [build-ai-feedback-pipeline](Tasks/build-ai-feedback-pipeline.md). |
| **GitHub** | Repos, issues, PRs from Cursor | **Cursor Settings → MCP** → GitHub → set `GITHUB_PERSONAL_ACCESS_TOKEN`. Or export in `~/.zshrc`. See [CURSOR_FIGMA_GITHUB_SETUP.md](/CURSOR_FIGMA_GITHUB_SETUP.md) (workspace root). |
| **Kremer (Data Expert)** | Snowflake SQL and optional dbt/KB from Cursor | Usually enabled org-side in **Cursor Settings → MCP** (no local `mcp.json` snippet here). If SQL works but agent/dbt fail, see **Kremer MCP tools** above and use **Redash** for heavy or exploratory work. |

---

## Single `mcp.json` template (monday + Slack)

Cursor reads **user-level** MCP config from **`~/.cursor/mcp.json`**. If you already have other servers (e.g. Slack) there, merge the `monday-api-mcp` block into your existing `mcpServers`.

**Full example (monday + Slack):**

```json
{
  "mcpServers": {
    "monday-api-mcp": {
      "command": "npx",
      "args": [
        "@mondaydotcomorg/monday-api-mcp",
        "--enable-dynamic-api-tools",
        "true"
      ],
      "env": {
        "monday_token": "YOUR_MONDAY_API_TOKEN"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-YOUR_BOT_TOKEN",
        "SLACK_TEAM_ID": "YOUR_TEAM_ID"
      }
    }
  }
}
```

- **monday.com API token:** [Developer](https://developer.monday.com/) → your app / API token. Prefer `env.monday_token` over `-t ...` in args so the token isn’t in the file.
- **Slack:** Create an app at [api.slack.com/apps](https://api.slack.com/apps) → Bot token with `channels:history`, `channels:read`; use your workspace Team ID.

After editing `~/.cursor/mcp.json`, **restart Cursor** so it picks up the new servers.

---

## Quick checklist

- [ ] **Figma:** Settings → MCP → figma → Connect (OAuth).
- [ ] **GitHub:** Settings → MCP → GitHub → `GITHUB_PERSONAL_ACCESS_TOKEN` (or in `~/.zshrc`).
- [ ] **monday.com:** Add `monday-api-mcp` to `~/.cursor/mcp.json` with `monday_token`; restart Cursor.
- [ ] **Slack:** Add Slack server to `~/.cursor/mcp.json` with Bot token + Team ID; restart Cursor.
- [ ] **Big Brain / Snowflake:** Run `SELECT 1` via Kremer **`execute-sql-query`**; for funnel SQL use repo `.sql` in Cursor or **Redash** if you hit timeouts or 504.
- [ ] **Kremer agent/dbt:** If `data-expert-agent` (401) or `dbt-query` (load failed), rely on **execute-sql-query** + Redash until MCP backend credentials/environments are fixed.

---

## Skills that depend on these MCPs

- **User Interviews (Investigation Copilot):** [interview-summarizer](.cursor/skills/user-voice/interview-summarizer/SKILL.md) and [interview-aggregator](.cursor/skills/user-voice/interview-aggregator/SKILL.md) use the **monday.com MCP** (board ID `18400716557`).
- **Weekly feedback synthesis:** [weekly-feedback](.cursor/skills/weekly-feedback/SKILL.md) uses **Slack MCP** to pull from your feedback channels.

Once Figma, monday.com, Slack, and GitHub are connected, you’re set for design→code, boards/items, feedback synthesis, and repo/PR work as a PM at monday.
