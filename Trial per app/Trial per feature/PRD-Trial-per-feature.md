# PRD: Trial per feature

## 🎯 Problem

Today AI trials are granted at the account level, so a single shared credit pool gets drained by one AI surface (mostly Sidekick) before users ever try newer features like agents, and we cannot measure whether each feature drives value because all usage shares one bucket.

## 📊 Opportunity

## 💡 Hypothesis

If we replace the shared account-level AI trial with a per-feature, non-fungible trial bucket — starting with agents — agent trial start rate and trial → paid AI add-on conversion will exceed TBD%.

## 👥 Target users

- **Phase 1 (Agents):** Users in paid accounts that have already run out of AI credits. Any user (member or admin) can self-start their own per-user agent trial.
- **Admins** in the same accounts get visibility into how the per-feature allowance is being used across the account.

## 📋 Solution

We build one flexible per-feature trial infrastructure that grants, tracks, and expires usage allowances independently per AI feature, then ship Phase 1: a per-user agent trial for accounts that ran out of AI credits.

### Core platform requirements (all AI features)

- **__Non-fungible buckets:__** Each AI feature has its own trial bucket. Consumption in one feature never debits another. *(Must for 1st release)*
- **__Configurable scope:__** Each trial can be granted at the user level or account level. *(Must for 1st release)*
- **__Configurable grant type:__** Daily recurring, one-time, or time-limited. *(Must for 1st release)*
- **__Configurable grant amount:__** Credits or message count per feature. *(Must for 1st release)*
- **__Feature bucket selector:__** Buckets can be created for Sidekick, agents, notetaker, AI columns, doc summary, workflows, automations. *(Must for 1st release)*
- **__Eligibility rules:__** Engine can gate trials by plan, role, workspace, and prior trial history (one-time vs reset). *(Must for 1st release)*
- **__Overage routing:__** When both per-user and account-level allowances exist, per-user is consumed first; overage falls through to account. *(Must for 1st release)*
- **__Per-user draw limit:__** Cap how much a single user can pull from a shared account allowance. *(Must for 1st release)*
- **__Trial lifecycle API:__** Read trial start date, end date, remaining balance per user and per account. *(Must for 1st release)*
- **__BigBrain trial extension:__** Internal tool to extend an active trial without breaking the entitlement state. *(Must for 1st release)*
- **__Admin allowance view:__** Admins see how the per-feature allowance is consumed across the account. *(Must for 1st release)*
- **__Admin permissions config:__** Which admin roles can enable, edit, or monitor allowances. *(Phase II)*

---

### Phase 1 — Agents trial

We give each user in paid accounts that ran out of AI credits a self-served, user-level agent trial: TBD credits for TBD days, one-time per user.

#### Requirements

| Persona | Requirement |
|---------|-------------|
| Member | Sees agent trial offer when account is out of AI credits, on every agent surface. *(Must for 1st release)* |
| Member | Starts trial in one click. Allowance is granted to the user only. *(Must for 1st release)* |
| Member | Sees own remaining agent credits and trial end date in agent surfaces. *(Must for 1st release)* |
| Member | When trial ends or credits hit zero, agent actions are blocked with a clear upgrade CTA. *(Must for 1st release)* |
| Admin | Sees per-user agent trial activity for the account (who started, balance, end date). *(Must for 1st release)* |
| Admin | Receives notification when N users in the account have started an agent trial. *(Must for 1st release)* |

**Figma:** [Agents monetization — trial flow](https://www.figma.com/design/dV1oD5cFArzDy1b5xwZs0W/Agents-monetization?node-id=4447-38317)

**Product areas:** top bar banner, agent activation modal, agent builder, agent activity page, login screen post-trial, email + in-product notifications.

#### Flow

| Step | Persona | What happens | Where |
|------|---------|--------------|-------|
| 1 | Member | Sees top bar banner: account out of AI credits, agent trial available | Global top bar |
| 2 | Member | Sees trial CTA when trying to activate an agent | Activate-agent modal |
| 3 | Member | Sees trial CTA inside agent builder | Agent builder |
| 4 | Member | Sees trial CTA on agent activity page | Agent activity page |
| 5 | Member | Clicks "Start free trial" → trial activates → balance + end date shown | Same surface |
| 6 | Member | Uses agent normally; sees remaining credits and days left | Agent surfaces |
| 7 | Member | Trial ends or balance reaches 0 → agent actions blocked, upgrade CTA shown | Agent surfaces + first login after trial ends |
| 8 | Member | Receives reminder before trial ends | Email + in-product notification |
| 9 | Admin | Sees per-user trial activity in admin view | Admin AI usage view |

**Design notes:**
- Trial activation must feel instant. If backend provisioning is slow, the UI shows optimistic state and falls back gracefully on failure.
- Same offer surfaces and copy across all four agent entry points so the offer is unmissable.

## ⚠️ Edge cases

1. User has already used the agent trial — surfaces show purchase CTA only, not a second trial.
2. Account regains AI credits during active agent trial — per-user agent bucket is consumed first; account credits are not debited until the agent bucket is empty or expired.
3. Trial activation backend call is slow or fails — UI shows optimistic active state; on failure, show clear retry with no entitlement granted.

## ⚙️ Technical considerations

- Entitlement service must support per-feature, non-fungible buckets with independent grant + expiry per bucket.
- Trial eligibility check needs a per-user, per-feature history (so we can enforce one-time).
- Overage routing logic must be deterministic and observable in BigBrain.
- Feature flag the agent trial for gradual release.

## 📈 Data

### Gradual release

| Phase | Audience / % | Success criteria to advance |
|-------|----------------|----------------------------|
| 1 | Internal dogfood | No P0 bugs; entitlement transitions correct across all 4 agent surfaces |
| 2 | TBD% of eligible users (paid accounts out of AI credits) | Trial activation funnel stable; support volume normal |
| 3 | TBD% | Trial → paid conversion directionally ≥ baseline |
| 4 | 100% | PM sign-off after 2 weeks at previous gate |

### Success metrics

| Metric | Current | Target | Guardrail |
|--------|---------|--------|-----------|
| Agent trial start rate (eligible users → trial started) | TBD | TBD | Sidekick DAU not down |
| Agent trial → paid AI add-on conversion | TBD | TBD | Support ticket volume not up |
| Agent value signal — % of trial users running agents on ≥2 days within 7-day lock | TBD | TBD | — |

## ❓ Open questions

1. Agent trial grant amount (credits) and duration (days) — finalize before Phase 2 rollout gate.
2. North-star metric definition — absolute conversion target vs retention-based agent value signal.
3. Gradual release percentages per phase.
4. Per-user trial cap — is one-time per user correct, or should we allow reset on plan change?
5. Optimistic UI behavior — exact fallback when entitlement provisioning fails.
6. Sync with BI: create S2T for this project; remove all monday-owned accounts; pull data from 2026-05-19 onward only.

## 🔗 Sources

- [Existing PRD doc — Trial per feature](https://monday.monday.com/docs/18407378724)
- [Figma — Agents monetization trial flow](https://www.figma.com/design/dV1oD5cFArzDy1b5xwZs0W/Agents-monetization?node-id=4447-38317)
