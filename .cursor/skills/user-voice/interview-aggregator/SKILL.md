---
name: interview-aggregator
description: >
  Synthesizes Investigation Copilot user interview summaries (produced by the interview-summarizer skill)
  into one centralized, decision-ready Intelligence Report. Surfaces shared pain points across interviews,
  quantifies frequency and business impact, aligns to 2026 strategic mandates, detects sentiment
  deterioration, and tracks recurring pains longitudinally — producing a single doc leadership can
  act on immediately.
---

# Skill: User Interview Aggregator — Investigation Copilot (DevEx PM)

You are acting as a Lead PM for **Investigation Copilot** in the DevEx group at monday.com. Your job is to read all **Investigation Copilot** interview summaries from the User Interviews board and produce a single **Investigation Copilot Intelligence Report** — a prioritized, quantified synthesis that tells leadership exactly where to invest next in this product.

> **Goal:** Turn N Investigation Copilot interview summaries into one document that answers: *"If we could only fix three things this quarter in Investigation Copilot, what are they — and what is the business case for each?"*

> **Scope:** This report covers **Investigation Copilot interviews only** (`Interview Category = Investigation Copilot`). All other interview categories are excluded. If an interview's category is ambiguous, include it only if the dominant topic is clearly debugging, incident investigation, or AI-assisted root cause analysis.

---

## 2026 Strategic Mandates (Reference for All Prioritization)

Every pain point, action, and recommendation must be evaluated against the three 2026 North Stars:

| Tag | Mandate | Definition |
|---|---|---|
| `Agentic SDLC` | AI-Assisted Workflows | Transitioning manual dev tasks to AI (Sherlock, Agentic Teams) — target: **40%+ engineering effort saved** |
| `Core Resilience` | Uptime & Standards | Driving 99.99% uptime and 100% compliance (Iron Gate, Trident) |
| `Monetization & Scale` | Revenue & Platform Stability | Unlocking revenue through platform stability and data-driven prioritization ($70M ARR target) |
| `🚫 Unaligned` | No clear 2026 tie | Deprioritize unless a compelling case is made |

---

## Step 0 — Fetch Investigation Copilot Interview Summaries

Pull all items from the **User Interviews board** (ID: `18400716557`) using the monday.com MCP tool, filtered to `Interview Category = Investigation Copilot` (column `color_mm0qg7fh`).

For each item, retrieve:
- `name` — interview identifier
- `text_mm0qwq67` — Interviewee name
- `text_mm0qm53m` — Interviewee team
- `color_mm0qg7fh` — Interview Category (confirm value is `Investigation Copilot` — skip any others)
- `date4` — Interview date
- `long_text_mm0q60gf` — Leadership Summary
- `text_mm0q5s65` — Pain points (comma-separated labels)
- `numeric_mm0q2w91` — DevEx sentiment score
- `numeric_mm0qj9sb` — Category sentiment score (reflects sentiment toward Investigation Copilot specifically)
- `text_mm0qcxha` — Action items

Also read the full summary doc attached to each item (via `text_mm0qkysj`) when you need deeper evidence for a specific pain point or business impact estimate.

**Also check for previous Investigation Copilot aggregation runs:** Search the board for items whose `name` starts with `[Aggregation] Investigation Copilot`. If any exist, retrieve their `text_mm0q5s65` (pain points), `date4`, and `name` — you will use these to identify **Recurring Pains** in Step 2.

> If the board has more items than fit in one page, paginate until all are fetched. Exclude `[Aggregation] *` items from the frequency map. If after filtering you have fewer than 3 interviews, state this clearly at the top of the report and proceed — thin data is better than no report, but confidence levels must be flagged accordingly.

---

## Step 1 — Build the Pain Point Frequency Map

Parse the `Pain points` field from every interview item. Normalize labels to group semantically identical pains (e.g. "No env filter" and "Missing environment filter" → same cluster).

For each unique pain cluster, record:

| Pain Point | Count | Interviews | Categories | Avg Sentiment | Strategic Tag |
|---|---|---|---|---|---|
| [pain label] | N / total | [list of interview names] | [list of categories] | [avg score 1–5] | [2026 mandate or 🚫 Unaligned] |

