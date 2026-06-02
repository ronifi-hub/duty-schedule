# Claude Design prompt — two populations vision + rollout

Copy everything below the line into Claude Design.

---

**Role:** You are designing a short stakeholder presentation (monday.com internal: product + GTM). Visual style: clean, confident, minimal text on slides, strong diagrams. Use monday-like clarity (not startup hype).

**Context — what we already showed**  
Last week we presented this deck (continuity / don’t contradict without calling it out):  
https://docs.google.com/presentation/d/1jOfnWygOBi9z09T3H5TXPBmKnOd4J0D4fEka28Lzcoo/edit?slide=id.g3dc0d530d15_7_1#slide=id.g3dc0d530d15_7_1  

**Feedback to address (paste verbatim from Slack after this line)**  
Thread: https://monday.slack.com/archives/C0B24MNAE9F/p1777997304741079  

[PASTE FEEDBACK HERE]

**Goal of this deck**  
1. Reframe or extend the story with a clear **vision**.  
2. Show **two distinct user journeys** for **existing customers** (two populations).  
3. Close with a **rollout plan** for **population (b)** only.

---

### Slide 1 — Title  
- Working title suggestion: **“Existing users: two paths on the AI platform”** (or tighter if you prefer).  
- Subline: vision + what changed since last week (1 line, optional).

### Slide 2 — Vision (1 slide)  
- **One platform story** for existing accounts: discover → try → clear commercial path (voluntary migration framing; no forced cutover language unless product mandates it).  
- Call out **why two populations**: different **state** (blocked vs not blocked) → different **UX** and **comms**.  
- Optional: one line on **success** (e.g. reduce hard-stop frustration for heavy users; increase discovery/activation for everyone else).

### Slide 3 — Population (a): Existing users who **consumed AI credits and got blocked**  
- **User journey** as a horizontal flow: trigger → blocked state → what they see → primary CTA → outcome.  
- **Visual source of truth:** Reproduce or closely follow the journey / frames in this Figma file (Agents monetization):  
  https://www.figma.com/design/dV1oD5cFArzDy1b5xwZs0W/Agents-monetization?node-id=2162-20419  
- Label the slide: **Population (a)** — blocked / exhausted credits (use exact product language if known: e.g. “credit exhaustion,” “hard stop”).  
- Keep copy short; let the diagram carry the story.

### Slide 4 — Population (b): Existing users who **did not get blocked**  
- **User journey** focused on **promotion / discovery** (not recovery from block).  
- **Visual source of truth:** Promotion pop-up and related UI from this Figma file (AI Credits):  
  https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=932-32222  
- Contrast in one line vs (a): same “existing” segment, different **moment** and **message**.

### Slide 5 — Rollout plan: Population (b) only  
- **Audience for this rollout:** **Admins** (state explicitly on slide).  
- **Scope:** **Only companies with fewer than 15 seats** — **no-touch** motion (self-serve / in-product; no sales-led step).  
- Show as simple **phased rollout** or table:  
  - **Who** (segment definition: existing, not blocked, <15 seats, admins).  
  - **What** (surfaces: e.g. in-app promo, email if applicable — mark TBD if unknown).  
  - **When** (phases or “wave 1 / wave 2” — use TBD if dates not fixed).  
  - **Guardrails** (e.g. legal/finance approval, feature flags, metrics to watch).  
- Do **not** mix population (a) rollout on this slide unless one line says “(a) separate track.”

### Slide 6 (optional) — Open questions / next decisions  
- Bullet list tied to **Slack feedback** pasted above + any **TBD** from Figma (copy, eligibility, caps).

**Constraints**  
- Align narrative with last week’s deck; if something **changes** vs last week, add a small “Update” callout on vision slide.  
- Use **two populations** language consistently: **(a) blocked**, **(b) not blocked + promo**.  
- Figma links are **references**; if you cannot import Figma, describe layouts precisely enough for a designer to match.

**Deliverable**  
- Slide-by-slide layout description **or** direct build in Claude Design with suggested headlines, 3–5 bullets max per slide, and notes for visuals.

