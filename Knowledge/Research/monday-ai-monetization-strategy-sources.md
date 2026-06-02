# AI monetization strategy — source artifacts (MCP pull)

**Pulled:** 2026-04-19 via `user-google-workspace` (`slides_getText`) and `user-Figma` (`get_metadata`, `get_screenshot`).  
`get_design_context` on node `26815:11134` returned a selection error; metadata + screenshot succeeded.

---

## Google Slides

**Title:** AI monetization — Strategy sync (deck title text: “AI moneteziation - existing startegy”).

**Source:** [Presentation `1oMeCsI34arACAes17hRkyTPxHHPbZhpmbn0CR4A_cBk`](https://docs.google.com/presentation/d/1oMeCsI34arACAes17hRkyTPxHHPbZhpmbn0CR4A_cBk/edit)

### New users (direction)

- **Monday 14d trial** — Unlimited credits (as today).
- **1st purchase** — AI credits **included in monday plan**.
- **Remove** AI credits trial (**one-time grant**).
- **Basic tier** — All AI capabilities available (**experimentation tier**).

### Trial strategy — problems to solve (current trial)

- No **time limit** → want time limit to drive experimentation.
- **One feature can consume all** trial credits; **same pool** for everything → want **per-feature** trial logic (granularity, time-to-value, frequency differ by feature).
- Different **maturity** per feature → control **trial timing per feature**.

### Existing users — bridge tactics (deck)

- Users who **exhausted** free credits → **grant X amount** (short-term).
- Users who still have free credits → **limit use by time**; communicate that the credit trial will be available again in **X days**.
- **Move all** to **trial per feature** strategy.

### Incentivize existing → new model (deck)

- **Incentivize customers to purchase the new model instead of the add-on.**
- Listed lever: **Set a time limit on the current one-time grant** (slides repeat this as item “1”; items 2–4 are placeholders in the extracted text).

### Feature × trial model (table from deck)

| Feature | Trial model / freemium | Trial details | Granularity |
|--------|-------------------------|---------------|-------------|
| Sidekick | Freemium, daily free credits | Pro and below: **50** credits/user/day; Ent: **1300** credits/user/day | User-level |
| Custom agents | Time-based + limited grant | TBD | Paying for AI add-on → **Account**; not paying → **User** |
| AI notetaker | Time-based + limited grant | 25 hours = X credits | Same add-on split |
| AI Blocks | Time-based + limited grant | TBD | Same add-on split |
| Vibe | Trial on Publish | TBD on credits trial (maybe Sidekick method) | TBD |

### Roadmap slide (deck)

- **New:** Pricing page, Monday trial.
- **Existing (post May 6):** Trial tests (paid/free, time limit), pricing page, **admin usage pages**, future tests.

---

## Figma — Pricing page with AI

**File:** [Pricing page with AI](https://www.figma.com/design/DIyM0lkmlwnzMkTI0AZKs8/Pricing-page-with-AI?node-id=26815-11134&m=dev)  
**File key:** `DIyM0lkmlwnzMkTI0AZKs8`  
**Node pulled:** `26815:11134` (canvas)

**Canvas name (from metadata):** `👾 Dev ready -> 6.5.26` — treat as the design target date for this page (confirm vs product calendar; user conversation also referenced **May 6** for net-new plan availability).

**Structure (high level):** Large “Pricing page” section with multiple artboards: in-platform pricing (light/dark), states such as “Default / 1st tab (all plans)”, “with credits / (above minimum)”, “Full scroll”, checkout light/dark, `.com` marketing variants, “Mini pricing” WIP. Plan columns include **Basic** with copy such as “Essential tools to get your team started with AI-powered productivity.”

**Screenshot:** Captured via `get_screenshot` for node `26815:11134` (full board); use Figma file for pixels. Design intent: **credits visible on/in plan cards** and comparison-heavy layouts (in-app, checkout, .com).

---

## Reconciliation notes

- **Dates:** Deck Figma canvas label **6.5.26** vs stakeholder **May 6** net-new rule — keep both in planning until one official schedule doc owns it.
- **Numbers:** Sidekick **50 / 1300** daily credits in the deck may differ from in-repo Sidekick PRD drafts — align engineering and pricing with the **shipping** source of truth before external comms.
