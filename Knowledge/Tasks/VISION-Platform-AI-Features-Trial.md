# Platform AI — trial & allowances vision

**Status:** Draft  
**Owner:** Roni (PM — Sidekick, Agents, AI features)  
**Related:** [`platform-agents-trial-method.md`](../../platform-agents-trial-method.md) · [`PRD-Sidekick-daily-credits-unified-pool.md`](PRD-Sidekick-daily-credits-unified-pool.md)

---

## Vision

One entitlement system powers all monday AI features. Usage draws from **grants** — defined by scope (user or account), type (daily, one-time, time-limited), and feature bucket. Buckets are non-fungible so one surface can't silently drain another. The goal: every user reaches a meaningful **aha moment on real data** before any limit is hit.

---

## The model

### Scopes

| Scope | What it means |
|-------|---------------|
| **User** | Personal quota per member — drives habit and viral "try it" |
| **Account** | Shared across the workspace — enables team pilots and org caps |

Both can apply simultaneously for the same feature. Consumption order is a configurable policy (see §Open decisions).

### Grant types

| Type | Behavior | Use case |
|------|----------|----------|
| **Daily recurring** | Refreshes each period (calendar day, workspace TZ) | Habit formation, cost rate-limiting |
| **One-time** | Lump sum until depleted | Onboarding burst, pilot seed, promos |
| **Time-limited** | Valid only within a window (`valid_from` / `valid_until`) | Campaigns, plan trials, urgency |

These compose freely — e.g. *one-time + expires in 14 days* or *daily for the first 30 days only*.

### Feature buckets

Grants are allocated per bucket. Balances don't transfer across buckets by default.

| Bucket | Unit (TBD) |
|--------|------------|
| Sidekick | Prompt / action |
| Custom agents | Agent run / credit |
| AI notetaker | Meeting / minute |
| AI columns | Column run / row batch |
| Doc summary | Summary action |
| AI workflows | Generate + test-run call |
| AI automations | AI-step execution |

### What users see

One balance story per feature: *"Your Sidekick allowance refreshes daily — 4 left today. Team agent runs: 12 remaining."* Each action shows which bucket and grant will be used.

---

## Roles

| | **Member** | **Admin** |
|-|------------|-----------|
| Consume user grants | Yes | — |
| Consume account grants | Yes, if policy allows | Configures access and caps |
| Purchase / configure grants | No | Yes |
| Enable connectors / recording | May hit a wall → Ask admin | Yes |

When a member hits a permission wall: one-click **"Ask admin"** with feature, reason, and remaining allowance pre-filled.

---

## Per-feature deep dives

---

### Sidekick

**Job:** Complete answers and actions in context — no tab-switching.

**Aha:** User completes something (draft update, multi-item insight, summarize) that would have required several manual steps — and trusts the result enough to post or keep it.

**Activation**

| | Detail |
|-|--------|
| **Who** | Any member |
| **In-feature entry** | Sidekick panel / sidebar — surfaced contextually on boards, items, docs |
| **AI permissions entry** | Admin enables Sidekick for the workspace (toggles access, sets account grant) |
| **Trial scope** | **User-level** — member self-serves; no admin required to reach aha |

**Grant strategy**

| Purpose | Scope | Type |
|---------|-------|------|
| Habit + fairness | User | Daily recurring |
| Onboarding | User | One-time burst on first enable |
| Campaign / plan | User or account | One-time + time limit |
| Team pilot | Account | One-time shared; optional daily cap |

**Flow**
1. First open or in-context nudge on the most relevant entity.
2. One-line balance: *"Today: X left (yours). Team: Y left."*
3. One high-confidence first action → success state → achievement prompt.
4. On daily exhaustion: show reset time and whether account balance is still available.

**Key risk:** Too much balance info at once. Use progressive disclosure — show only what applies *now*.

---

### Custom agents

**Job:** Automate recurring work that reads, decides, and writes on real monday data.

**Aha:** Agent writes back to actual board items — not a chat reply. Autonomous work, visible in the board.

**Activation**