**Normalization rules:**
- Lowercase and strip punctuation before grouping
- Treat 2+ labels as the same cluster if they share the core noun + friction type
- When in doubt, keep them separate — over-merging loses signal

**Strategic tagging rules:**
- Tag each pain to the 2026 mandate it most directly blocks or enables
- A pain can carry two tags if genuinely cross-cutting (e.g. `Agentic SDLC + Core Resilience`)
- If a pain has no credible link to any mandate, tag it `🚫 Unaligned`

---

## Step 2 — Produce the Intelligence Report

### Header

```
INVESTIGATION COPILOT — INTELLIGENCE REPORT
DevEx PM Group — monday.com
Generated:           [Today's date]
Product:                Investigation Copilot
Interviews analyzed:    [N] (Investigation Copilot category only)
Date range:          [earliest interview date] – [latest interview date]

Previous reports:    [N previous aggregation runs found, or "None — this is the baseline run"]
```

---

### ⚠️ Deterioration Alerts — Read This First

**This section always appears at the top of the report, before everything else.** It surfaces categories or pains that are actively worsening and require immediate leadership attention.

Trigger a **🚨 Deterioration Alert** when ANY of the following conditions are met:
1. A category's average sentiment score is **below 2.5 / 5**
2. A category's sentiment has **declined in 3 or more consecutive interviews** (sorted by date)
3. A pain cluster's frequency has **increased in each of the last 3 aggregation report cycles**

For each alert:

```
🚨 ALERT: [Category or Pain Name]
Condition triggered:  [e.g., "Avg sentiment 2.1/5 — below 2.5 threshold"]
Trend:                [e.g., "Declined: 3.2 → 2.8 → 2.1 across last 3 interviews (dates)"]
Affected interviews:  [N interviews, date range]
Strategic impact:     [Which 2026 mandate this puts at risk]
Recommended response: [Escalate to VP | Immediate PM investigation | Add to next sprint]
```

If no alerts are triggered, write:
> *"No deterioration alerts. All categories within acceptable sentiment thresholds."*

---

### 🏆 Executive Summary

Four bullets maximum — no prose, no padding. Every bullet must be a standalone, actionable statement a VP can act on in under 10 seconds.

```
• [Top validated pain] — affects [X/N] developers, costs ~[$estimate], threatens [2026 mandate].
• Sentiment is [improving / stable / deteriorating] — avg [X.X/5] across [N] interviews[; [category] is below threshold].
• [Recurring or escalating risk, if any] — [pain] has appeared in [N] consecutive reports with no resolution.
• Recommended this week: [specific decision or action] — [one-phrase business rationale].
```

**Rules:**
- Each bullet is one line. No sub-bullets.
- Skip the recurring risk bullet if no recurring pains exist — cap at 3 bullets.
- Lead with numbers, not adjectives. "7 of 12 developers" beats "many developers".

---

### 🔑 Key Findings

A scannable bullet-tier breakdown of all pain clusters by priority. This section must appear in the report immediately after the Executive Summary and be mirrored verbatim in the Feedback Summary doc (Step 5c).

Group pains into exactly the tiers that are present (omit empty tiers). Use this structure:

```
🔴 Critical — [N] pains cited in [X/total] interviews ([%])
1. [Pain name] — [one-sentence business impact] | [2026 mandate tag]
   > "[Direct quote from an interview that best validates this pain]" — [Role, Team]
2. ...

🟠 High Priority — [N] pains cited in [X/total] interviews ([%])
- [Pain name] — [one-sentence why it matters]
   > "[Direct quote]" — [Role, Team]
- ...

🟡 Medium Priority — [N] pains
- [Pain name] — [one-sentence why it matters]
   > "[Direct quote]" — [Role, Team]
- ...

🟢 Low / ⬜ Deprioritized — [N] pains (see full leaderboard below)
```

**Rules:**
- Each bullet is one line maximum. Full detail belongs in Deep Dives.
- Always include the business impact shorthand (e.g., "~$312K/year", "blocks staging adoption") on Critical and High bullets.
- Always include the 2026 mandate tag on Critical bullets.
- Each Critical and High bullet **must** include one direct quote from a real interview — attributed by role and team only (never full name). Pick the quote that best captures the pain in the user's own words.
- Medium bullets: include a quote if a particularly strong one exists; skip if the available quotes are too generic.
- Low / Deprioritized: no quotes needed.
- If a pain has a ⚠️ Squeaky Wheel caveat, append `[⚠️ Senior-only signal]` inline.
- Deprioritized pains: just count them — do not list individually here.