---

## Google Slides — paste copy (P&P deck)

**Deck:** [P&P updates — May 2026](https://docs.google.com/presentation/d/1jOfnWygOBi9z09T3H5TXPBmKnOd4J0D4fEka28Lzcoo/edit)  
Cursor’s Google connection is **read-only** for Slides. To **push** updates: open the deck → **Extensions → Apps Script** → paste [`presentations/google-slides-push-two-populations-pp-may2026.gs`](presentations/google-slides-push-two-populations-pp-may2026.gs) → run `runAllTwoPopulationsUpdates`.  
Or **paste manually** using the tables below.

### A) Replace the slide you linked (`g39ab25fd5f1_0_0`)

[Open that slide](https://docs.google.com/presentation/d/1jOfnWygOBi9z09T3H5TXPBmKnOd4J0D4fEka28Lzcoo/edit?slide=id.g39ab25fd5f1_0_0#slide=id.g39ab25fd5f1_0_0)

| Text box (typical layout) | Paste this |
|---------------------------|------------|
| **Title / headline** | **Population (a): Credit exhaustion → paywall** |
| **Subline / main message** | **Add-on paywall → purchase flow → “no-brainer” switch to the new model** |
| **Optional third line** (smaller) | *Who:* existing accounts that **used their AI credits and hit a stop**. *Design ref:* Agents monetization journey (Figma). |

**Speaker notes (optional):** Journey frames: [Agents monetization — Figma](https://www.figma.com/design/dV1oD5cFArzDy1b5xwZs0W/Agents-monetization?node-id=2162-20419). Keep aligned with no-touch &lt;15 seats story elsewhere in this deck.

---

### B) Insert 4 new slides after that slide (or after “Questions?”)

Use your house template. Copy:

**1 — Vision**

- **Title:** Existing users: two paths on the AI platform  
- **Bullets:**  
  - One story: **discover** what’s new → **try** the platform → **choose** packaged AI when ready (**voluntary** migration).  
  - **Two populations** by **state**: **blocked** (credits exhausted) vs **still has credits** → different **UX** and **comms**, same north star.  
  - **Success:** fewer dead ends; clearer next step; stronger activation on the new model.

**2 — Population (a): blocked journey**

- **Title:** Journey — **blocked** (credits exhausted)  
- **Bullets:**  
  - **Trigger:** user hits **credit limit** / paywall on the legacy add-on path.  
  - **Experience:** paywall → purchase → foreground **switch to new model** as the smart default where we show it.  
  - **Visual:** match **Agents monetization** journey in Figma (screens on canvas).  

**Speaker notes:** https://www.figma.com/design/dV1oD5cFArzDy1b5xwZs0W/Agents-monetization?node-id=2162-20419

**3 — Population (b): promo journey**

- **Title:** Journey — **not blocked** (promo / discovery)  
- **Bullets:**  
  - **Trigger:** account **still has credits**; no hard stop.  
  - **Experience:** in-product **promotion** — balance visible, what’s new, CTA into the platform.  
  - **Visual:** **AI Credits** promo pop-up in Figma.  

**Speaker notes:** https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=932-32222

**4 — Rollout — population (b) only**

- **Title:** Rollout — promo for **population (b)**  
- **Bullets:**  
  - **Who:** **Admins** in **existing** accounts, **&lt;15 seats**, **no-touch**; users **not** in the blocked / paywall-first journey.  
  - **What:** in-product promo (Figma); email / lifecycle **TBD**.  
  - **When:** phased rollout **TBD** (e.g. wave 1 → wave 2); flag + measure before broadening.  
  - **Guardrails:** Legal / Finance on copy and eligibility; **(a) paywall / exhaustion** stays on **separate** track.  

---

### C) Duplicate slides in this deck

The export shows the same “Voluntary switch recap / New AI platform” block and “Add-on paywall” idea on **multiple** slides. After you like the new wording, **sync** the same **Population (a)** headline + subline to those duplicates so the story stays consistent.
