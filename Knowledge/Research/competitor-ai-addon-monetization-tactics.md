# Competitor research: monetization tactics for AI add-ons (promotions, trials, upgrades)

**Topic:** How major productivity / work platforms use **trials, complimentary usage, promotions, bundling, and upgrade paths** to drive payment for AI—especially **add-on** or **consumption** models—and how some **migrate** buyers from add-on to **included-in-plan** packaging.

**Date:** April 2026  
**Screenshots:**  
- **Acquisition / list price:** [`screenshots/`](competitor-ai-addon-monetization-tactics/screenshots/) (from [`ai-pricing-value-communication/screenshots/`](../ai-pricing-value-communication/screenshots/)).  
- **Existing customers, promos, Help/Learn:** [`screenshots/existing-customer-flows/`](competitor-ai-addon-monetization-tactics/screenshots/existing-customer-flows/) — headless Chrome captures + [`README`](competitor-ai-addon-monetization-tactics/screenshots/existing-customer-flows/README.md) index. *In-IDE browser MCP here is allowlisted to monday/internal only; public pages were captured via local Chrome.*

| File | What it shows (examples to point at in reviews) |
|------|--------------------------------------------------|
| [`notion-pricing-page.png`](competitor-ai-addon-monetization-tactics/screenshots/notion-pricing-page.png) | Separate **“Add Notion AI”** card with **$/member/mo** + **“Try it for free today”**; comparison table row **“Notion AI”** = **Limited trial** on lower tiers → upsell to add-on / higher plan. |
| [`slack-pricing-page.png`](competitor-ai-addon-monetization-tactics/screenshots/slack-pricing-page.png) | **50% off for 3 months** on Pro/Business+; **Basic AI** vs **Advanced AI** / **Slackbot** gated by **Business+** (“BEST VALUE”) — plan-led AI depth, not a separate SKU. |
| [`microsoft-365-copilot-pricing-page.png`](competitor-ai-addon-monetization-tactics/screenshots/microsoft-365-copilot-pricing-page.png) | **Copilot Business** add-on with **strikethrough promo price** + **Buy now** / **Try for free**; **“Already have Microsoft 365?”** path for existing base. |
| [`atlassian-rovo-pricing-page.png`](competitor-ai-addon-monetization-tactics/screenshots/atlassian-rovo-pricing-page.png) | Rovo **plans/trial** framing on Atlassian’s site. |
| [`asana-pricing-page.png`](competitor-ai-addon-monetization-tactics/screenshots/asana-pricing-page.png) | Asana **plan ladder** (capture predates AI Studio detail — use with [official AI Studio](https://asana.com/product/ai/ai-studio) for current add-on story). |
| [`linear-pricing-page.png`](competitor-ai-addon-monetization-tactics/screenshots/linear-pricing-page.png) | Linear pricing / packaging reference. |
| [`monday-pricing-page.png`](competitor-ai-addon-monetization-tactics/screenshots/monday-pricing-page.png) | **monday** pricing snapshot for side-by-side with peers. |

### Important limitation: these screenshots are mostly **acquisition**, not **installed base**

You’re right to call this out. **Public `/pricing` pages** are built for **net-new** buyers: list price, plan columns, “Get started,” and sometimes add-on cards. They **do not** fully answer: *“What happens to customers who already pay today?”*

For **existing customers**, competitors usually publish elsewhere:

| Artifact type | What it typically contains | Examples to mine |
|---------------|----------------------------|------------------|
| **Help Center — “pricing changes” / “what’s changing”** | Effective dates by **billing cadence** (monthly vs annual), **grandfather** rules, **credits** on renewal, “no action required” vs deadline to upgrade | [Notion — Understanding pricing changes (2025)](https://www.notion.com/help/2025-pricing-changes) |
| **Product / company blog — packaging announcements** | Why pricing changed, what’s included now, narrative for **current** subscribers | [Slack — June 2025 pricing and packaging](https://slack.com/blog/news/june-2025-pricing-and-packaging-announcement) |
| **Help — plan / feature availability** | Which tier gets which AI **after** a change; what existing workspaces keep | [Slack — Updates to feature availability and pricing](https://slack.com/help/articles/39264531104275-Updates-to-feature-availability-and-pricing-for-Slack-plans) |
| **Admin / rollout comms** | **Phased** enablement, email to admins, optional org announcement templates | [Atlassian — access & availability](https://support.atlassian.com/rovo/kb/how-to-access-and-check-rovo-availability-on-atlassian-cloud/), [Rovo billing](https://support.atlassian.com/rovo/kb/understand-rovo-billing-and-managing-costs-in-atlassian-cloud/) |
| **Technical licensing docs** | How **add-on** attaches to **existing** subscription (no new SKU for base plan) | [Microsoft Learn — Copilot licensing](https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-licensing) |

**Screenshots worth adding for an *existing-base* deck** (capture manually outside this workspace’s browser allowlist):

- Help article **full page** (dates + grandfather + credits), not the marketing pricing page.
- **Before/after** table from the same article (feature retention by cohort).
- **In-product** upgrade / migration modal (if you can safely screenshot from a test tenant)—often where “existing” actually converts.

---

## Existing customers — concrete competitor patterns (published)

These are closer to your **voluntary migration / May 6 for new logos** problem than `/pricing` alone.

### Notion (add-on → bundle + grandfather + renewal mechanics)

- **Fork:** New Free/Plus buyers can’t buy AI as standalone add-on; AI bundled into **Business/Enterprise** (policy summarized in Help).
- **Existing AI add-on subscribers:** Continuity language in Help — **stay** on add-on terms while subscribed; plus **effective-date** rules by **monthly vs annual** billing.
- **Softening price moves:** For some **annual + AI** subscribers, **credits** on a stated date to offset pricing delta (see [Notion 2025 pricing changes](https://www.notion.com/help/2025-pricing-changes) — verify current wording in-product).

**Tactic class:** *Grandfather* + *calendar* + *renewal credits* — reduces revolt when packaging changes.

### Slack (plan change + AI depth + comms stack)

- **June 2025** packaging announcement ties **plan** changes to **AI** depth (Basic vs Advanced AI, new Enterprise+ tier in announcement).
- **Existing** impact is usually explained in **Help** + blog, not only pricing grid — use for **“what subscribers see”** copy patterns.

**Tactic class:** *Plan-led migration* with **official** post for current customers (not only list price).

### Microsoft 365 Copilot (add-on to **existing** M365)

- **Copilot as add-on license** on top of **existing** qualifying plans — this is explicitly an **installed-base** motion: no need to rip/replace base SKU to try or buy Copilot ([Microsoft Learn — licensing](https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-licensing)).
- Pricing pages still mix **Try/Buy** — pair with Learn docs when you talk **existing admins**.

**Tactic class:** *Attach* AI without forcing base-plan migration first.

### Atlassian Rovo (phased rollout to **existing** Cloud)

- **Rollout to existing orgs** in waves; **email** when available; **no** self-serve early opt-in in some windows — classic **reduce operational risk** pattern.
- Billing docs describe how Rovo shows on **invoice** / consumption over time ([Atlassian Rovo billing KB](https://support.atlassian.com/rovo/kb/understand-rovo-billing-and-managing-costs-in-atlassian-cloud/)).

**Tactic class:** *Phased enablement* + *billing transparency* for existing tenants.

---

## Competitive landscape

| Company | Monetization approach | Strengths | Weaknesses / risks |
|--------|------------------------|-----------|---------------------|
| **Notion** | **Removed** standalone Notion AI add-on for **new** Free/Plus buyers (May 2025); AI **bundled** into Business/Enterprise. **Grandfathered** existing add-on subscribers at legacy pricing; renewal/credit handling for annual customers. | Clear **fork**: new buyers must step up to higher tier for “full” AI; reduces perpetual add-on SKU for new logos. | **Free/Plus** get very limited AI on new policy—verify live Help; **existing-base** story is in [2025 pricing changes](https://www.notion.com/help/2025-pricing-changes), not only `/pricing`. |
| **Asana (AI Studio)** | **Tiered** add-on: “Basic” included on paid plans with **preset monthly credits**; **Plus** (~$135–150/mo) for larger monthly credit pools; **Pro** for very high volume / quarterly pools; **extra credits** purchasable. | Strong **good/better/best** within one AI product; admin-facing **credit** story; upgrade path beyond included. | Complexity; enterprise sales for top tier; users must understand **credits**. |
| **ClickUp** | **Brain** / **Everything AI** as **paid add-on** lines; **complimentary trial** AI usage on all workspaces (limits scale by plan size—uses per workspace, Talk-to-Text words, “AI Super Credits” on trial). **Pay-as-you-go** super credits. | Heavy **trial sampling** before paywall; clear **upgrade** to paid plan + add-on after trial. | Many SKUs (Brain, Everything AI, Notetaker, Talk to Text); potential confusion. |
| **Slack** | AI **tiered by plan** (Basic AI vs Advanced AI on **Business+**); **not** a separate AI SKU in the same way as a credit pack—**plan upsell**. **Promotional** list pricing (e.g. limited-time % off on Pro/Business+ cited on pricing page). | Simple story: **upgrade plan** to unlock AI depth; promos lower friction for trial of paid tier. | Less applicable if monday keeps a **distinct credits add-on**; pattern still useful for **plan-led** migration to new offer. |
| **Atlassian (Rovo)** | **Phased rollout**: Rovo included in **Cloud** tiers (no separate invoice “for now”); usage under AUP with **future consumption** signals. **Rovo Dev** separate **$20/dev/mo** with **included credits** + overage + **30-day trial**. | **Land** with included value, then **meter**; separate SKU for dev use case with explicit trial. | Transition risk when “not invoiced separately” ends; customer expectation management. |
| **Microsoft 365 Copilot** | **Copilot Business** as **add-on** to M365 Business plans; **bundled** SKUs (e.g. Business Premium + Copilot); **limited-time** promotional pricing on bundles (e.g. offers cited through mid-2026 on Microsoft properties). | Familiar **attach** motion; **discount windows** to drive attach rate; bundle SKUs reduce separate SKU decisions. | Heavy enterprise buyer; not PLG-identical to monday SMB. |
| **HubSpot (Breeze / Credits)** | **Included monthly credits** by subscription tier (Starter/Pro/Enterprise); **pay-as-you-go** and **packs** beyond; **spend caps** and controls; features rolled out “through credits” (e.g. Customer Agent). | **Try with included pool** before incremental spend; finance-friendly **caps**; clear **overage** path. | Credit economy can feel opaque; must explain **unit** of credit. |

---

## Patterns (monetization tactics to borrow or avoid)

1. **Add-on → bundle migration (Notion-style)**  
   Stop selling the **old** add-on to **new** buyers; put AI in **higher** plan only; **grandfather** incumbents + use **credits** on renewal to soften annual transitions.

2. **Complimentary trial pool (ClickUp-style)**  
   Workspace-level **complimentary** caps (actions, words, super credits) that **scale** with plan/headcount—drives habit before paywall.

3. **Good / better / best within AI (Asana-style)**  
   **Included** “basic” AI credits on paid base + **named** add-on tiers for heavier use + **top-up** credits.

4. **Plan + promo (Slack / Microsoft-style)**  
   **Limited-time** % off or bundle discount to move users to the **tier** that includes (or pairs with) AI—reduces sticker shock without permanent list-price erosion.

5. **Included credits + PAYG + caps (HubSpot-style)**  
   Everyone gets a **monthly included** allocation; exhaustion triggers **pay-as-you-go** or **packs**; **admin caps** reduce fear—good for **voluntary** migration messaging.

6. **Phased inclusion + future metering (Atlassian-style)**  
   Ship **included** access first, communicate **future** consumption billing—use carefully to avoid backlash.

---

## Key trends

- **Bundling AI into higher plans** is a common **end state** for products that started with add-ons (Notion path).
- **Credits** are the dominant **lingua franca** for multi-feature AI; **included monthly** + **overage** is standard.
- **Trials** are often **usage-bounded** (pool per workspace or per seat), not only time-bounded.
- **Promotions** target **annual** commitment, **bundle** attach, or **time-limited** discount—not always “free AI forever.”
- **Grandfathering** and **renewal credits** are used to **avoid** alienating existing add-on buyers during packaging shifts.

---

## Implications for monday.com (existing → new offering)

| Implication | Why it matters |
|-------------|----------------|
| **Notion-like split** | You already separate **new** (post May 6) from **existing**; competitors show **grandfather** + **renewal handling** as the norm for trust. |
| **ClickUp-like trial pools** | Your **per-feature** / **grant** strategy can mirror “complimentary but bounded” trial—drives **use** before asking for **new plan** purchase. |
| **Asana / HubSpot tiering** | Helps design **incentive** ladders: included AI in new plan vs **legacy + add-on** total cost + **capped** overage story. |
| **Promo discipline** | Time-boxed **bundle** or **migration** promos (Microsoft pattern) support **voluntary** switch without permanent price list chaos. |

**Differentiation opportunity:** A **single ledger** + **non-fungible buckets** (your platform vision) can be **clearer** than competitors with many SKUs—**if** UX and admin tooling explain consumption better than “credits everywhere.”

**Risk if ignored:** Buyers compare you to **Notion/ClickUp** narratives on fairness (“why can’t I keep buying add-on forever?”)—prepare **transparent** comparison and **timeline** for legacy paths.

---

## Recommended next steps

1. **Primary-source pass:** PMM/Legal validate numbers and claims on **official** pricing/help pages linked below (third-party blogs can be wrong on limits and dates).
2. **Screenshot set (split by audience):**  
   - **Acquisition:** pricing grids (already partly in `screenshots/`).  
   - **Existing customers:** Help articles on **pricing changes**, **rollout/billing** for current subscribers, and **Microsoft Learn** licensing pages — these match monday’s **legacy + add-on → new plan** work better than `/pricing` alone. Save as e.g. `notion-help-2025-pricing-changes-full.png`, `slack-help-plan-updates-full.png`, `microsoft-learn-copilot-licensing-full.png`.
3. **Tactic shortlist for monday:** Pick 2–3 **installed-base** patterns (**grandfather + effective dates + renewal credits**, **phased admin rollout**, **add-on attach without base SKU change**) and map to your **four-step** roadmap (enforcement → grant expiry → per-feature trial → purchase flow).

---

## Sources

| Source | URL |
|--------|-----|
| Notion — 2025 pricing changes | https://www.notion.com/help/2025-pricing-changes |
| Notion — pricing | https://www.notion.com/pricing |
| Asana — AI Studio product | https://asana.com/product/ai/ai-studio |
| Asana — pricing | https://asana.com/pricing |
| ClickUp — Brain pricing | https://clickup.com/brain/pricing |
| ClickUp — AI limits (Help) | https://help.clickup.com/hc/en-us/articles/20686299081879-ClickUp-AI-feature-availability-and-limits |
| Slack — pricing | https://slack.com/pricing |
| Slack — feature/pricing updates (help) | https://slack.com/help/articles/39264531104275-Updates-to-feature-availability-and-pricing-for-Slack-plans |
| Atlassian — Rovo pricing | https://www.atlassian.com/software/rovo/pricing |
| Atlassian — Rovo billing / costs | https://support.atlassian.com/rovo/kb/understand-rovo-billing-and-managing-costs-in-atlassian-cloud/ |
| Atlassian — Rovo Dev pricing | https://www.atlassian.com/software/rovo-dev/pricing |
| Microsoft — Copilot pricing | https://www.microsoft.com/en-us/microsoft-365-copilot/pricing |
| Microsoft — Business + Copilot plans | https://www.microsoft.com/en-us/microsoft-365/business/with-copilot-plans-and-pricing |
| HubSpot — AI credits | https://www.hubspot.com/products/artificial-intelligence/credits |

*Third-party blogs and deal sites were used only for search hints; treat official pages as authoritative for numbers and policy.*

---

## Connection to current priorities

- Aligns with **Roni’s GOALS** (market research → actionable packaging insights) and the **voluntary migration** work on **AI-inclusive plans** vs legacy add-ons.
- Use alongside internal artifacts: [`Knowledge/Research/monday-ai-monetization-strategy-sources.md`](monday-ai-monetization-strategy-sources.md), [`Knowledge/Research/existing-users-ai-migration-trial-and-purchase-brainstorm.md`](existing-users-ai-migration-trial-and-purchase-brainstorm.md).