---

### 💬 Testimonials — The Developer Voice

A living wall of first-hand developer testimony, organized by pain. This section grows over successive report runs. It is the human face of the data — quotes, frustrations, and context that don't fit in a table but are often the most persuasive thing you can put in front of a stakeholder.

**How this section is maintained:**
- **Add** one testimonial block per active pain whenever a new interview surfaces a compelling quote.
- **Prefer depth over breadth** — one vivid, specific quote beats three generic ones.
- **On each new run**, re-evaluate existing testimonials:
  - If the pain is still active: keep the block; optionally add a stronger quote if found.
  - If the pain has been **resolved** (absent from current leaderboard AND explicitly confirmed resolved): **remove the block from the report** and print the following to terminal output:

```
[TESTIMONIAL RETIRED]
Pain:       [pain name]
Reason:     Pain resolved — absent from current leaderboard
Last seen:  [date of last aggregation run where it appeared]
Quote was:  "[the retired quote]" — [Role, Team]
```

**Testimonial block format:**

```
---
🩹 [Pain Name] | [Priority tier: 🔴 Critical / 🟠 High / 🟡 Medium] | [2026 mandate tag]

Sentiment: [avg score across interviews citing this pain] / 5
Cited in:  [N] interviews ([list of interview names or identifiers])

> "[Most compelling direct quote — ideally 1–3 sentences that capture the friction viscerally]"
> — [Role, e.g. "Senior Engineer, On-Call Team"] · [Interview date]

> "[Optional second quote if it adds meaningfully different context]"
> — [Role] · [Interview date]

In their words: [1–2 sentence synthesis in plain language — what these developers are actually experiencing day-to-day, without PM jargon]
---
```

**Rules:**
- Never fabricate or paraphrase quotes — use exact wording from the interview summary or doc. If the summary paraphrases, note it as `(paraphrased from summary)`.
- Attribute by role and team only — never include full names.
- Testimonials should make a reader feel the pain, not just understand it.
- On first run: generate testimonials for all 🔴 Critical and 🟠 High pains. Add 🟡 Medium testimonials only if the quotes are unusually strong.
- On subsequent runs: retain existing testimonials unless the pain is resolved; only replace a quote if a materially better one is found.

---

### 📊 Pain Point Leaderboard

A ranked table of all pain clusters.

**Sort order:**
1. Strategic alignment (aligned pains first, `🚫 Unaligned` last)
2. Frequency (higher count first)
3. Category breadth (cross-cutting pains rank higher within same frequency)

| Rank | Pain Point | Frequency | Strategic Tag | Categories | Sentiment Impact | Priority |
|---|---|---|---|---|---|---|
| 1 | [pain] | N/Total | [2026 mandate] | [categories] | [avg score] | 🔴 Critical |
| 2 | ... | | | | | 🟠 High |
| ... | | | | | | 🟡 Medium |
| ... | | | | | | 🟢 Low |
| ... | [pain] | N/Total | 🚫 Unaligned | | | ⬜ Deprioritized |

**Priority tiers:**
- 🔴 **Critical** — 50%+ of interviews OR 3+ categories AND aligned to 2026
- 🟠 **High** — 30–49% OR cross-cutting in 2 categories AND aligned to 2026
- 🟡 **Medium** — 15–29% AND aligned to 2026
- 🟢 **Low** — <15%, likely power user / edge case
- ⬜ **Deprioritized** — `🚫 Unaligned` to any 2026 mandate; requires explicit business case to re-rank

> ⚠️ **Squeaky Wheel Flag**: If a pain is mentioned frequently but only by senior/staff engineers or power users, call it out. A pain affecting 3 TLs is not the same signal as one affecting 10 mid-level devs.

---

### 🔍 Deep Dives — Top 5 Pain Points

For each of the top 5 strategically-aligned pains, write a structured deep-dive:

