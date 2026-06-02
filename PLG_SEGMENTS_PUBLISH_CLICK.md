# PLG segments to improve “Clicked publish”

Use this as a checklist to find more opportunities to improve the **Preview rendered → Clicked publish** step. Framed with Product-Led Growth (activation, aha moment, time-to-value, habit).

---

## What you already have

| Segment type | Where | PLG use |
|-------------|--------|--------|
| **Entry point** | `vibe_funnel_admins.html` | Where users enter (Board, Landing, Web, Icon, Add view, Left pane) → optimize by surface. |
| **Prompts before first publish** | `vibe_funnel_admins_prompt_effect.html` | Aha strength by “investment” (1 vs 2–3 vs 4+ prompts) → nudge more prompts or faster confidence at 1. |

---

## New segments (PLG methodology)

### 1. **Time to aha (speed of activation)**

**Idea:** Users who publish in the **same session** vs **later** may have different drivers. PLG: shorten time-to-value.

| Segment | Definition | Why it helps |
|--------|------------|--------------|
| Same-session publish | First “see vibe” and first “click publish” in same session (e.g. same day/session_id) | Fast activators; benchmark for “instant aha”. |
| Next-session publish | First publish in a later session | Delayed aha; good for messaging/reminders or reducing friction next visit. |
| Time-to-publish buckets | 0–5 min, 5–15 min, 15–60 min, 1–24 h, 24h+ from first preview | Find the “sweet spot” and where drop-off happens. |

**Implementation:** Join events by `user_id` + `session_id` / `event_time`; flag first see vibe, first preview, first publish; compute time deltas and session boundaries.

---

### 2. **Entry point × prompts (cross-segment)**

**Idea:** Combine **where** they came from with **how many prompts** before first publish. PLG: different entry points may need different activation tactics.

| Segment | Definition | Why it helps |
|--------|------------|--------------|
| Entry point × prompt bucket | e.g. “Board view + 1 prompt”, “Landing page + 4+ prompts” | Best/worst CVR by (entry, prompt count); tailor flows (e.g. Board: encourage 2nd prompt; Landing: reduce friction to first publish). |

**Implementation:** Reuse `account_level_vibe_funnel_admins_by_entry_point.sql` logic; add prompt-count bucket (1, 2, 3, 4+) per user before first publish; aggregate publish rate by (entry_point, prompt_bucket).

---

### 3. **Preview experience (quality / iteration)**

**Idea:** Publish rate may depend on **outcome of preview** (success vs error) and **iteration** (retries/regenerations). PLG: improve “first preview good enough to publish”.

| Segment | Definition | Why it helps |
|--------|------------|--------------|
| Preview outcome | Preview rendered with “success” vs “error”/timeout (if events exist) | Compare publish rate when first preview succeeds vs fails. |
| Previews before first publish | Count of “preview rendered” before first “click publish” (like prompt count but preview-level) | Same story as prompts: 1 preview vs 2+ before publish. |
| Regenerations before publish | Count of “prompt sent” after first “preview rendered” before first publish | Users who iterate (edit prompt again) vs one-shot; publish rate by iteration. |

**Implementation:** Event stream: `vibe_preview_rendered` (with success/error if available), `vibe_prompt_sent`, `vibe_publish_clicked`; count per user until first publish.

---

### 4. **Context: first-time vs return Vibe user**

**Idea:** First-time vs repeat Vibe users behave differently. PLG: separate new-user activation from re-activation.

| Segment | Definition | Why it helps |
|--------|------------|--------------|
| First-time Vibe (this period) | First time ever “see vibe” in last 30/90 days | Pure activation cohort. |
| Return Vibe user | Had “see vibe” before the current period | Publish rate of “already saw vibe” users; habit/retention. |

**Implementation:** For a chosen window (e.g. last 30 days), compute “first ever see vibe” date per user; segment by first_see_in_window vs returning.

---

