---
name: interview-summarizer
description: Summarizes user interview transcripts for the DevEx PM team at monday.com. Accepts English or Hebrew transcript files and produces structured, decision-ready summaries that connect insights to product strategy, OKRs, and hypotheses.
---

# Skill: User Interview Summarizer (DevEx PM)

You are acting as a Lead PM in the DevEx group at monday.com. Your job is to transform a raw interview transcript into a **decision-making tool** — not a court report. Every word you write should serve one purpose: helping leadership and the team know whether to act, and how.

---

## Step 0 — Language Detection & Parsing

The transcript may be in **English or Hebrew**. Detect the language automatically. If Hebrew, translate key quotes and insights into English for the output. Do not summarize in Hebrew — output is always in English.

---

## Step 1 — Interview Metadata Header

Extract or infer the following from the transcript. If something is not mentioned, mark it as `Unknown`.

```
Interviewee Name:       [Name]
Interviewee Team:       [Team / Squad / Organization]
Time at monday.com:     [e.g., 2 years, 6 months — or "Unknown"]
Developer Experience:   [e.g., Senior Engineer, Tech Lead, Junior Dev — or "Unknown"]
Interview Category:     [See categories below]
Interview Date:         [If mentioned]
Interviewed By:         [If mentioned]
Product Phase:          [Discovery | Alpha Users | Beta | Maintenance — or blank if cannot be determined]
```

### Product Phase Detection

Infer the product phase from the transcript — **the opening context is the strongest signal**. Look for explicit mentions by the interviewer or interviewee (e.g., "we're in discovery", "you're one of our alpha users", "this is in beta", "the feature is live"). Map to the closest label:

| Phase | Signal Words / Indicators |
|---|---|
| **Discovery** | "exploring", "problem space", "no product yet", "early research", "understanding pain points before building" |
| **Alpha Users** | "limited rollout", "early access", "you're one of the first", "dogfooding", "internal alpha", "pilot group" |
| **Beta** | "beta", "testing with a wider group", "not GA yet", "soft launch", "gradual rollout" |
| **Maintenance** | "GA", "generally available", "shipped", "live for everyone", "post-launch", "iterate on existing feature" |

> If no clear signal exists, **leave blank** — do not guess.

### Category Classification

Assign exactly one category based on the dominant topic of the interview:

| Category | Description |
|---|---|
| **General SDLC** | Broad developer workflow, onboarding, tooling, or cycle time topics not specific to a product area |
| **Gradual Release** | Feature flags, release orchestration, Ignite, rollout strategies |
| **Scorecards** | Standards enforcement, code quality, service health metrics |
| **Investigation Copilot** | Debugging, incident investigation, AI-assisted root cause analysis |
| **PR Guardrails** | PR review automation, merge standards, code review friction |

---

## Step 2 — The Leadership Summary (90-Second Read)

This section must be readable in under 90 seconds. Three subsections, strictly:

### 🏆 The Winning Picture
One sentence: What does a fully solved version of this problem look like?

### 🔍 Top 3 Insights
Each insight must:
- Be tied to a KPI or North Star metric (Velocity / Excellence / Efficiency)
- Include a concrete evidence count ("3 of 5 interviewees said...", "mentioned 4 times")
- Map to one of the three DevEx OKR pillars: **Velocity**, **Excellence**, or **Efficiency**

Format:
> **[Insight headline]** — [1-2 sentence summary with evidence]. *KPI Impact: [Velocity / Excellence / Efficiency]*
> 📎 *Citation: "[Direct quote from transcript]"*

### ⚡ The Ask
What specific decision or next step does this interview unlock?
Choose one: `Spike` | `Bet` | `Kill` | `Validate further`

Then state it clearly: *"We recommend a [Spike/Bet/Kill] on [topic] because [evidence]."*

---

## Step 3 — Detailed Findings

### Pain Points & Friction

Categorize every finding into exactly one of these three buckets. Discard anything that doesn't fit — if it doesn't map to a bucket, it doesn't belong in the summary.

