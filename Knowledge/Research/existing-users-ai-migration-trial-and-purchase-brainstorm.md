# Existing users → new AI offering: trial mechanisms & purchase flows

**Focus slide (4 steps):** (1) Enforcement — hard limit on trial, optimize enforcement flows → (2) Remove one-time grant — time limit on current one-time grant → (3) New trial strategy — trial per feature → (4) New purchase flow — incentivize new model vs add-on.

**Purpose of this doc:** Product discovery brainstorm — tactics, hypotheses, and questions to validate. Not a committed roadmap.

**Scope boundary:** “Enforcement” here is scoped to **trial and grant mechanics** (when AI is free or promotional), not necessarily **mandatory plan migration** for all paid accounts. Align with Legal/PMM on how hard each lever can be for **existing** customers.

---

## 1. North-star behavior you’re trying to produce

| Actor | Behavior |
|-------|----------|
| **Member** | Uses **multiple** AI surfaces over time (not one feature burning everything); reaches **aha** per feature where product allows; understands **what happens when trial/grant ends**. |
| **Admin / buyer** | Sees **clear** total cost and included AI on the **new** plan vs **legacy + add-on**; can approve or purchase without finance surprises. |

**Discovery success:** You can describe a **single coherent story**: limits → time-bound grants → per-feature trials → checkout that prefers bundled plan.

---

## 2. Pillar 1 — Enforcement: “Hard limit on trial, optimize enforcement flows”

**Intent (hypothesis):** Soft limits extend ambiguity; **hard stops** at known boundaries increase **evaluability** and nudge toward a **purchase decision** (trial per feature + new plan), without hiding the cliff.

### Trial mechanism ideas

- **Wall-clock trial:** Global AI trial ends at **T+14d** (or workspace TZ midnight on day N) — no “infinite” eval.
- **Per-surface caps during trial:** Even inside “unlimited” or generous trial, optional **daily or per-feature ceilings** so one surface cannot silently consume the whole story (pairs with pillar 3).
- **Enforcement UX:** Same **hard-stop** patterns everywhere (Sidekick, agents, notetaker): role-specific copy (member vs admin), **one primary CTA** (upgrade / ask admin / switch plan).

### Purchase-flow ideas (early touchpoints)

- **Pre-cliff:** At **50% / 80% / 100%** of trial time or trial grant, in-product **timeline** (“Ends Tuesday”) + **what’s included** on new plans (not generic marketing).
- **At hard stop:** **Compare** paths: “Add-on credits (legacy)” vs “Plans with AI included (recommended)” — only if business still sells add-on to this cohort.

### Discovery questions

- What does “hard limit” mean for **paid** accounts that still have promotional grants — time only, credits only, or both?
- Which enforcement moments create **support tickets** today — can we A/B test copy and entry points before changing limits?

### Signals to instrument

- Time from first AI use → first **hard stop**; drop-off at each enforcement screen; **CTA click** split (add-on vs new plan).

---

## 3. Pillar 2 — Remove one-time grant: “Time limit on the current one-time grant”

**Intent (hypothesis):** Open-ended **one-time** grants defer the purchase decision; a **visible expiry** creates urgency and fairness (“everyone knows the rules”).

### Trial mechanism ideas

- **Grant metadata:** Every one-time grant has **`valid_from` / `valid_until`** (and timezone rule — aligns with [`VISION-Platform-AI-Features-Trial.md`](../Tasks/VISION-Platform-AI-Features-Trial.md) grant types).
- **Messaging:** “Valid through {date}” in balance UI, emails at **7d / 1d**, and in-product banner for admins.
- **Behavior after expiry:** Not silent failure — explicit state: **expired** → next eligible grant (if any) or **purchase / upgrade** paths.

### Purchase-flow ideas

- **Renewal alignment:** If grant expires near **contract renewal**, show **bundled** plan in renewal quote (Sales/self-serve depending on segment).
- **Extension policy (optional):** Only if business allows — **one** extension for migration campaigns (avoid training “wait for mercy”).