```
## [Rank]. [Pain Point Name]
Frequency:        [N] / [total] interviews ([%])
Strategic Tag:    [2026 mandate]
Categories:       [list]
OKR Pillar:       [Velocity | Excellence | Efficiency]

### What developers say
[2–3 representative direct quotes — attributed by role, not name (e.g., "Senior Engineer, Platform")]

### Why it matters
[1 paragraph using the causal chain: "This pain causes X → leads to Y → threatens Z on the 2026 roadmap."]

### 💸 Business Impact Estimate
Estimate developer hours lost per week using:
  Impact = (avg time lost per occurrence) × (occurrences per week per dev) × (est. WAA affected)

Show your working explicitly:
  Avg time lost per occurrence: [e.g., 15 min — based on N quotes]
  Weekly occurrences per dev:   [e.g., 3x/week — based on interview descriptions]
  Est. WAA affected:            [e.g., ~40 devs — based on team size and interview coverage]
  ─────────────────────────────────────────────────────────────
  Total: ~[X] dev-hours/week ≈ ~[Y] engineering days/week

State assumptions clearly. Give a low/high range if data is ambiguous.
Directional accuracy is sufficient — zero estimate is not acceptable.

### Validated hypothesis
"We believe that if we reduce [friction point], then [outcome metric] will improve by [estimated range],
as evidenced by [N interviews / findings]."

### Recommended action
[Spike | Bet | Kill | Validate further] — [1 sentence rationale tied to 2026 mandate and cost estimate]
```

---

### 🗓️ Trend Over Time

If the interview dataset spans more than 4 weeks, analyze whether pains are:
- **Increasing** — appearing in more recent interviews than older ones
- **Stable** — consistent frequency across the date range
- **Declining** — appearing less often (possible sign of a resolved issue or shifting priorities)

Write as a narrative paragraph. Skip this section if the date range is too narrow for meaningful analysis.

---

### 🧩 Developer Profile Breakdown

Since all interviews are scoped to Investigation Copilot, break down findings by **developer profile** (experience level, team type, tenure) rather than by category. This surfaces whether certain pains are role-specific or universal.

```
### [Profile Segment] — e.g., "Senior / Staff Engineers" or "Junior–Mid Developers" or "On-Call Primary"
Interviews in segment:               [N]
Top pains:                           [top 3 pain labels with counts]
Avg DevEx sentiment:                 [X.X / 5]
Avg Investigation Copilot sentiment: [X.X / 5]
Signal:                              [1 sentence — does this segment experience the product differently?]
Alert status:                        [🚨 Alert triggered | ✅ Within thresholds]
```

> This breakdown is key for Squeaky Wheel analysis. If a pain is 🔴 Critical but only surfaces in Staff+ engineers, its WAA impact may be lower than frequency suggests — call it out explicitly.

---

### 🔁 Recurring Pains — Longitudinal Tracker

Compare the current top pains against all previous aggregation runs retrieved in Step 0.

For each pain that has appeared in **2 or more consecutive aggregation reports**, surface it:

| Pain Point | Consecutive Reports | First Seen | Trend | Escalation Status |
|---|---|---|---|---|
| [pain] | [N reports] | [date of first aggregation] | [↑ worsening / → stable / ↓ improving] | [⚠️ Escalate / 👀 Monitor / ✅ Resolving] |

**Escalation rules:**
- **3+ consecutive reports** → `⚠️ Escalate` — unresolved; must be raised to VP level with a mitigation plan
- **2 consecutive reports** → `👀 Monitor` — watch for resolution in the next cycle
- **In previous report but absent now** → `✅ Resolving` — positive signal; acknowledge explicitly

> *"If a pain has appeared in 3+ consecutive reports, it has survived at least one planning cycle without being addressed. That is a process failure, not a discovery — escalate accordingly."*

If no previous aggregation runs exist:
> *"First aggregation run — no longitudinal baseline yet. This report establishes the baseline for future comparison."*

---

### 📋 Master Action List

A unified, deduplicated list of all action items surfaced across all Investigation Copilot interviews, grouped by pain cluster.

| Action | Source Interviews | Strategic Tag | OKR Pillar | Suggested Owner |
|---|---|---|---|---|
| [action item] | [N interviews] | [2026 mandate] | [Velocity / Excellence / Efficiency] | [PM / Eng / Design] |

Sort by: Strategic Tag (aligned first) → source interview count (descending) → OKR pillar (Velocity first).

`🚫 Unaligned` actions appear at the bottom with the note: *"Requires explicit business case before resourcing."*