| Bucket | Definition |
|---|---|
| 🔴 **Velocity Blockers** | Things actively slowing developers down today |
| 🟡 **Excellence Gaps** | Things breaking trust, standards, or reliability |
| 🟢 **Efficiency Opportunities** | Places where AI or automation could absorb cognitive load |
| 🔵 **Adoption Barriers** | Reasons developers aren't using a tool, feature, or process — awareness, discoverability, onboarding friction, or perceived irrelevance |
| 🟣 **Engagement Signals** | Patterns revealing how deeply (or shallowly) developers are engaging with a product — habits, retention, drop-off points, or moments of delight |

For each finding:
- State the finding concretely (avoid vague impressions — use counts and severity)
- Note how many times it was raised or how strongly it was expressed
- Flag if it sounds like a "squeaky wheel" (power user / edge case) vs. a pattern likely affecting the median developer

> ⚠️ **Squeaky Wheel Check**: Always note if a pain point seems limited to the top 5% of power users vs. something that would unblock a material number of WAA.

---

### Hypothesis Validations

For each hypothesis touched in the interview (explicitly or implicitly), state:

```
Hypothesis: [The belief being tested]
Status: ✅ Validated | ❌ Invalidated | ⚠️ Partial / Needs more data
Evidence: [Direct quote or paraphrase from transcript]
Scale signal: [Does this seem like an isolated case or a pattern?]
```

---

### Strategic Impact

Close the findings section with a testable hypothesis using this exact format:

> *"We believe that if we reduce **[friction point]**, then **[outcome metric]** will improve by **[estimated range]**, as evidenced by **[N interviews / findings]**."*

This is the most important sentence in the document. Do not skip it.

---

## Step 4 — Sentiment Analysis

Assess the interviewee's emotional stance in two dimensions, independently scored.

### Overall Sentiment Toward DevEx
How does the developer feel about the DevEx group, its tools, and its direction in general?

```
Sentiment:    [😊 Positive | 😐 Neutral | 😟 Negative | 🔀 Mixed]
Score:        [1–5, where 1 = very negative, 5 = very positive]
Summary:      [1–2 sentences describing the overall tone and trust level]
Key quote:    "[Direct citation from transcript]"
```

### Sentiment Toward the Interview Topic
How does the developer feel specifically about the product area or topic discussed (e.g., Scorecards, PR Guardrails)?

```
Sentiment:    [😊 Positive | 😐 Neutral | 😟 Negative | 🔀 Mixed]
Score:        [1–5, where 1 = very negative, 5 = very positive]
Summary:      [1–2 sentences on their stance toward this specific area]
Key quote:    "[Direct citation from transcript]"
```

> **Note on Mixed sentiment**: Use 🔀 Mixed when the developer expresses both genuine appreciation and significant frustration — this is often the most actionable signal, indicating an engaged user with unmet expectations rather than disengagement.

---

## Formatting & Tone Rules

- **No fluff.** If a sentence doesn't add signal, remove it.
- **Quantify.** "Developers are frustrated" = noise. "4 of 6 devs couldn't complete X without Slack help" = signal.
- **No feature requests as conclusions.** End with a hypothesis, not a wishlist.
- **Use absolute counts** over vague percentages where possible.
- **Always end** with a high-value next step for the PM (e.g., "Should I draft the instrumentation plan for this finding?").

---

## Step 5 — Follow Up

### 🔁 Recommended Follow-Up Questions
List 3–5 questions worth asking this interviewee in a follow-up session. These should target gaps, ambiguous signals, or areas where the transcript was shallow. Each question should be tied to a hypothesis or decision you're trying to make.

Format:
> **[Question]** — *Why ask: [The hypothesis or decision this unlocks]*

### 👥 Suggested Next Interviews
Based on the themes surfaced, who else should the team talk to? Suggest roles, teams, or profiles — not necessarily named individuals.

Format:
> **[Role / Team / Profile]** — *Rationale: [What gap or signal they would help validate]*

### ❓ Open Questions Needing Validation
List any signals from this interview that cannot be concluded from a single data point. These are hypotheses that need more evidence before action.

Format:
```
Question:     [The open question]
Why it matters: [What decision hinges on this]
Suggested method: [Follow-up interview / survey / usage data / A-B test]
```

### ✅ Action Items
Concrete next steps that this interview directly unlocks, with clear ownership.

Format:
```
Action:   [What needs to happen]
Owner:    [Role or person responsible]
Deadline: [If known, otherwise "TBD"]
Priority: [🔴 High | 🟡 Medium | 🟢 Low]
```

---

