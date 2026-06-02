---
name: prd-writing
description: >
  The only PRD workflow for this workspace. Use for any PRD, product spec,
  or feature requirements. Ask clarifying questions before writing if
  anything is unclear. One problem statement, Opportunity (evidence only),
  growth hypothesis, Scope, Requirements table by persona, Data with A/B
  metrics and/or gradual release (no events). Always ask where to publish
  in monday, then create the doc via monday MCP and return the link.
  No author/metadata boilerplate.
---

**This is the single source of truth for PRDs.** Do not use other templates or commands.

A full **example PRD** is at the bottom — match that shape.

---

## Rule #1: Ask before you write

**Do not draft a PRD** until you have enough context. If anything is missing or ambiguous, **stop and ask** — batch all questions in one message. Do not guess.

| Topic | Ask if unclear |
|-------|----------------|
| **What we're shipping** | Feature, surface, population |
| **A/B test** | Will this ship as an A/B test? (yes / no) |
| **Gradual release** | Phased rollout? (e.g. 5% → 25% → 100%) |
| **Need a Data section?** | Any A/B metrics or rollout plan to document? (yes / no) |
| **Primary persona** | Who is the main user? |
| **Primary metric** | What moves if this works? |
| **1st release boundary** | What must ship day one vs what can wait |
| **Figma / flows** | Link or confirm UX doesn't exist yet |
| **monday placement** | Board item doc, standalone doc, append to existing doc, or repo only? (ask again after draft if still unknown) |

Only start writing after the user answers or says to proceed with stated assumptions.

---

## Rule #2: Never include

- Author, date, status, contacts, Slack blocks
- **P0 / P1 / P2** — use **Must for 1st release** / **Not in 1st release** in the Requirements table
- **Events** in the Data section (instrumentation lives elsewhere)
- Empty sections — omit entirely
- Intro fluff or duplicate hypothesis text

---

## PRD structure (in order)

Omit sections that do not apply.

```markdown
# PRD: [Feature name]

## Problem

## Opportunity
(evidence only)

## Hypothesis

## Target users

## Scope

## Requirements
(table)

## Solution
(only if UX)

## Edge cases
(only if needed)

## Technical considerations
(only if needed)

## Data
(A/B metrics and/or gradual release — only if needed)

## Open questions

## Market snapshot
(optional)
```

---

## Problem

**One sentence** — pain or broken behavior today. Not the solution.

**Good:** "Account admins who hit the Sidekick daily message cap cannot continue in-context and abandon the session instead of upgrading."

---

## Opportunity

**Evidence only** — bullets that prove the problem is real. No "why" subsection (the why lives in Problem + Hypothesis).

```markdown
## Opportunity

- Funnel stat, usage data, quote, support theme
- Or: `Opinion — no quant yet`
```

Do not repeat the problem statement. Do not argue why to build — that belongs in Hypothesis.

---

## Hypothesis

One sentence:

> **If we** [change] **for** [segment] **when** [moment], **then** [metric] will [direction] **because** [mechanism].

---

## Scope

Before Requirements — sets the boundary so eng knows what v1 is.

| Must for 1st release | Not in 1st release |
|----------------------|---------------------|
| | |

---

## Requirements

Section title is exactly **`## Requirements`**.

One **table** for the whole PRD. One row per requirement.

| Persona | Release | Requirement |
|---------|---------|-------------|
| Account admin | Must for 1st release | See remaining free messages until cap. |
| Account admin | Must for 1st release | At cap: input disabled + CTA to start trial. |
| Account admin | Not in 1st release | Non-admin “ask admin” flow. |
| Team member | Must for 1st release | Access follows account when admin starts trial. |
| System / billing | Must for 1st release | Subscription: 14-day free period then auto-bill. |

**Release** column values only:
- `Must for 1st release`
- `Not in 1st release`

**Rules**
- One testable behavior per row.
- Include every persona with distinct behavior.
- No checkbox bullets — table only.

---

## Solution (only when there is UX)

- Product areas — bullets
- Flow table when steps are ordered:

| Step | Persona | Behavior (must for 1st release) | Surface |
|------|---------|-----------------------------------|---------|
| 1 | Admin | … | Where in the product (chat, email, modal, etc.) |

- Figma link
- Design notes — bullets, build-affecting only

---

## Data (only if needed)

Include when there is an **A/B test**, a **gradual release**, or **launch success metrics** to track. Omit the whole section if none apply.

**Never include events** — no event tables, no BigBrain event lists.

### A/B test (when yes)

```markdown
## Data

### A/B test
| | |
|---|---|
| Hypothesis | (same one sentence as above) |
| Variants | Control: … · Treatment: … |
| Audience | Segment, eligibility |
| Primary metric | Definition + target |
| Guardrails | 1–3 counter-metrics |
| Decision rule | Ship / iterate / kill if … |
```