---

### ❓ Open Questions Across the Dataset

The top 5 questions that appear in multiple interview follow-up sections and remain unanswered. These are the highest-value targets for the next interview cycle.

Format:
> **[Question]** — *Appears in [N] interviews. Unlocks: [the decision or hypothesis this resolves]. Strategic relevance: [2026 mandate]*

---

### 👥 Next Interview Recommendations

The next 3–5 interview profiles that would fill the most critical gaps. Prioritize profiles that validate or invalidate `🔴 Critical` pains or `⚠️ Escalate` recurring pains.

Format:
> **[Role / Team / Profile]** — *Rationale: [gap this fills and which 2026 mandate it informs]*

---

## Step 3 — Create the Intelligence Report Doc

Save the full report as a monday.com doc:

- `location`: `"workspace"`
- `workspace_id`: `3400218` (DevTools)
- `folder_id`: `17972460` (Product / User Interviews)
- `doc_name`: `Investigation Copilot Intelligence Report — [YYYY-MM-DD]`
- `markdown`: the full report output

Share the doc link with the user.

---

## Step 4 — Create the Tracking Item on the Interviews Board

Create a summary item on the **User Interviews board** (ID: `18400716557`) to log this aggregation run and update the longitudinal baseline:

- **Name**: `[Aggregation] Investigation Copilot Report — [YYYY-MM-DD]`
- **Leadership Summary** (`long_text_mm0q60gf`): the Executive Summary + any Deterioration Alerts
- **Pain points** (`text_mm0q5s65`): top 5 strategically-aligned pain point labels, comma-separated — **this field is the key comparison field for future Recurring Pain detection; keep labels normalized**
- **Action Items** (`text_mm0qcxha`): top 5 action items from the Master Action List, comma-separated

> Each aggregation item is a timestamped snapshot of the pain landscape. Future runs compare `text_mm0q5s65` across these snapshots to surface Recurring Pains and trigger VP escalations. Consistency in label naming across runs is critical.

---

---

## Step 5 — Update the Living Feedback Summary Doc

After saving the Intelligence Report (Step 3) and the tracking item (Step 4), update the **living feedback summary doc** in the DevTools workspace. This doc is the always-current, single source of truth for Investigation Copilot feedback — the one stakeholders bookmark and reference between report runs.

### 5a — Find or Create the Doc

Search the **General folder** (ID: `17875187`) in the DevTools workspace (ID: `3400218`) for a doc named exactly `"Investigation Copilot - Feedback Summary"`.

**Use the `read_docs` tool with:**
- `type`: `"workspace_ids"`
- `ids`: `["3400218"]`

Scan the returned docs for the exact name `"Investigation Copilot - Feedback Summary"`.

**If found:** note its doc ID — you will use the monday.com GraphQL API to replace its content in Step 5b.

**If not found:** create it now using `create_doc` with:
- `location`: `"workspace"`
- `workspace_id`: `3400218`
- `folder_id`: `17875187`
- `doc_name`: `"Investigation Copilot - Feedback Summary"`
- `markdown`: the full content defined in Step 5c below

Then skip Step 5b (the doc was just created with fresh content) and proceed to share the link.

---

### 5b — Replace the Doc Content (if doc already existed)

Monday.com docs cannot be partially edited via API — the only way to "clean" the doc is to delete all existing blocks and replace them. Use the following GraphQL mutation to clear and rewrite the doc content.

First, fetch the doc's current blocks to get block IDs:

```graphql
query GetDocBlocks($docId: ID!) {
  docs(ids: [$docId]) {
    blocks {
      id
      type
      content
    }
  }
}
```

Then delete all existing blocks:

```graphql
mutation DeleteDocBlock($blockId: ID!) {
  delete_doc_block(block_id: $blockId) {
    id
  }
}
```

Run this mutation for every block ID returned. Once cleared, add the new content using `create_doc_block` calls, or use the simpler approach: since `create_doc` with an existing `doc_name` in the same folder will fail, instead use the `all_monday_api` tool to call:

```graphql
mutation ReplaceDocContent($docId: ID!, $content: String!) {
  add_doc_block(
    doc_id: $docId,
    type: normal_text,
    content: $content,
    after_block_id: null
  ) {
    id
  }
}
```

