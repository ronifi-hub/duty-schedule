# Vibe "Click Publish" — Activation Research & Experiment Framework

**Goal:** Improve activation (click publish) by optimizing two critical moments in the user journey
**Status:** Research complete, ready for experiment prioritization
**Priority:** High
**Date:** February 25, 2026

**Related funnel queries in this folder:**
- `user_level_vibe_funnel_admins_only.sql` — User-level funnel: Seeing vibe → Prompt sent → Preview rendered → Clicked publish
- `account_level_vibe_funnel_admins_by_entry_point.sql` — Same funnel by entry point (Board view, Landing page, Web, Icon, Add view menu, Left pane)

---

## Core Thesis

In AI-native products, funnels are collapsing. The traditional SaaS activation curve (sign up -> onboard -> learn -> use -> value) is compressing into a single session. Users of Lovable, Bolt, and Replit expect to go from prompt to live app in minutes, not days. "Click publish" is Vibe's activation metric — the moment a user proves to themselves (and their team) that the product works.

Two moments determine whether that happens:

1. **First prompt -> first value**: Does the user believe this works?
2. **Second prompt -> aha moment**: Can the user shape this into something they'll actually use?

**Current funnel (from BigBrain events):**

```
Seeing vibe → Prompt sent → Preview rendered → Clicked publish
```

Entry events tracked: `board_view_create_clicked`, `ai_app_page_viewed`, `ai_app_sign_in_attempted`, `surface_button_clicked`, `ai_app_add_view_menu_clicked`, `navigate_from_leftpane`, `ai_app_workspace_menu_vibe_clicked`

---

## Theme 1: First Prompt — Compressing Time to Value

### The Problem

Vibe's first prompt experience is good — template chips, auto-generated prompts, and the "Discuss" option exist. But there's a gap: **Vibe goes straight from prompt to full build with no alignment step.** If the AI misunderstands the prompt, the user doesn't find out until they're staring at the wrong app after a 30-60 second wait.

Additionally, free-form prompts (users who type their own instead of clicking a chip) get no enhancement or guidance. The template chips solve for common use cases, but users with unique needs are on their own.

### What Competitors Do

#### Bolt.new — Plan Mode + Enhance Prompt

Bolt separates **thinking from building** with two distinct features:

**Plan Mode** (available from the homepage):
- User submits prompt with "Plan" toggled on (blue highlight in the chatbox)
- AI generates a structured plan — every step needed to build the app, with no code
- User reviews, refines, and discusses the plan
- Quick action buttons appear: "Refine this idea", "Show an example", "Implement this plan"
- User clicks "Implement this plan" -> auto-switches to Build Mode
- Key benefit: catches misunderstandings BEFORE tokens are spent on code generation

**Enhance Prompt** (star icon in chatbox):
- One-click button that rewrites the user's prompt to be more specific
- Transforms "make a todo app" into a detailed spec with features, tech stack, design guidelines
- User reviews the enhanced prompt and can edit before sending
- Bolt's docs show side-by-side comparison: enhanced prompts produce "more engaging homepages and additional pages"

**Lifecycle flow**: Design & Plan -> First Prompt -> Iterate (one change at a time) -> Publish

