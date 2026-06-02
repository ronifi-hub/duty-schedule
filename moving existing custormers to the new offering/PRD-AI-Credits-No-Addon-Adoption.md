# PRD: AI Credits Plan Adoption — Accounts Without Add-ons

## 🎯 Problem

Existing monday.com accounts on paid plans with no AI add-on are not adopting the new credits-included offering, leaving a large eligible population without AI capabilities they could activate at no additional cost for 12 months.

## 📊 Opportunity

## 💡 Hypothesis

If we surface a limited-time in-product promotion to accounts without AI add-ons, plan upgrade rate will exceed baseline, and the credits-led message (Vb) will outperform the discount-led message (Va).

## 👥 Target users

- **Primary:** Account admins on paid monday.com plans with no active AI add-on, eligible for the credits-included plan.
- **Not in scope:** Accounts already on the credits plan, accounts with an active AI add-on, free/trial accounts, enterprise/custom-pricing accounts.

## ✅ Acceptance criteria

- **__Eligibility gate:__** offer is shown only to admins of eligible paid plans with no active AI add-on.
- **__Variant A (Va) — Discount-led:__** modal shows "Add AI to your plan for" with strikethrough $30 → **$0/mo**, "free for 12 months", and "3,000 AI credits/mo • 3 published Vibe apps" as supporting detail.
- **__Variant B (Vb) — Value-led:__** modal shows "Update your plan to include AI / You'll receive:" with two side-by-side cards — **3,000 AI credits/mo** (AI icon) and **3 published Vibe apps** (Vibe icon) — followed by "free for 12 months".
- **__Shared modal elements:__** both variants include the "Limited-time offer" badge, "Use your AI credits for:" product chips (monday agents, Vibe app builder, Sidekick AI assistant, monday notetaker, AI workflows), and an "Update plan" primary CTA.
- **__One-click upgrade:__** admin can activate the plan update without contacting sales.
- **__Transaction integrity:__** if activation fails, account stays on current plan with no partial state.
- **__Dismissal:__** dismissed state is persisted; offer is not re-shown within a defined cooldown period.
- **__Dark mode:__** both variants render correctly in dark mode.

**Out of scope for v1:** non-admin flows, email campaign, annual billing migration, multi-touch nurture, revert/downgrade path post-activation.

## 📋 Requirements

### Admin

- **__Eligibility check:__** only admins on eligible paid plans with no active AI add-on see the offer. *(Must for 1st release)*
- **__In-product modal:__** shown at a contextually relevant trigger point (AI feature entry or plan management page); displays the assigned variant correctly. *(Must for 1st release)*
- **__Va — Discount hero:__** "Add AI to your plan for" + strikethrough $30 + $0/mo large text + "free for 12 months" + "3,000 AI credits/mo • 3 published Vibe apps". *(Must for 1st release)*
- **__Vb — Credits/value hero:__** "Update your plan to include AI / You'll receive:" + two feature cards (3,000 AI credits/mo with AI icon; 3 published Vibe apps with Vibe icon) + "free for 12 months". *(Must for 1st release)*
- **__Shared modal:__** "Limited-time offer" badge, product usage chips, "Update plan" CTA present in both variants. *(Must for 1st release)*
- **__Upgrade flow:__** single CTA activates plan update; no sales contact required. *(Must for 1st release)*
- **__Confirmation:__** post-activation state shown; plan and credits available immediately. *(Must for 1st release)*
- **__Dismissal persistence:__** dismissed offer not re-shown within defined cooldown (duration TBD). *(Must for 1st release)*
- **__Dark mode:__** both variants render correctly in dark mode. *(Must for 1st release)*
- **__Error handling:__** clear error state on activation failure; no ambiguous entitlement. *(Must for 1st release)*
- **__Email campaign:__** outbound email to eligible admins with same offer messaging. *(Not in 1st release)*
- **__Non-admin "ask admin" nudge:__** prompt for non-admins who encounter AI feature gates. *(Not in 1st release)*
- **__Multi-touch nurture:__** follow-up sequence for non-converters. *(Not in 1st release)*

## 🛠️ Solution

**Product areas:** AI feature entry points, plan management page, billing/entitlement service.

