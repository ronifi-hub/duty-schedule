# PRD: Sidekick — per-user daily credits + shared account AI pool

**Status:** Draft  
**Product:** Sidekick  
**Author:** Roni  
**monday workdoc:** [docs/18407277103](https://monday.monday.com/docs/18407277103) (also [pulse view](https://monday.monday.com/boards/4565007611/pulses/11674903253?doc_id=18407277103)) — PRD appended via monday API (`doc_id` 40006678).

> **Note:** In-repo copy for diffs / PRs. The workdoc may still contain older notes **above** the appended PRD; delete those in monday if you want a single canonical doc.

---

## 1. Problem

Sidekick is still metered in **messages**, separate from monday’s **account AI credits** used by other AI surfaces. That creates **two coins**, confusing buyers and internal packaging, and blocks a single **account-level** capacity story (“how much AI does my company have?”).

**Evidence / driver:** Strategy alignment to **unify AI consumption** under one credit system; prior Sidekick work used message caps and add-on framing (see legacy Sidekick monetization PRD in repo). *Quantitative baselines (cost per turn, current attach rate) to be filled by monetization / data partners.*

---

## 2. Goals

1. **100%** of paid Sidekick sends on non-trial accounts are debited via **daily grant first**, then **account AI credits** (no separate Sidekick coin) — measurable via ledger events within 2 weeks of launch.
2. **Hard-stop rate** and **support tickets** tied to “confusing limits” do not increase vs. pre-launch baseline (counter: Sidekick DAU / paid accounts).
3. **Trial → paid** transition: Sidekick remains usable after trial without engineering hotfixes (clear entitlement switch in product).

---

## 3. Target users

- **Individual contributors** on **paid** plans who use Sidekick chat / Centerkick / in-context entry points.
- **Enterprise** users who need a higher daily **included** envelope before touching the shared pool.
- **Trial workspaces** evaluating Sidekick without hitting artificial caps (unlimited for trial, per policy below).

**Excluded:** **Free accounts that are not in an active trial** — **no Sidekick access** (no daily grant, no pool draw; see P0).

---

## 4. Requirements

### P0

1. **Trial accounts:** Sidekick is **unlimited** (no per-user daily cap and **no debit** from the account AI credit pool for Sidekick usage) for the duration of trial eligibility as defined by billing/product.
2. **Free (non-trial) accounts:** **No access to Sidekick** — do not expose Sidekick entry points to eligible UI; if user reaches Sidekick via deep link or legacy bookmark, show **blocked** state with **start trial** or **upgrade** path (exact copy and CTAs: monetization + legal). **No** daily grant and **no** consumption from the account AI pool for Sidekick on this cohort.
3. **Paid accounts — daily grant (per user, per calendar day):** **Basic, Standard, Pro:** **5** Sidekick credits per user per day; **Enterprise:** **100** Sidekick credits per user per day. Daily credits **do not roll** to the next day.
4. **Consumption order:** For each Sidekick action that costs credits, **deplete the user’s daily balance first**; when daily is **0**, **debit the account’s shared monthly AI credit pool** (same pool as other monday AI products).
5. **Hard stop:** If daily is **0** and the **account pool has insufficient credits** for the action, **block** the send with a clear, role-appropriate message (no silent failure).
6. **Surfaces:** Same rules on **all Sidekick surfaces** that can trigger billable AI (e.g. chat, Centerkick, left panel — full list owned by Sidekick eng).

### P1

1. **Remaining balance UX:** User can see **remaining daily** Sidekick allowance and **that** further use will draw from **account** credits (wording TBD with legal/comms).
2. **Reset boundary:** Single documented **daily reset** rule (timezone / UTC — see Open questions).

### P2

1. **Edge copy** when pool is low vs. exhausted (upgrade / contact admin) — aligned with global AI monetization messaging.

---

## 5. Data

### 5.1 Events (instrumentation)

| Event | Key properties (minimum) |
|--------|---------------------------|
| `sidekick_credit_debit` | `account_id`, `user_id`, `source` (`daily` \| `account_pool`), `credits`, `plan_tier`, `is_trial`, `surface` |
| `sidekick_daily_reset` | `user_id`, `account_id`, `grant_amount`, `plan_tier` |
| `sidekick_hard_stop` | `user_id`, `account_id`, `reason` (`daily_exhausted_pool_empty` \| `pool_empty`), `surface` |
| `sidekick_access_blocked` | `user_id`, `account_id`, `reason` (`free_no_trial`), `surface` |
| `sidekick_trial_unlimited_send` | `user_id`, `account_id`, `surface` |

### 5.2 Test details

- **Rollout:** Feature flag by segment (e.g. internal → % of paid accounts → GA).
- **Hypothesis:** Unified metering **does not** reduce Sidekick engagement among paying users vs. control; **does** simplify support contacts about “messages vs credits.”
- **Guardrails:** Spike in `sidekick_hard_stop`, drop in Sidekick sessions, anomaly in account pool burn attributed to Sidekick.
- **Decision rule:** Pause rollout if hard-stop rate or pool burn exceeds pre-defined thresholds agreed with monetization.

### 5.3 Success metrics

- **Primary:** % of Sidekick debit volume tagged `account_pool` vs `daily` (expect healthy mix; exact target TBD with finance).
- **Counter:** Account-level **churn** or **downgrade** rate unchanged vs. control.
- **Quality:** Volume of support / CSAT tags mentioning “Sidekick limits” **flat or down** 30 days post-GA.

---

## 6. Out of scope

- **Commercial migration** from legacy Sidekick message SKUs, grandfathering, and add-on sunset — tracked separately.
- **Admin controls** (per-user caps, disable Sidekick, department budgets) — not in this PRD.
- **Variable credit cost per turn** by model complexity (flat **1 unit per billable action** unless eng already has a multiplier — confirm one line in eng sync).
- **Other AI products’ UX** beyond shared pool debit and global hard-stop patterns they already use.

---

## 7. Open questions

| # | Question | Owner |
|---|-----------|--------|
| 1 | **Daily reset clock:** User TZ, account TZ, or UTC? | Eng + Legal |
| 2 | **Enterprise SKU mapping:** Any non-Enterprise plan that should get **100**/day? | Monetization |
| 3 | **Trial definition:** Exact billing states that count as “trial” for unlimited Sidekick. | Billing PM |

---

## 8. Market research (snapshot)

**Alternatives today:** (1) Keep **message-based** Sidekick only — simple but perpetuates **two coins**. (2) **Pool-only** Sidekick — simple story but weak **daily included** value vs. competitors. (3) **Competitors** (below) mix **per-user drip** + **shared** capacity.

### Competitive comparison — Sidekick-like assistant only (Lovable, Notion AI, ClickUp Brain / Ask AI)

| Product | **Free grant** (number + user vs account) | **User-level metering** | **Account-level metering** | **Intersection** (is the user part of account metering?) |
|--------|-------------------------------------------|-------------------------|----------------------------|----------------------------------------------------------|
| **Lovable** (AI chat / Agent) | **5 credits / user / day** (resets midnight **UTC**). **Free plan:** up to **30 credits / calendar month** on the free track — docs **do not** clearly say if **30** is per user or per workspace (**verify in product**). No paid monthly pool on Free. | **Yes.** Daily bonus described as **per user** (“all users receive 5 bonus credits per day”). Each prompt debits that user’s activity; cost can be **fractional** credits per message (e.g. 0.5–2.0 in examples). | **Paid: Yes.** Monthly plan credits and top-ups are **workspace**-scoped (“workspace receives credits from your plan … and top-ups”). | **Paid: Yes.** The same user’s messages can use **personal daily** first, then **shared workspace** monthly/top-up balance. Debit order daily → monthly is **not** spelled out in docs. **Free:** if **30/mo** is workspace-wide, all users **share one cap**. |
| **Notion** (Notion AI — Agent, inline, etc.; not Custom Agents) | **Free & Plus:** **limited complimentary AI responses** — **no number** in [Complimentary AI responses](https://www.notion.com/help/complimentary-ai-responses). **Scope** of pool (user vs workspace) **not stated** there (**verify in product**). | **Yes** in the sense of **who triggers usage:** each **AI action** by a user that returns a response **counts** (per their definition). | **Yes for access:** full Notion AI is **Business & Enterprise** — **workspace** must be on that plan after complimentary responses are exhausted; owners set **workspace-wide** AI settings. | **Typically yes for trial:** if complimentary responses are one **workspace** allowance, **every member’s** actions draw down **one shared pool** until upgrade. **After upgrade:** included at workspace plan level; hard quotas per member vs shared — **not** in complimentary article alone. |
| **ClickUp** (Brain / Ask AI; Free Forever **trial**) | **Brain trial “uses”:** **25 uses / Workspace** if **≤10** people, **50 uses / Workspace** if **>10** ([AI limits](https://help.clickup.com/hc/en-us/articles/20686299081879-ClickUp-AI-feature-availability-and-limits)). **Explicitly workspace-level** grant for that trial bucket. | **Partially.** **Who may use** Brain depends on **role** (e.g. **@Brain** only **members+**; guests excluded). The **meter** on trial is **not** “N per user” — it is a **workspace** cap. | **Yes (trial).** Brain trial uses are **per Workspace**. **Paid Brain** add-on is **per Workspace** for **all members** (cannot buy for a subset only — [AI FAQ](https://help.clickup.com/hc/en-us/articles/13826034537623-ClickUp-AI-pricing-FAQ)). | **Yes.** Every eligible user’s Brain/Ask AI actions **consume the same workspace “uses”** budget (trial) or the **workspace paid Ask AI** entitlement (one pool for those features in public docs). |

**Sources:** [Lovable — Plans and credits](https://docs.lovable.dev/introduction/plans-and-credits) · [Notion — Notion AI FAQs](https://www.notion.com/help/notion-ai-faqs) · [Notion — Complimentary AI responses](https://www.notion.com/help/complimentary-ai-responses) · [ClickUp — AI limits](https://help.clickup.com/hc/en-us/articles/20686299081879-ClickUp-AI-feature-availability-and-limits) · [ClickUp — AI FAQ](https://help.clickup.com/hc/en-us/articles/13826034537623-ClickUp-AI-pricing-FAQ)

**Why now:** Category buyers expect **one AI envelope** per account; hybrid **daily per user + shared pool** matches **Lovable-style** clarity without giving up **enterprise** depth.

**Implications for scope:** This research **supports** daily + shared pool and **hard stop** when empty; it **does not** justify building **ClickUp-style dual currencies** (Brain “uses” vs Super Credits) or **Notion-style** opaque complimentary limits without **published** numbers for monday.