### Gradual release (when phased rollout)

```markdown
### Gradual release
| Phase | Audience / % | Success criteria to advance |
|-------|----------------|----------------------------|
| 1 | Internal / 5% | No P0 bugs, metric stable |
| 2 | 25% | Primary metric directionally positive |
| 3 | 100% | … |
```

### Launch metrics (no A/B, but need targets)

```markdown
### Success metrics
| Metric | Current | Target | Guardrail |
|--------|---------|--------|-----------|
```

You may combine **A/B test** + **Gradual release** + **Success metrics** in one Data section when all apply.

---

## Open questions · Market snapshot

**Open questions:** numbered; owner only if known.

**Market snapshot:** optional, ≤6 bullets, last.

---

## Concision

- Problem = one sentence · Opportunity = evidence bullets · Hypothesis = one sentence
- Scope before Requirements · Requirements = one table
- Data = metrics and rollout only — no events
- **10-minute read**

---

## Publish to monday (mandatory — do not skip)

**After the PRD content is ready**, always ask where to put it unless the user already specified in this thread:

> **Where should this PRD live in monday?**
> 1. **Board item** — new doc on a pulse (paste item URL or item ID)
> 2. **Standalone doc** — workspace doc not tied to a pulse (workspace ID and/or folder ID if you have them)
> 3. **Existing doc** — append to a workdoc (paste doc URL)
> 4. **Repo only** — save markdown in this workspace, no monday doc

Do **not** publish until the user picks an option (or gave it upfront).

### Automatically create the doc (monday.com MCP)

Use the **full PRD markdown** as `markdown` (same content you show the user).

| User choice | MCP tool | Parameters |
|-------------|----------|------------|
| **Board item** | `create_doc` | `location: "item"`, `item_id` (from URL `.../pulses/ITEM_ID`), `doc_name`: `# PRD: [Feature name]`, `markdown`: full PRD. Optional `column_id` if the board already has a doc column. |
| **Standalone doc** | `create_doc` | `location: "workspace"`, `workspace_id`, `doc_name`, `markdown`. Optional `folder_id`, `doc_kind` (`public` / `private`). |
| **Existing doc** | `add_content_to_doc` | `doc_id` or `object_id` from URL (`monday.monday.com/docs/OBJECT_ID`), `markdown`: full PRD (or `---` + PRD if preserving prior content). |
| **Repo only** | — | Write `Knowledge/Tasks/PRD-[short-name].md` (or path user gives). Skip MCP. |

**Parse URLs**
- Item: `https://monday.monday.com/boards/{board_id}/pulses/{item_id}` → use `item_id`
- Doc: `https://monday.monday.com/docs/{object_id}` → use `object_id` for append, or `doc_id` from API response
- Pulse + doc: `.../pulses/{item_id}?doc_id={doc_id}` → append uses `doc_id`; new item doc uses `item_id`

### Return links to the user (required)

After MCP succeeds, reply with **clickable markdown links**:

1. **Doc:** `https://monday.monday.com/docs/{object_id}` (from API response if provided; else construct from returned ids)
2. **Board item** (if item-attached): `https://monday.monday.com/boards/{board_id}/pulses/{item_id}?doc_id={doc_id}`

If the API returns only `doc_id`, also call `read_docs` with `type: "ids"` to resolve the public URL when needed.

### Local copy (when useful)

If saving to the repo, put the monday link at the **top** of the file:

```markdown
# PRD: [Feature name]

**monday:** [open doc](https://monday.monday.com/docs/…)
```

Do not add author/date/status lines.

### If monday MCP fails

Tell the user what failed, keep the PRD in chat (and repo if requested), and retry after they fix the token or permissions.

---

## Before you hand off

- [ ] Asked when context was unclear
- [ ] Opportunity = evidence only
- [ ] Scope before Requirements; Requirements is a table titled `Requirements`
- [ ] Data has A/B and/or gradual release and/or success metrics — no events
- [ ] No metadata / P0-P2 / empty sections
- [ ] Asked monday placement; published via MCP (or repo-only) and **shared doc link(s)**

---

## Example PRD