### Discovery questions

- How many existing accounts are on **legacy one-time** grants vs recurring? What’s the **median time** from grant start to first meaningful AI use?
- Does expiry **pull forward** purchases or spike **churn/support**? Define **guardrails** before broad rollout.

---

## 4. Pillar 3 — New trial strategy: “Trial per feature”

**Intent (hypothesis):** One pool hides **which** AI capabilities drive value; **per-feature** trials improve **activation**, **fair** evaluation, and **packaging** (each feature has its own time-to-value).

### Trial mechanism ideas (map to buckets in vision doc)

- **Separate clocks or balances** for Sidekick vs agents vs notetaker vs blocks (non-fungible buckets — already in platform vision).
- **Staggered starts:** e.g. Sidekick trial starts on first open; **agents** trial starts when user runs first agent (reduces wasted window).
- **Admin vs user scope:** Some features **account-level** trial (notetaker), some **user-level** (Sidekick) — match deck table; avoid double-punishing users when admin hasn’t enabled connectors.

### Purchase-flow ideas

- **Progressive unlock messaging:** “You’ve completed Sidekick trial — next: agents” with **clear** included limits on new plan.
- **Upgrade prompts** tied to **feature** (“Unlock notetaker under your new plan”) vs generic “buy credits.”

### Discovery questions

- Which features have **longest** time-to-aha? Those need **longer** trial windows or **guided** first success paths.
- Do customers understand **per-feature** limits without feeling “nickel-and-dimed”? Test **copy** and **number of surfaces** shown at once (progressive disclosure).

---

## 5. Pillar 4 — New purchase flow: “Incentivize new model vs add-on”

**Intent (hypothesis):** At purchase, **default** and **math** should favor **plans with included AI**; add-on remains possible for legacy rules but is **visibly** secondary or priced to reflect complexity.

### Purchase-flow ideas

- **Checkout default:** Pre-select **new plan tier** that includes AI; show **effective $/seat** and **included credits** vs legacy + add-on **run rate**.
- **Calculator:** Admin enters seat count + rough AI usage → **recommended tier** + “You save X vs add-on at Y usage.”
- **Promo hooks (time-bound):** Migration credit, waived month, or **extra included pool** if they switch before date **T** (aligns with incentive strategy — Finance approval).

### Trial → purchase handoff

- **Single transition:** When **last** relevant trial bucket ends, **one** consolidated screen: new plan vs add-on (if allowed) with **same** assumptions on usage.

### Discovery questions

- Where do users **actually** buy today (in-product, sales, reseller)? Each channel needs the **same** story.
- What proof reduces **bait-and-switch** fear? (Transparent included credits, link to admin usage page post-May 6 roadmap.)

---

## 6. Cross-cutting discovery methods (next 2–4 weeks)

| Method | What you learn |
|--------|----------------|
| **Admin interviews (8–12)** | Trust, renewal process, “AI as IT spend” vs “shadow AI” |
| **Journey mapping** | Current path from trial → add-on purchase vs plan change |
| **Quant funnel** | By cohort: trial start → multi-feature use → purchase type |
| **Usability** | Enforcement screens + checkout **prototype** (new plan vs add-on) |

---

## 7. Risks to flag early

- **Trust:** “Enforcement” + expiry can feel punitive if **value** wasn’t delivered — pair limits with **onboarding** and **clear** reset rules.
- **Complexity:** Per-feature trials + multiple purchase paths can **confuse** — need **strong** IA and admin summary.
- **Business conflict:** Incentivizing new plan while **add-on** still exists for legacy — define **for how long** and **for whom** to avoid arbitrage.

---

## 8. Links

- Strategy sources (deck + Figma pull): [`monday-ai-monetization-strategy-sources.md`](monday-ai-monetization-strategy-sources.md)
- Platform vision (grants, buckets): [`../Tasks/VISION-Platform-AI-Features-Trial.md`](../Tasks/VISION-Platform-AI-Features-Trial.md)