> **Practical approach:** If block-level editing proves complex, create the new doc with a temporary name, then inform the user both the updated content and the old doc ID so they can manually archive the old one. Always prefer the cleanest automated path, but never leave the user without the updated content.

---

### 5c — Doc Content: The Feedback Summary Format

The living summary doc must follow this exact structure. It is **not** the full Intelligence Report — it is a distilled, always-readable summary optimized for quick consumption by anyone in the org.

```markdown
# Investigation Copilot — Feedback Summary

> **Last updated:** [Today's date] | **Interviews analyzed:** [N] | **Report:** [link to full Intelligence Report doc from Step 3]

---

## ⚠️ Active Alerts
[Paste the Deterioration Alerts section verbatim from the report, or write "None" if no alerts were triggered]

---

## 🏆 Executive Summary
[Paste the Executive Summary bullets (max 4) from the report]

---

## 🔑 Key Findings
[Paste the Key Findings tiered bullet section verbatim from the report — Critical, High, Medium, Low/Deprioritized tiers, including the validating quotes under each bullet]

---

## 💬 Testimonials — The Developer Voice
[Paste the full Testimonials section verbatim from the report. This section persists and grows across runs. If a pain was retired this run, it will already be absent here — the terminal output records it.]

---

## 🔄 What's Changed Since Last Report

> *(Skip this section if this is the first run — write "First report — no baseline to compare against.")*

Compare the current top-5 pain leaderboard against the previous aggregation run's `text_mm0q5s65` field (fetched in Step 0).

For each notable change, write one bullet:

- 🆕 **New pain entered top 5:** [pain name] — first appeared this cycle, ranked #[N]
- 📈 **Pain increased in frequency:** [pain name] — was mentioned in [X] interviews last cycle, now [Y]
- 📉 **Pain declined:** [pain name] — dropped from #[prev rank] to #[new rank] or no longer in top 5
- ✅ **Pain resolved / dropped out:** [pain name] — was in previous top 5, absent from this cycle's data
- → **No change:** [pain name] — stable at rank #[N] for [X] consecutive reports

If there were no changes (same top 5, same order), write: *"Top 5 pains unchanged from previous report."*

---

## 📊 Top Pain Points

[Paste the full Pain Point Leaderboard table from the report]

---

## 🔍 Top 3 Deep Dives

[Paste only the top 3 deep-dives from the report — rank 1, 2, and 3 only]

---

## 📋 Priority Action Items

[Paste the Master Action List table from the report, but limited to items from the top 5 pains only]

---

## 📎 Source Interviews

| Interview | Date | Interviewee Role | Sentiment (Copilot) |
|---|---|---|---|
[One row per Investigation Copilot interview analyzed, sorted by date descending]

---

*Full Intelligence Report: [link from Step 3] | Interviews Board: https://monday.com/boards/18400716557*
```

---

### 5d — Share the Doc Link

After the doc is created or updated, share the link with the user with a brief confirmation:

> *"✅ 'Investigation Copilot - Feedback Summary' has been updated. [link]*
> *The 'What's Changed' section highlights [N changes / 'no changes'] since the last report."*

---

## Formatting & Quality Rules

- **No vague language.** "Many developers feel..." → bad. "7 of 12 developers mentioned..." → good.
- **Always cite source interviews.** Every claim traces back to at least one named interview item.
- **Strategic alignment is non-negotiable.** Every pain and action carries a 2026 mandate tag. `🚫 Unaligned` items are surfaced but never buried — they sit at the bottom of the leaderboard with an explicit call-out.
- **Business impact estimates are required for all top-5 pains.** Directional accuracy with stated assumptions is fine. No number at all is not acceptable.
- **Deterioration Alerts always come first.** A VP reading this report hits the critical escalations before anything else.
- **Recurring Pains get escalated, not noted.** If a pain has survived 3+ planning cycles, frame it as a process failure requiring an immediate owner and mitigation plan.
- **Avoid double-counting.** If one developer was interviewed twice, normalize their contributions.
- **Keep the Executive Summary honest.** Thin data = thin confidence. Say so.
- **Always close with a specific ask to the PM**, e.g.: *"Should I draft the problem brief for Pain #1, write the VP escalation memo for the recurring 'X' pain, or prioritize filling the interview gap in [team]?"*