### 5. **Board / surface context**

**Idea:** Publish rate may differ by **where** they use Vibe (new board vs existing, board size, etc.). PLG: prioritize high-intent contexts.

| Segment | Definition | Why it helps |
|--------|------------|--------------|
| New vs existing board | First Vibe use on board created in last 7 days vs older | New boards may be “setup” intent → higher or lower publish. |
| Entry point + device/surface | Entry point × web vs desktop (if available) | Optimize by platform. |

**Implementation:** If you have `board_id` and `board_created_at` (or similar), join to events and flag new vs existing. Device from event properties or user-agent if stored.

---

### 6. **Cohort (when they started)**

**Idea:** Publish rate by **when** they first saw Vibe. PLG: measure impact of product/UX changes over time.

| Segment | Definition | Why it helps |
|--------|------------|--------------|
| First-see cohort (week/month) | Week or month of first “see vibe” | Trend in “see vibe → publish” CVR by cohort; validate experiments. |

**Implementation:** `MIN(event_date)` per user for “see vibe”; group by week/month; compute publish rate per cohort.

---

### 7. **Stickiness (repeat publish)**

**Idea:** Users who **publish more than once** are in “habit” stage. PLG: understand path from first publish to repeat.

| Segment | Definition | Why it helps |
|--------|------------|--------------|
| First publish only (in window) | Exactly 1 publish in last 30 days | One-time activators. |
| Repeat publisher | 2+ publishes in last 30 days | Habit; compare to first-publish-only on earlier steps (prompts, entry, time). |

**Implementation:** Count `vibe_publish_clicked` per user in window; segment 1 vs 2+; optionally cross with “prompts before first publish” to see if more prompts predict repeat.

---

### 8. **Onboarding / feature exposure (if available)**

**Idea:** Did they see a tip, tour, or suggestion? PLG: correlate in-product guidance with publish rate.

| Segment | Definition | Why it helps |
|--------|------------|--------------|
| Saw tooltip / CTA for Vibe | Event or property “saw_vibe_tooltip” / “saw_vibe_cta” | Compare publish rate with vs without. |
| Used suggested prompts vs freeform only | Used suggested prompt (if event or prompt_type exists) vs only custom | Suggests whether suggestions help or if power users need freeform. |

**Implementation:** If such events or properties exist in BigBrain, segment by them and compute publish rate.

---

## How to use this (priority order)

1. **Quick wins (data you likely have)**  
   - **Entry × prompts** (cross existing entry + prompt buckets).  
   - **Time to publish** (same session vs next session; then buckets).  
   - **First-see cohort** (by week) to track CVR over time.

2. **Behavior depth**  
   - **Previews before first publish** and **regenerations before publish** (if events support it).  
   - **Preview outcome** (success vs error) if available.

3. **Context & retention**  
   - **First-time vs return Vibe user.**  
   - **Repeat publisher** (1 vs 2+ publishes).

4. **Optional**  
   - Board age (new vs existing), device/surface, onboarding/tooltip segments when data exists.

---

## Suggested next dashboard(s)

- **Single view:** “Publish click by segment” dashboard with:
  - Entry point × prompt bucket (matrix or small multiples).
  - Time-to-publish (same session vs next session; or 0–5 / 5–15 / 15–60 min).
  - Cohort trend: CVR (see vibe → publish) by first-see week.

- **Queries to add** (BigBrain):
  - `publish_click_by_entry_and_prompt_bucket.sql`
  - `publish_click_by_time_to_publish.sql`
  - `publish_click_by_first_see_cohort.sql`

If you tell me which segment you want to implement first (e.g. “entry × prompts” or “time to publish”), I can sketch the SQL and chart structure to plug into your existing HTML.

---

## Leading indicators for Click Publish

**Leading indicator** = a behavior or attribute that happens *before* publish and is associated with higher (or lower) publish rate. Use them to: (1) predict who is likely to publish, (2) find "high intent, not yet published" users, (3) prioritize what to improve (prompt quality, preview UX, entry surface, etc.).