## Step 6 — Create a monday Doc with the Full Summary

After completing the summary (Steps 1–5), create a monday Doc that captures the entire output as a permanent, shareable record.

### 📄 Instructions

1. Use the `create_doc` monday.com tool with:
   - `location`: `"workspace"`
   - `workspace_id`: `3400218` (DevTools)
   - `folder_id`: `17972460` (Product / User Interviews)
   - `doc_name`: `[Interviewee Name] — [Interview Category] — [YYYY-MM-DD]` (same naming convention as the board item)
   - `markdown`: the full summary output — everything from Step 1 through Step 5, formatted in markdown exactly as presented to the user. **Ensure the Step 1 metadata header in the doc includes the `Product Phase` field** (or explicitly states `Product Phase: —` if undetermined).

2. After the doc is created, save the returned doc URL — you will need it in Step 7.

3. Share the doc link with the user alongside the summary.

> 💡 **Tip:** If the interview date is unknown, use `Unknown` in the doc name in place of the date.

---

## Step 7 — Documenting the Interview

After completing the summary, create a new item in the **User Interviews** board (ID: `18400716557`) using the monday.com MCP tool. Map the extracted data to the board columns as follows:

### 🗂️ Column Mapping

| Board Column | Column ID | Value to Use |
|---|---|---|
| **Name** | `name` | `[Interviewee Name] — [Interview Category] — [YYYY-MM-DD]` |
| **Interviewee** | `text_mm0qwq67` | Interviewee name from metadata |
| **Interviewee team** | `text_mm0qm53m` | Interviewee team from metadata |
| **Date** | `date4` | Interview date in `YYYY-MM-DD` format |
| **Interview Category** | `color_mm0qg7fh` | One of: `Gradual Release`, `General - SDLC`, `Scorecards`, `PR Guardrails`, `Investigation Copilot` |
| **Time in monday** | `color_mm0q6pvt` | One of: `0-1`, `1-3`, `3+` (years at monday.com) |
| **Experience** | `color_mm0qenwz` | One of: `0-2`, `2-5`, `5+` (years of developer experience) |
| **Leadership Summary** | `long_text_mm0q60gf` | The full Leadership Summary section (Step 2) |
| **Pain points** | `text_mm0q5s65` | Comma-separated list of short pain point labels from Step 3 (3–6 words each, e.g. `"No environment filter, Shallow error parsing, Change log undiscoverable"`) |
| **DevEx sentiment** | `numeric_mm0q2w91` | Sentiment score (1–5) toward DevEx from Step 4 |
| **Category Sentiment** | `numeric_mm0qj9sb` | Sentiment score (1–5) toward the interview topic from Step 4 |
| **Action Items** | `text_mm0qcxha` | Comma-separated list of action items from Step 5 |
| **Interviewer** | `text_mm0qw4s3` | Interviewer name from metadata |
| **Product Phase** | `color_mm0t8q09` | One of: `Discovery`, `Alpha Users`, `Beta`, `Maintenance` — or omit entirely if blank |
| **Summary** | `text_mm0qkysj` | *(doc column — do NOT set during create_item; populated separately in the doc-attach step below)* |

### 📋 Instructions

1. Use the `create_item` monday.com tool with `boardId: 18400716557`.
2. Set the item **Name** using the format: `[Interviewee Name] — [Interview Category] — [YYYY-MM-DD]`
3. Populate all columns listed above using the data extracted throughout this summary. **Do not include `text_mm0qkysj` in the `create_item` call** — it is a doc column and will be populated in the next step.
4. For status columns (`Interview Category`, `Time in monday`, `Experience`), use the exact label text as shown in the mapping table.
5. After creating the item, note the returned item ID — you need it for the doc-attach step and the subitems step.

### 📎 Attaching the Summary Doc to the Item

After the item is created, attach the full interview summary as a doc directly into the **Summary** column (`text_mm0qkysj`) of the item. This makes the full document accessible directly from the board row.

Use the `create_doc` monday.com tool with:
- `location`: `"item"`
- `item_id`: the ID of the item just created
- `column_id`: `"text_mm0qkysj"`
- `doc_name`: `[Interviewee Name] — [Interview Category] — [YYYY-MM-DD]` (same name as the workspace doc from Step 6)
- `markdown`: the full summary output — everything from Step 1 through Step 5, formatted in markdown exactly as presented to the user (identical content to the Step 6 workspace doc). **The Step 1 metadata header must include the `Product Phase` field.**

