# Design brief: Figma — Existing users AI migration & incentives

**Purpose:** Spec **screens, states, and patterns** so design can execute in **monday design system** libraries—aligned with product logic in [`PRD-Existing-Users-AI-Platform-Migration-Incentives.md`](PRD-Existing-Users-AI-Platform-Migration-Incentives.md).  
**Pricing reference (marketing/in-app parity):** [Figma — Pricing page with AI](https://www.figma.com/design/DIyM0lkmlwnzMkTI0AZKs8/Pricing-page-with-AI?node-id=26815-11134&m=dev) (`fileKey` `DIyM0lkmlwnzMkTI0AZKs8`, node `26815:11134`).  
**Visual language:** Use **monday DS** components (buttons, banners, modals, tables, badges)—not one-off styling. See workspace [`.cursor/rules/figma-integration.mdc`](../../.cursor/rules/figma-integration.mdc) for HTML-aligned tokens when prototyping.

---

## 1. Flows to design (deliverables)

| Flow | Job | Key screens |
|------|-----|-------------|
| **A — May 6 discovery** | User learns they have credits + what’s new | **Banner** / **sidekick entry** / **AI settings** variant; **empty state** for low use |
| **B — New platform CTA** | Enter **new AI platform mode** | **Primary CTA** consistent label; **first-run** modal (optional) |
| **C — 80% grant cohort** | User notified **top-up** applied | **Toast** + **balance row** + **“why you got this”** inline help |
| **D — Add-on purchase** | User in **AI add-ons** path sees **migration** vs add-on | **Checkout** or **plan comparison** modal; **single** discount module |
| **E — High usage** | Power workspace sees **same** offer | **Admin dashboard** banner or **usage** page **inline** promo |
| **F — Overlap** | User qualifies for D + E | **One** combined module (no duplicate strikethrough prices) |
| **G — Agents (end May)** | **Agents trial** + credits | **Agents** gallery / **trial** ribbon; **credit** balance for agents bucket |
| **H — Post-promo** | After promotional window | **Countdown** or **“standard terms from {date}”** in **billing** / **AI settings** |

---

## 2. Components & patterns (align with monday libraries)

- **Banners:** Dismissible vs persistent; **admin-only** vs **all members** variants.  
- **Buttons:** One **primary** per view (e.g. **Explore new platform** / **See migration offer**).  
- **Modals:** **Comparison table**: **Current path** (legacy + add-on) vs **New packaged** offer; include **footnotes** for discount duration (**TBD**).  
- **Badges:** `New`, `Recommended`, `Limited time` (Legal-approved).  
- **Data display:** **Credit balance** + **grant source** (purchase grant / promo grant / daily)—align copy with ledger team.  
- **Tables:** Admin **usage** view: sortable; highlight **threshold** for “high usage” messaging (design **does not** expose raw internal segment IDs).

---

## 3. Content principles

- **No dark patterns:** **Dismiss** and **“keep add-on path”** remain visible where policy allows.  
- **Same SKU / same discount:** **Identical** price module component reused in **D** and **E**; only **headline** and **supporting copy** change.  
- **Honesty:** If promo is **N months** free or discounted credits, show **end date** and **what happens next**.

---

## 4. Figma file structure (suggested)

1. **Cover** — initiative name + owner + link to this brief.  
2. **Flow A–H** — one **user journey** frame per row (happy path).  
3. **Components** — instances from **monday DS** file (link your library).  
4. **Specs** — redlines for **copy max width**, **breakpoint** behavior (admin desktop-first).

**Handoff:** Mark **ready for dev** frames; note **experiments** (flag keys) in Figma description.

---

## 5. Out of scope for design-only

- **Final** numbers (% discount, months free)—**Finance**.  
- **Eligibility rules** implementation—**Eng**; design **all** states that **could** show.

---

## 6. Next step for designers

- Duplicate or branch from **Pricing page with AI** file for **in-app** variants (checkout modal, admin usage).  
- Schedule **DS review** with design system owner if new **composite** patterns (comparison modal) are needed.