```markdown
# PRD: Sidekick admin trial at daily cap

## Problem

Account admins on free or limited plans who hit the Sidekick daily message cap are blocked mid-task with no in-product path to keep going, so they abandon instead of starting a paid trial.

## Opportunity

- Admins are purchase decision-makers for add-ons; members cannot buy.
- Users who exceed the free cap have already used Sidekick enough to reach aha.
- Trial start and conversion baselines: TBD from 2-week pre-period (Redash).

## Hypothesis

If we offer admins a 14-day auto-billing trial when they hit the daily cap, trial start rate will exceed 15% because they have already seen value and friction is lowest at peak intent.

## Target users

- **Primary:** Account admins on free/limited plans who hit the daily Sidekick message cap.
- **Secondary:** Team members who gain access after the admin purchases.
- **Not in scope:** Non-admins starting trials; accounts already on paid Sidekick.

## Scope

| Must for 1st release | Not in 1st release |
|----------------------|---------------------|
| Admin-only trial start | Member request flow |
| 14-day auto-billing trial | Tiered Sidekick pricing |
| Centerkick + chat + left panel | Board widget entry |
| In-app + email end reminder | SMS / push |

## Requirements

| Persona | Release | Requirement |
|---------|---------|-------------|
| Account admin | Must for 1st release | See remaining free messages in Sidekick surfaces until cap. |
| Account admin | Must for 1st release | At cap: input disabled, clear message, CTA to start 14-day trial. |
| Account admin | Must for 1st release | Trial modal: $0 today → reminder → billing; start trial requires card on file. |
| Account admin | Must for 1st release | During trial: no daily cap; counter/banner removed. |
| Account admin | Must for 1st release | One day before trial ends: in-app notification + manage apps link. |
| Account admin | Must for 1st release | After trial: auto-bill $10/seat/month for 100 messages unless cancelled. |
| Account admin | Not in 1st release | Non-admin “ask admin to upgrade” flow. |
| Account admin | Not in 1st release | Variable trial length or multi-touch reminders. |
| Account admin | Not in 1st release | Trial without payment method on file. |
| Team member | Must for 1st release | When admin starts trial, member access follows account entitlement. |
| Team member | Not in 1st release | Member-facing upgrade or trial request UI. |
| System / billing | Must for 1st release | Trial creates subscription with 14-day free period then auto-bill. |
| System / billing | Must for 1st release | Entitlement: free cap → unlimited (trial) → paid quota. |
| System / billing | Must for 1st release | Only admins can start trial or purchase. |
| System / billing | Not in 1st release | A/B on trial copy length. |

## Solution

**Product areas:** Sidekick chat, centerkick, left panel, billing/checkout, notifications, email.

| Step | Persona | Behavior (must for 1st release) | Surface |
|------|---------|----------------------------------|---------|
| 1 | Admin | Banner: messages left + “Try free trial” | Sidekick chat, centerkick, left panel |
| 2 | Admin | Cap reached: disabled input + trial CTA | Same surfaces |
| 3 | Admin | Trial modal → start trial | Modal from CTA |
| 4 | Admin | Trial active: unlimited messages | All Sidekick surfaces |
| 5 | Admin | Reminder 1 day before end | Notification bell + email |
| 6 | Admin | Trial ends → billing starts | Billing (background) |

**Figma:** [Sidekick add-on monetization — Admin](https://www.figma.com/design/oXyfPYsyGHQA3WtE6EvOIc/Sidekick-add-on-monetization?node-id=857-22547)

**Design notes**
- Trust timeline on modal: $0 → reminder → billing.
- Secondary CTA “See plans” for admins who won’t start trial immediately.
- Post-trial: CTA shifts to “Purchase now.”

## Edge cases

1. Admin loses admin role mid-trial — trial stays on account; any admin can manage.
2. Account downgraded mid-trial — Sidekick trial continues independently.
3. Admin already trialed — purchase path only, not second trial.
4. Trial start fails (billing) — clear error; no ambiguous entitlement.

## Technical considerations

- Billing: subscription + 14-day free period.
- Entitlement service: free → trial unlimited → paid.
- Admin role gate on trial/purchase.
- Feature flag for rollout.

## Data

### Gradual release

| Phase | Audience / % | Success criteria to advance |
|-------|----------------|----------------------------|
| 1 | Internal dogfood | No P0 bugs; entitlement transitions correct |
| 2 | 5% of eligible admins | Trial start funnel stable; support volume normal |
| 3 | 25% | Trial start rate directionally ≥ baseline |
| 4 | 100% | PM sign-off after 2 weeks at 25% |

### Success metrics

| Metric | Current | Target | Guardrail |
|--------|---------|--------|-----------|
| Trial start rate (cap hit → trial) | TBD | >15% | Sidekick DAU not down |
| Trial-to-paid conversion | TBD | TBD | Support tickets not up |

## Open questions

1. Trial start target — set from 2-week baseline before phase 2.
2. Non-admin at cap — copy-only in v1?

```

*Older reference for content only: `sidekick/PRD-Sidekick-Paid-Trial-Admin.md` — output must match the structure above.*
