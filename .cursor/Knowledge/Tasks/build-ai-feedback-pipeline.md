# Build AI feedback synthesis pipeline

**Goal:** Strategic leverage — Zero-manual synthesis
**Status:** In progress
**Priority:** High

## What
Set up an automated pipeline that pulls qualitative feedback from Slack, Support, and Gong, then uses AI to surface the top 3 pain points weekly.

## Discovery & market research
- [ ] Research how other product teams automate feedback synthesis (Dovetail, Enterpret, Unwrap.ai)
- [ ] Evaluate existing MCP integrations for Slack, Gong, and support tools
- [ ] Interview 3 PMs internally — what feedback do they wish they had surfaced automatically?

## Completed
- [x] Evaluate existing MCP integrations for Slack, Gong, and support tools
- [x] Identify Slack channels: C0A4UFBV45C, C099J0VV1QV
- [x] Define output format: weekly Markdown report in Knowledge/feedback-reports/
- [x] Create weekly-feedback skill (.cursor/skills/weekly-feedback/SKILL.md)
- [x] Add Slack MCP config to ~/.cursor/mcp.json
- [x] Create Knowledge/feedback-reports/ output directory
- [x] Plan created: ~/.cursor/plans/ai_feedback_pipeline_5e8574d2.plan.md

## Next steps
- [ ] Create Slack App at api.slack.com/apps and get Bot token (scopes: channels:history, channels:read)
- [ ] Add Bot token and Team ID to ~/.cursor/mcp.json (replace placeholders)
- [ ] Restart Cursor and verify Slack MCP connects
- [ ] Run first weekly synthesis using /weekly-feedback
- [ ] Phase 2: Identify support tool and add as data source
- [ ] Phase 3: Integrate Gong transcripts
- [ ] Phase 4: Set up recurring Monday automation