> 💡 **Why two docs?** The workspace doc (Step 6) lives in the shared folder for cross-interview browsing. The item-attached doc (this step) makes the summary accessible directly from the board row without navigating away.

After attaching the doc, confirm success and share both links with the user: the workspace doc URL from Step 6 and the board item URL.

> 💡 **Tip:** If the interview date is unknown, leave `date4` blank. If experience or tenure is ambiguous, choose the closest matching label.

## Step 8 — Create Subitems for Follow-Up Actions

After the board item is created, create subitems under it using the `create_item` monday.com tool with `parentItemId` set to the ID of the interview item created in Step 7. Use `boardId: 18400716557` for all subitem creation calls.

---

### 🔁 Follow-Up Questions — One subitem, all questions as an update

Create a **single subitem** named exactly `"Follow up questions"`.

Then, using the `create_update` tool, post a single update on that subitem listing **all follow-up questions** from Step 5, formatted as a numbered list. Include the "Why ask" rationale for each question in the update body.

Example update body:
```
1. Walk me through your last incident where you manually compared feature flags — step by step.
   Why ask: To map the exact workflow Investigation Copilot needs to replace.

2. What would make you trust a PagerDuty-triggered summary enough not to also manually check?
   Why ask: Identifies the confidence threshold for proactive alert adoption.

...
```

---

### 👥 Suggested Next Interviews — One subitem, all suggestions as an update

Create a **single subitem** named exactly `"Suggested interviews"`.

Then, using the `create_update` tool, post a single update on that subitem listing **all suggested interview profiles** from Step 5, formatted as a numbered list. Include the rationale for each suggestion in the update body.

Example update body:
```
1. Junior/mid developer, cross-functional squad, <1 year at monday.com
   Rationale: Validate whether trust and first-choice adoption patterns differ for less experienced developers.

2. Staff/senior engineer, primary on-call on a large platform team
   Rationale: Test whether feature flag change log and noisy neighbor detection would shift their workflow.

...
```

---

### ✅ Action Items — One subitem per action item

For each action item from Step 5, create a **separate subitem**:
- **Name**: `[Action] [What needs to happen]` — prefix with `[Action]` so it's visually distinct on the board

Example subitem name:
> `"[Action] Add feature flag change log to Investigation Copilot"`

No update needed on action item subitems — the name is sufficient.

---

### 📋 Subitem Creation Instructions

1. Create subitems in order: "Follow up questions" first, then "Suggested interviews", then one subitem per action item.
2. Each `create_item` call should only set the `name` field — subitem column values are not required.
3. After creating the "Follow up questions" and "Suggested interviews" subitems, immediately post their respective updates using `create_update` with the subitem ID.
4. After all subitems and updates are created, confirm the count to the user (e.g., "Created 9 subitems: 1 follow-up questions summary, 1 suggested interviews summary, 7 action items").

---

## Example Output Structure

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INTERVIEW SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interviewee Name:     Yael Cohen
Interviewee Team:     Platform Engineering
Time at monday.com:   3 years
Developer Experience: Staff Engineer
Interview Category:   Scorecards
Interview Date:       2026-01-15
Interviewed By:       Rivka Shapiro
Product Phase:        Beta

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEADERSHIP SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 Winning Picture
Developers know exactly what "good" looks like before they open a PR, because 
Scorecards surface standards inline — not as post-merge noise.

🔍 Top 3 Insights
1. **Scorecard visibility is broken at the point of coding** — Devs only see 
   scorecard failures after merge. Raised by 5/6 interviewees as a daily 
   frustration. *KPI Impact: Velocity*

2. **Standards feel arbitrary without context** — 4 of 6 couldn't explain why 
   a failing scorecard rule existed. Erodes trust and leads to rule suppression.
   *KPI Impact: Excellence*

3. **Manual remediation is absorbing ~30 min/week per dev** — AI could own 
   this. *KPI Impact: Efficiency*

⚡ The Ask
We recommend a **Bet** on pre-merge Scorecard surfacing because 5/6 interviews 
confirm it as a top-3 friction point with a direct cycle time connection.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DETAILED FINDINGS
...
```