| Step | Persona | Behavior (must for 1st release) | Surface |
|------|---------|----------------------------------|---------|
| 1 | Admin | In-product modal appears at AI feature entry point or plan page, showing assigned variant (Va or Vb) | Modal overlay |
| 2 | Admin | Va: sees $0/mo discount hero + credits/Vibe detail. Vb: sees 3,000 AI credits/mo + 3 Vibe apps cards | Modal content |
| 3 | Admin | Clicks "Update plan" CTA → plan updated immediately | Modal CTA → billing |
| 4 | Admin | Confirmation shown; credits and Vibe apps available on account | Confirmation state |

**Figma:**
- [Variant A — Promotion-cc-Va (discount-led)](https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=1747-18431)
- [Variant B — Promotion-cc-Vb (credits/value-led)](https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=1747-18504)
- [Full promotion page](https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=1562-39889&p=f&t=HUdj4Rw1V3GYXkaP-0)

**Design notes**
- "Limited-time offer" badge is present in both variants — do not remove.
- Product chips below the hero are identical across variants; order must be preserved.
- Dark mode versions exist for both Va and Vb (nodes `1819:25186`, `1819:25403`) — implement alongside light mode.
- CTA label is "Update plan" (not "Upgrade" or "Get started") — use exact copy.

## ⚠️ Edge cases

1. Admin activates mid-session on a different device — entitlement must sync immediately; no duplicate activation.
2. Plan price is $0 for 12 months but auto-renews — confirmation screen must make post-trial billing clear before activation.
3. Admin dismisses on Va but would have converted on Vb — dismissed state is per-account, not per-variant; do not re-show the other variant after dismissal.

## ⚙️ Technical considerations

- Eligibility service: check paid plan tier + absence of active AI add-on at render time.
- Entitlement: plan transitions to credits-included; billing line item must not change for the 12-month free period.
- Feature flag required for A/B assignment and rollout control.
- Variant assignment must be sticky per account (admin always sees the same variant on re-open).
- Dark mode detection: use existing system/user preference signal.

## 📈 Data

### A/B test

| | |
|---|---|
| **Hypothesis** | The credits/value-led message (Vb) will drive higher upgrade rate than the discount-led message (Va). |
| **Variants** | Va: discount-led modal ($0/mo hero) · Vb: credits/value-led modal (feature cards hero) |
| **Audience** | Eligible paid accounts with no active AI add-on, split 50/50 |
| **Primary metric** | "Update plan" click-through rate (per eligible account that saw the modal) |
| **Secondary metric** | Credits plan activation rate (completed plan update / eligible accounts shown) |
| **Guardrails** | Plan churn rate; support ticket volume; billing error rate |
| **Decision rule** | Ship winning variant if statistically significant lift vs. the other; iterate on copy/hero if directionally positive but below significance; kill promotion if guardrails spike |

### Gradual release

| Phase | Audience / % | Success criteria to advance |
|-------|----------------|----------------------------|
| 1 | Internal dogfood | No P0 bugs; variant assignment sticky; entitlement transitions correct |
| 2 | 10% of eligible accounts (50/50 Va/Vb) | Funnel stable; support volume normal; no billing errors |
| 3 | 50% | Primary metric directionally positive; PM sign-off |
| 4 | 100% | Winning variant deployed to full eligible population |

## ❓ Open questions

1. What is the exact trigger point for the modal — AI feature entry only, plan management page, or both?
2. What is the dismissal cooldown window (e.g., 7 days, 30 days)?
3. What happens after the 12-month free period — auto-billing at what price, and is that shown in the activation confirmation?
4. Are there account segments within "no add-on" that should be excluded (e.g., below a seat threshold)?
5. What is the minimum sample size / test duration before a winner can be called?
6. Does "3 published Vibe apps" vary by plan tier, or is it fixed across all eligible accounts?

## 🔗 Sources

- [Figma — AI Credits full promotion page](https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=1562-39889&p=f&t=HUdj4Rw1V3GYXkaP-0)
- [Figma — Variant A: Promotion-cc-Va (discount-led, node 1747-18431)](https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=1747-18431)
- [Figma — Variant B: Promotion-cc-Vb (credits/value-led, node 1747-18504)](https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=1747-18504)