Reference: [Bolt Plan Mode docs](https://support.bolt.new/docs/discussion-mode) | [Bolt Prompting docs](https://support.bolt.new/best-practices/prompting-effectively) | [Build your first app](https://support.bolt.new/building/build-your-first-app)

#### Replit Agent — Plan + Approval Gate + Checkpoints

Replit's Agent takes the plan concept further with **mandatory approval**:

- User describes their app in natural language
- Agent creates a structured plan and **waits for user approval** before generating any code
- Once approved, Agent streams a visual preview before the full build
- Git checkpoints are created automatically — user can always roll back to any previous state
- Prompting guidance built into docs: "Plan first. Before prompting, outline your app's features and user flows."
- Key principle: "Build incrementally" — start with basic structure, add features one at a time

Reference: [Replit prompting guide](https://docs.replit.com/tutorials)

#### Lovable — Pre-Planning Outside the Tool

Lovable takes the weakest approach — it pushes planning responsibility to the user:

- Recommends 15-60 minutes of planning BEFORE opening Lovable
- Suggests recording voice notes, pasting into GPT/Claude to expand ideas, writing PRDs
- Define: Core Purpose, Integrations, User Journey, Data Flow, AI Features
- No in-product planning or prompt enhancement features

This is homework, not product design. It works for power users but creates a barrier for casual users.

Reference: [Lovable quickstart](https://docs.lovable.dev/user-guides/quickstart) | [Idea to app](https://docs.lovable.dev/user-guides/from-idea-to-app)

#### v0 by Vercel — Structured Prompt Framework

v0 doesn't have a planning step but uses a structured prompt framework that implicitly guides users:

- Three inputs: Product Surface (what it shows), Context of Use (who uses it, when, why), Constraints & Taste (style, layout)
- Claims 30-40% faster generation with better prompts
- 1-click deploy to Vercel
- Figma integration for design-to-code workflows
- UI components only — no full-stack apps

Reference: [v0 prompting guide](https://vercel.com/blog/how-to-prompt-v0)

### Competitive Pattern

What Bolt, Replit, and v0 converge on — and Vibe doesn't yet do — is **a structured moment of alignment between user intent and AI understanding, before code is generated:**

- Bolt: Plan Mode (structured plan + review + quick actions)
- Replit: Agent plan + mandatory approval gate
- v0: Structured prompt framework (product surface + context + constraints)
- Lovable: External pre-planning (weakest — it's homework)
- **Vibe: No alignment step. Prompt goes straight to build.**

Vibe's "Discuss" mode exists but it's opt-in and open-ended — it feels like a side conversation, not a step in the flow.

### Hypotheses for Theme 1

**H1: Lightweight plan preview before build**
- After the user hits send, show a 10-second "Here's what I'll build" summary (not code — a bullet list of components, data sources, layout decisions)
- User confirms ("Build this") or adjusts ("Actually, I also need X")
- Adds ~10 seconds but prevents wasted 60-second builds that miss the mark
- Test: A/B test plan preview vs. direct build. Measure first-generation satisfaction and iteration count before publish.

**H2: "Improve this prompt" for free-form input**
- The template chips handle common use cases well. But users who type their own prompt get no help.
- Add an "Improve this prompt" button (like Bolt's Enhance Prompt) that rewrites the user's free-form prompt to be more specific
- User sees the enhanced version and can edit before sending
- Low effort: it's a prompt-to-prompt AI call, no UI generation needed
- Test: A/B test with/without enhance button for free-form prompts. Measure first-generation quality (proxy: publish without iterating).

**H3: "What boards should this use?" — forced context before generation**
- The "+ Connect boards" button exists but is optional and visually de-emphasized
- When a user writes a free-form prompt (not from a board context), ask one question before generating: "Which boards should this app work with?" with a board picker
- Adds 5 seconds but ensures the first output shows real data, not generic placeholders
- Skip this step if the user entered from a board view (board context already known)
- Test: A/B test forced board picker vs. optional. Measure time-to-publish and preview engagement.

**H4: Progressive generation — start simple, add layers**
- Instead of generating the full app at once, generate a minimal version in 3-5 seconds (core layout + real data)
- Then offer incremental additions: "Add timeline view", "Add KPI cards", "Add filters" as clickable actions
- Each addition takes 2-3 seconds instead of a full 60-second regeneration
- No competitor does this yet — it's how design tools work (start with a frame, add elements)
- Test: A/B test progressive vs. full generation. Measure time-to-first-value and user satisfaction.

---

## Theme 2: Second Prompt — Engineering the Aha Moment

### The Problem

The second prompt is where users go from "cool demo" to "I'll use this for real work." But Vibe's post-generation experience actively works against this:

1. **The AI responds like an engineer, not a collaborator.** After generation, the chat shows implementation details ("Aggregate API for KPIs, Server-side health metrics counting, Pagination-Ready, Uses proper SDK patterns"). Users don't care about SDK patterns — they care about "your dashboard shows your 10 projects."

2. **"Next Steps" are developer tasks.** The suggestions read like a Jira backlog: "Add Filtering: Create filter controls for health status", "Implement polling or websockets to auto-refresh metrics." These should be user actions: "Filter by project status", "Auto-refresh your dashboard."

3. **The chat box goes cold.** After generation, the user sees "How can I help you?" with no suggestions. This is a blank-page problem at the worst possible moment — the user just got a result and doesn't know what to improve.

4. **NPS fires too early.** "Rate this vibe app" appears while the app is still in Draft, before iteration or publish. This measures first-impression reaction, not activation satisfaction.

5. **Iteration feels like debugging, not creating.** Chat-based iteration is uncertain — "make the header blue" might regenerate everything. No visual editing for simple changes. Error handling requires user action ("Fix Errors" button).

### What Competitors Do

#### Bolt.new — Quick Action Buttons + Inspector

After any AI response (in both Plan and Build modes), Bolt generates **contextual quick action buttons**:
- "Refine this idea" — continue iterating on the concept
- "Show an example" — see a concrete implementation
- "Implement this plan" — auto-switch from Plan to Build mode
- Buttons vary based on project context and discussion topic

This eliminates the blank-chat-box problem. Users always have a clear next action.

Bolt also includes an **Inspector tool**:
- Highlight a specific component in the preview
- Discuss potential changes to that specific component
- Make targeted edits without describing the element's location in chat
- Bridges the gap between "I see something I want to change" and "I need to describe it in words"

Additionally, Bolt's iteration guidance is explicit:
- "Do one thing at a time. Don't try to add multiple features in one go."
- "Be explicit about what should and shouldn't change."
- "Refer to specific elements, classes, or functions."

Reference: [Bolt Discussion Mode docs](https://support.bolt.new/docs/discussion-mode)

#### Replit Agent — Checkpoints + Incremental Building

Replit addresses iteration anxiety with **automatic checkpoints**:
- Git commits created after each successful step
- Users can roll back to any working state if something breaks
- "Build incrementally" philosophy: basic structure first, then features one at a time
- Agent auto-configures environment, installs dependencies — no manual setup between iterations

The key insight: Replit makes iteration feel **safe**. You can always go back. This encourages experimentation.

Reference: [Replit prompting guide](https://docs.replit.com/tutorials)

### User Feedback Signal

From monday.com community forums:

> "When the prompt fails, it becomes difficult to get it working correctly again, and it's impossible to revert to a working version." — Community user, Dec 2025

> "I want to be able to reuse my Monday Vibe on multiple boards but have the ability for the data to reset when I do that." — Community user, Dec 2025

Users report Vibe getting stuck on "Vibe's Code Generator is Bringing your App to Life" with no progress indicator — the loading state is the highest-anxiety moment.

Industry research (1M+ prompts analyzed): 40% of prompts in high-AI-reliance mode are redundant. 20%+ of session time is waiting for generation. Users send consecutive error messages hoping for fixes ("probabilistic debugging").

### Hypotheses for Theme 2

**H5: Contextual suggestion chips after generation (highest priority)**
- After the first generation, show 3 AI-generated improvement suggestions as clickable chips below the preview
- Examples: "Filter by project status", "Change color theme", "Connect another board"
- Phrased as user outcomes, not developer tasks
- Replace the cold "How can I help you?" with specific, actionable options
- Test: A/B test suggestion chips vs. empty chat box. Measure second-prompt engagement rate, publish rate, and day-7 retention.

**H6: Reframe AI response from technical to value-driven**
- After generation, the AI should confirm value: "Here's your Project Portfolio Dashboard — it's showing 10 projects from your boards, with 2 flagged as at risk."
- Remove implementation details (SDK patterns, API architecture) from user-facing responses
- Move technical details to a collapsible "Technical details" section for users who want them
- Test: A/B test value-framed vs. technical response. Measure user confidence (proxy: time between generation and first action — shorter = more confident).

**H7: Delay NPS to after second successful iteration**
- Currently fires at `FIRST_CREATION` milestone — before the user has iterated or published
- Move NPS trigger to after the second successful prompt (the user has shaped the app) or after publish
- This measures activation satisfaction, not first-impression reaction
- Test: A/B test NPS at first creation vs. after second iteration. Measure NPS scores and completion rates.

**H8: Auto-fix errors without user intervention**
- Current `RuntimeErrorListener` captures errors and shows a "Fix Errors" button requiring user action
- Make error recovery invisible: auto-send errors to AI for correction. Only surface errors that require human input (e.g., missing data source)
- Test: A/B test auto-fix vs. manual "Fix Errors" button. Measure error recovery rate and time-to-publish.

**H9: Version safety net — visible rollback**
- Make version history prominent in the UI (not hidden)
- After each iteration, show "Version 2 of 3 — you can go back anytime"
- Replit's checkpoints prove this reduces iteration anxiety
- Test: A/B test visible version indicator vs. current hidden versioning. Measure iteration count and publish rate (hypothesis: users iterate more when they feel safe).

---

## Experiment Priority Matrix

Ranked by expected impact x effort:

### Quick wins (1-2 weeks)
1. **H5: Contextual suggestion chips** — UI change only. Directly targets the aha moment gap. No backend changes needed.
2. **H6: Value-framed AI responses** — Prompt engineering change. Rewrite the system prompt for post-generation responses.
3. **H7: Delay NPS trigger** — Config change. Move the trigger milestone from `FIRST_CREATION` to `PUBLISH` or `EDIT_COUNT >= 2`.

### Medium effort (3-5 weeks)
4. **H2: Enhance prompt button** — AI call + UI button. Already proven by Bolt.
5. **H1: Lightweight plan preview** — New UI step in the build flow. 10-second structured summary before generation.
6. **H8: Auto-fix errors** — Backend change to `RuntimeErrorListener`. Auto-send errors to AI for correction.

### Larger bets (6-10 weeks)
7. **H3: Forced board connection** — UX flow change. Requires board picker integration in prompt flow.
8. **H9: Visible version rollback** — UI + backend. Version history display and rollback mechanism.
9. **H4: Progressive generation** — Architecture change. Requires breaking generation into modular steps.

---

## Success Metrics

- **First-generation publish rate**: % of users who publish without iterating (measures first prompt quality)
- **Second-prompt engagement rate**: % of users who send a second prompt after first generation (target: 70%+)
- **Median time-to-first-publish**: Time from first prompt to first publish (target: under 90 seconds)
- **Prompt-to-publish rate**: % of users who start a prompt and end up publishing (target: 40%+)
- **Iteration efficiency**: Average iterations before publish (lower = better first-generation quality)
- **Day-7 return rate**: % of users who come back and interact with their app after 7 days
- **NPS at publish**: User satisfaction at the actual activation moment

---

## Key Technical References

- Publish mutation: `publishCraftApp` in `mf-ai-app-builder/src/graphql/craft-app/mutations/publish-craft-app/`
- Publish dialog + plan limits: `PublishDialog` component in `mf-ai-app-builder`
- BigBrain event tracking: `bigBrainEvents.ts` in `misc-layout/app/routes/misc.vibe.full-page-app.object/constants/`
- Error handling: `RuntimeErrorListener` in `mf-ai-app-builder`
- Prompt enrichment: `enrichPrompt` in `mf-ai-app-builder/src/components/views/AppBuilder/`
- NPS trigger milestones: `ai_app_nps_modal_shown` at `FIRST_CREATION`, `PUBLISH`, `EDIT_COUNT`
- Deployment pipeline: `vibe-item-view-version-handler.ts` in `ai-app-builder/src/domains/deployments/`
- Plan limits service: `MondayVibeAddonDataService` in `mf-feature-limitations`

---

## Appendix: Competitor Reference Links

- Bolt Plan Mode: https://support.bolt.new/docs/discussion-mode
- Bolt Prompting Guide: https://support.bolt.new/best-practices/prompting-effectively
- Bolt Build Your First App: https://support.bolt.new/building/build-your-first-app
- Replit Agent Prompting: https://docs.replit.com/tutorials
- Lovable Quickstart: https://docs.lovable.dev/user-guides/quickstart
- Lovable Idea to App: https://docs.lovable.dev/user-guides/from-idea-to-app
- v0 Prompting Guide: https://vercel.com/blog/how-to-prompt-v0

## Open Questions

1. What is the current prompt-to-publish conversion rate? (Run `user_level_vibe_funnel_admins_only.sql` in Redash)
2. What % of users use free-form prompts vs. template chips? (Determines priority of H2)
3. Where is the biggest drop-off: post-generation or at publish? (Funnel data will show this)
4. What is the average iteration count before first publish? (Baseline for H1, H4)
5. Which entry point has the highest publish conversion? (Run `account_level_vibe_funnel_admins_by_entry_point.sql`)
6. Reconnect Slack MCP to pull internal feedback from channels C0A4UFBV45C and C099J0VV1QV

---

## Answers from data (user-level only, this folder)

*All metrics below are **user-level** (distinct admins / pulse_user_id). Source: HTML reports in `vibe/`; funnel and prompt-effect use embedded data; interaction-type may use placeholders. Re-run `user_level_vibe_funnel_admins_only.sql` in Redash for production funnel.*

**[View user-level dashboard →](vibe_click_publish_answers_user_level.html)**

**Table verification:** Funnel and step counts come from `bigbrain.final.events` joined to `bigbrain.final.dusers` (is_admin = 1, enabled = 1); user-level = DISTINCT pulse_user_id per step. Prompt-effect and interaction-type reports use the same events + dusers; interaction-type SQL also references `bigbrain.final.daccounts` for non-paying filter. See `user_level_vibe_funnel_admins_only.sql` and the SQL block in `vibe_publish_by_interaction_type.html`.

| # | Question | Answer | Source |
|---|----------|--------|--------|
| 1 | **Prompt-to-publish conversion rate** | **~42–46%** (user-level). Funnel placeholder: of **users** who sent a prompt, 1,592/3,743 ≈ **42.5%** clicked publish. Prompt-effect (last 30d): 5,392 **users** published / 11,734 **users** who saw preview ≈ **46%**. | `vibe_funnel_admins.html`, `vibe_funnel_admins_prompt_effect.html` |
| 2 | **Free-form vs template %** | **~64% free-form (Prompt Only), ~22% Template**, ~15% Discuss-first (user-level, first interaction). Majority use free-form → **H2 (Enhance prompt) is high priority**. Users (saw preview): Prompt Only 4,876, Template 1,658, Discuss 1,148. | `vibe_publish_by_interaction_type.html` (placeholder; verify with SQL) |
| 3 | **Biggest drop-off** | **At publish (Preview → Clicked publish).** User-level funnel: Seeing 4,200 → Prompt 3,743 → Preview 3,743 → Publish 1,592. Seeing→Prompt ~89%; Prompt→Preview ~100%; **Preview→Publish ~43%** — main leak. | `vibe_funnel_admins.html` |
| 4 | **Average iteration count before first publish** | **~2.1 prompts** per user (among publishers). User-level: 1 prompt 2,641, 2→937, 3→499, 4+→1,315 publishers; weighted avg ≈ **2.09**. Baseline for H1/H4. | `vibe_funnel_admins_prompt_effect.html` |
| 5 | **Entry point with highest publish conversion** | *Not in user-level data.* Entry-point breakdown in this folder is **account-level** only (`account_level_vibe_funnel_admins_by_entry_point.sql`). For user-level by entry point, add a user-level version of that query. | — |
| 6 | **Slack internal feedback** | No data in this folder. Requires **reconnecting Slack MCP** and pulling from channels C0A4UFBV45C and C099J0VV1QV. | — |