| | Detail |
|-|--------|
| **Who** | Member builds and runs; admin controls org-level scopes and integrations |
| **In-feature entry** | Agents gallery / dedicated Agents tab — member discovers, picks a template, activates |
| **AI permissions entry** | Admin enables agent capabilities and scopes (e.g. which boards agents can write to, integrations) |
| **Trial scope** | **Hybrid** — user one-time grant for first aha (no admin needed); account grant for team eval |

**Grant strategy**

| Purpose | Scope | Type |
|---------|-------|------|
| First experience | User | One-time (template → Run now + 1 retry) |
| Team eval | Account | One-time + time limit |
| Anti-whale | Account | Daily cap on run credits |

**Principle:** Gate execution, not configuration. Building agents is free; running them costs.

**Flow**
1. Template gallery → pick → Activate.
2. Immediate **"Run on this board"** — don't wait for a trigger.
3. Activity stream during run → visible board updates → celebration + grant used shown.
4. Post-aha checklist: second agent, custom trigger, added capability.

**Key risk:** One power user drains account pool. Mitigate with per-user draw limits or daily throttle.

---

### AI notetaker

**Job:** Turn meetings into actionable monday work — no rewatching.

**Aha:** User accepts tasks or updates into monday with minimal editing. Output is trusted and wired to the work graph.

**Activation**

| | Detail |
|-|--------|
| **Who** | Meeting participant (member) experiences aha; admin almost always gates first use |
| **In-feature entry** | Meeting integration banner, calendar event in monday, or post-meeting inbox notification |
| **AI permissions entry** | Admin enables recording/transcription policy, connects calendar, sets retention rules — **required before any member can use** |
| **Trial scope** | **Account-level primary** (admin must act first); user one-time grant for personal eval once enabled |

**Grant strategy**

| Purpose | Scope | Type |
|---------|-------|------|
| Personal eval | User | One-time (N meetings or M minutes) |
| Department pilot | Account | One-time + time limit (e.g. end of quarter) |
| Cost control | User | Optional daily minute cap (tune carefully — frustrates heavy meeting users) |

**Flow**
1. Pre-flight: what's captured, privacy note, admin block → Ask admin if needed.
2. Post-meeting: clear *processing → ready* status (aha is async — silence feels broken).
3. Inbox / push: *"4 suggested tasks ready"* → one tap to add to board.
4. Show grant consumed (per meeting or per minute).

**Key risk:** Delayed aha loses users before they see value. Invest in status UX and partial previews.

---

### AI columns

**Job:** Fill or enrich many rows from existing context — no manual typing.

**Aha:** AI-generated values are good enough across a meaningful row count that the user wouldn't retype them. Spot-check passes.

**Activation**

| | Detail |
|-|--------|
| **Who** | Board owner (member) in most plans; admin gate likely in enterprise |
| **In-feature entry** | Column type picker when adding a new column to a board |
| **AI permissions entry** | Admin may restrict AI column types org-wide; enterprise boards may require explicit enabling |
| **Trial scope** | **Account-level** — shared resource (board structure) and high cost at scale; admin should control the pilot |

**Grant strategy**

| Purpose | Scope | Type |
|---------|-------|------|
| First success | User | One-time (row- or run-based) |
| Team board eval | Account | One-time + time limit |
| Cost control | Account | Daily max rows or runs |

**Flow**
1. Suggest the user's highest-row-count board they own.
2. Preview on a subset → apply to column.
3. Show rows updated + grant used. Easy undo to build trust.

**Key risk:** User picks a low-value board, burns their one-time grant on toy data. Guide board selection.

---

### Doc summary

**Job:** Compress long docs into decisions and next steps — connected to work.

**Aha:** Summary passes spot-check; user inserts it into an update, item, or workflow.

**Activation**

| | Detail |
|-|--------|
| **Who** | Any member with doc access |
| **In-feature entry** | AI toolbar / action inside a doc (e.g. "Summarize" button or command) |
| **AI permissions entry** | Minimal — not typically gated; admin may disable AI features globally |
| **Trial scope** | **User-level** — fully self-serve, low cost, personal aha |

**Grant strategy**

| Purpose | Scope | Type |
|---------|-------|------|
| Habit | User | Daily (small number of summaries) |
| Onboarding | User | One-time bump |
| Team rollout | Account | One-time shared pool |