### Behavioral leading indicators (things users do before publish)

| Leading indicator | Definition | How to use it |
|-------------------|------------|---------------|
| **Prompt count before first publish** | 1 vs 2 vs 3 vs 4+ (you have this) | More prompts → higher publish rate; leading signal = "invested" users. Nudge 2nd prompt or improve 1-prompt confidence. |
| **Previews seen before first publish** | Count of "preview rendered" before first "click publish" | Like prompt count; 1 preview vs 2+ as predictor. |
| **Regenerations before publish** | "Prompt sent" after first "preview rendered" (edit & retry) | Iteration = intent; compare publish rate of "regenerated" vs "one-shot". |
| **Time from first preview to publish** | &lt;1 min, 1–5 min, 5–15 min, 15+ min | Fast deciders vs deliberators; find drop-off bucket. |
| **Same-session vs next-session publish** | First publish in same session as first "see vibe" vs later | Same-session = strong leading signal; next-session = re-engagement lever. |
| **Time from "see vibe" to first "prompt sent"** | Fast (&lt;30s) vs slow (30s+) | Quick starters may be more intent-heavy; slow may need better prompts/guidance. |
| **Used suggested prompt (first prompt)** | First prompt was from suggestions vs freeform (if event exists) | Leading signal for "guided" path vs "explorer"; compare publish rate. |

### Context leading indicators (where / when / who)

| Leading indicator | Definition | How to use it |
|-------------------|------------|---------------|
| **Entry point** | Board view, Landing, Web, Icon, Add view, Left pane (you have this) | Which entry predicts highest publish rate → double down; lowest → fix friction or messaging. |
| **Entry × prompt bucket** | Entry point + 1 vs 2–3 vs 4+ prompts | Strongest predictor combo; tailor flow by (entry, prompt count). |
| **First-time vs return Vibe user** | First "see vibe" in window vs had seen before | Leading signal for activation (new) vs re-engagement (return); different tactics. |
| **New vs existing board** | Board created in last 7 days vs older (if data exists) | Setup intent vs iteration; publish rate by context. |
| **First-see cohort (week)** | Week of first "see vibe" | Leading indicator of product/UX changes; CVR trend by cohort. |
| **Device / surface** | Web vs desktop (if available) | Where publish rate is higher → optimize that surface. |

### Quality / outcome leading indicators (did the experience "work"?)

| Leading indicator | Definition | How to use it |
|-------------------|------------|---------------|
| **First preview success vs error** | Preview rendered with success vs error/timeout (if events exist) | Success = strong leading indicator; fix errors to lift publish. |
| **Preview load time** | Fast (&lt;3s) vs slow (3s+) if logged | Slow load may reduce publish rate; optimize or set expectations. |
| **No regenerate after preview** | Exactly 1 "preview rendered" before first publish vs 2+ | One-shot success as leading indicator; improve first-preview relevance. |

### How to analyze leading indicators

1. **Lift vs baseline**  
   For each segment, compute:  
   `Publish rate in segment` vs `Overall publish rate (e.g. see vibe → publish)`.  
   Leading indicators with **positive lift** = segments to amplify or make easier.

2. **Volume × lift**  
   Prioritize segments that have both meaningful volume and high lift (e.g. "Board view + 2–3 prompts" with high CVR and many users).

3. **"Not yet published" pool**  
   Among users who saw preview but didn't publish yet, tag them by leading indicators (e.g. "2+ prompts, same session, from Board view"). Target high-indicator users with reminders or in-app nudges.

4. **Leading indicator dashboard**  
   One view: rows = segment (entry, prompt bucket, time-to-publish, etc.), columns = [Users with preview, Publish clicked, Publish rate %, Lift vs baseline]. Sort by lift or volume to see strongest leading indicators.