**Flow**
1. Open doc → Summarize → show anchors or citations if available.
2. CTA: *Post to item* or *Create tasks*.
3. Grant decrement shown per summary.

**Key risk:** Summaries without follow-through. Measure downstream actions (items created, updates posted), not just clicks.

---

### AI workflows (builder)

**Job:** Build or refine automation logic faster with AI assistance.

**Aha:** User saves a workflow that runs correctly on test or real trigger.

**Activation**

| | Detail |
|-|--------|
| **Who** | Member with automation creation rights; admin governs cross-board publishing |
| **In-feature entry** | Automation / workflow builder — AI assist button inside the recipe editor |
| **AI permissions entry** | Admin controls who can publish automations that affect other boards or workspace-wide |
| **Trial scope** | **User-level** for building assist (daily); account-level only if org-wide publishing is involved |

**Grant strategy**

| Purpose | Scope | Type |
|---------|-------|------|
| Daily assist | User | Daily cap on generate/refine calls |
| Migration / setup | Account | One-time generation budget |

**Flow**
1. Template by use case (handoff, approval, notify).
2. AI proposes steps → user edits → Test run (grant shown).
3. Success state: *"Ran once — see activity log."*

**Key risk:** Easy to conflate with AI automations. Keep builder (generate) vs runtime (execute) metering clearly separated.

---

### AI automations (runtime)

**Job:** Run automations with AI steps that interpret content, branch, or generate payloads.

**Aha:** First successful execution with visible outcome (item updated, message sent) and traceability in logs.

**Activation**

| | Detail |
|-|--------|
| **Who** | Member for simple recipes; integration owner or admin when OAuth / connected apps are required |
| **In-feature entry** | Automation recipe builder — AI step available as a recipe action inside any automation |
| **AI permissions entry** | Admin enables integrations and OAuth scopes; often a hard gate before first AI automation can run |
| **Trial scope** | **Account-level** — high per-execution cost, shared board impact, admin dependency for OAuth |

**Grant strategy**

| Purpose | Scope | Type |
|---------|-------|------|
| Personal eval | User | One-time test executions |
| Org rollout | Account | One-time + time limit; optional daily cap |

**Flow**
1. Pre-built recipe template — minimal OAuth required.
2. Dry run / test event — don't make users wait for a production trigger.
3. Log shows AI step input/output (within privacy rules) + grant consumed.

**Key risk:** Silent failure makes the trial feel broken. Explicit error states and an admin escalation path are required in copy.

---

## UX principles

1. **One vocabulary** across all surfaces — "allowance," "refreshes daily," "team budget." No parallel jargon per feature.
2. **Show the source** — *"Used: your daily Sidekick. 4 left today."*
3. **Time-limit clarity** — date + timezone or "X days left," never vague.
4. **Achievement-based prompts** — milestone messaging over calendar panic.
5. **Admin view** — one dashboard, consumption broken down by bucket × scope × grant type.

---

## Success metrics

| Metric | Definition |
|--------|------------|
| **Aha rate per bucket** | % of exposed users hitting the defined aha per surface |
| **Grant-type effectiveness** | Which combos correlate with conversion / retention |
| **Cross-feature exploration** | % hitting aha on 2+ buckets |
| **Time-to-aha** | p50 / p90 by product |
| **Support confusion rate** | Tickets tagged "which balance / why blocked" — should fall after copy iteration |

---

## Open decisions

1. **Consumption order** — default stack when multiple grants apply (global vs per-bucket).
2. **Daily reset** — calendar day vs rolling 24h; user TZ vs workspace TZ.
3. **Account fairness** — per-user draw caps from shared account balance.
4. **Purchased grants** — same engine, different source label (recommended) vs separate SKU presentation.
5. **AI blocks** — separate bucket per sub-feature (recommended) vs one shared "blocks" bucket.
6. **Sidekick** — align numbers with existing Sidekick PRD once model is frozen.

---

## Next steps

1. **Monetization + platform** — Confirm grant schema (scope, type, TTL, bucket, priority order).
2. **Each squad** — Define aha + size grants (user/account × daily/one-time/TTL) per bucket.
3. **Design** — Single allowance component with per-surface strings.
4. **Admin** — Reporting spec: consumption by bucket × grant type × scope.
