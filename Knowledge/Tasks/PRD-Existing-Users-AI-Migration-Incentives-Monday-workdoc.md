# PRD (monday workdoc style): Existing users — AI platform adoption & migration incentives

**Status:** Draft  
**Owner:** Roni (PM — Sidekick, Agents, AI features)  
**Last updated:** Apr 2026  
**Format:** Structure B — monday workdoc (see `.cursor/skills/prd-writing/SKILL.md`) · Companion spec: [linear-style PRD](PRD-Existing-Users-AI-Platform-Migration-Incentives.md)  
**Reference template:** [Add-On purchase flow for wired account](https://monday.monday.com/docs/18403964873) ([pulse](https://monday.monday.com/boards/18403017170/pulses/11452930183?doc_id=18403964873))

---

## Problem

Existing paid accounts can stay on **legacy plan + AI add-on** paths while **new** accounts (from **May 6**) align to **AI-inclusive** packaging. That **two-track** world increases **TCO confusion**, **support** load (“which balance am I using?”), and slows **unified platform** adoption. Heavy users lack a **clear better path** than buying more add-on; low-AI-use accounts miss **aha**; **agents** monetization needs a **sequenced** beat, not a pile-on.

---

## Expected behavior

- **All existing** eligible accounts **see** their **credits/entitlements** and **what’s new** with the **May 6** AI platform launch, with a **primary CTA** into **new platform mode**.  
- Accounts that consumed **≥80%** of the **one-time purchase grant** receive **additional credits** to **experiment** on the new platform (bucket/validity per Finance).  
- **One** **migration offer** (same **SKU** + same **discount** terms): surfaced in **AI add-on purchase** flows and for **high AI usage** accounts—**messaging only** differs. Users who qualify for **both** see **one** coherent promo.  
- After **agents** monetization (**end of May**), an **agents-only trial** (+ credits) ships with **separate** comms cadence from the May 6 blast.  
- **Voluntary** migration only—no forced SKU cutover in this initiative.

---

## Solutions

### **1# May 6 — platform visibility & entry (all existing)**

**Acceptance criteria**

- In-product **surfaces** show **both**: existing entitlements **and** new platform capabilities; **one** primary CTA to **new AI platform mode**.  
- **Admin** sees **account-level** consumption summary aligned with **unified ledger** copy (no conflicting “two coins”).  
- **P1:** Role-appropriate education for **low-use** members vs admins.

**Flow**

- Design reference: [Pricing page with AI (Figma)](https://www.figma.com/design/DIyM0lkmlwnzMkTI0AZKs8/Pricing-page-with-AI?node-id=26815-11134&m=dev) · In-app frames: [`DESIGN-BRIEF-AI-Migration-Figma-mondayDS.md`](DESIGN-BRIEF-AI-Migration-Figma-mondayDS.md)

| | **Steps** |
|---|-----------|
| **Customer** | See banner / AI settings → **Understand balance** → **Try new platform** → First meaningful action |
| **System** | Eligibility → Grant display → **Events** (`ai_platform_cta_*`) → Ledger debit rules |
| **GTM / Support** | Help articles; tagged tickets for “confusion” guardrails |

---

### **2# May 6 — ≥80% purchase-grant exhaustion cohort**

**Acceptance criteria**

- Eligible workspaces receive **additional credits** (amount, bucket, **expiry** per Finance).  
- **80%** rule is **documented** (which grant, which window).  
- **P1:** In-product notice when top-up applies (no silent grants).

**Flow**

- TBD Figma: **balance row** + **“why you got this”** tooltip.

| | **Steps** |
|---|-----------|
| **Customer** | Hits threshold → Notification → **Continue on new platform** |
| **System** | Measure consumption → Apply grant → `grant_topup_applied` event |
| **Finance** | Invoice / credit note behavior **TBD** |

---

### **3# Purchase — single migration discount (add-on path & high usage)**

**Acceptance criteria**

- In **AI add-on purchase** journey, user sees **migration** path: **discount** to **new packaged offering** **instead of** add-on (same SKU/discount as other surfaces).  
- **High usage** accounts see **same** offer with **usage-framed** copy.  
- **Overlap:** one promo if user matches **both**.  
- **Post-promo:** messaging for **standard** terms after promotional window (e.g. month 7 after **6 months** promotional credits — **TBD**).

**Flow**

- Figma: wire **add-on checkout** + **usage page** variants → [`DESIGN-BRIEF-AI-Migration-Figma-mondayDS.md`](DESIGN-BRIEF-AI-Migration-Figma-mondayDS.md)

| | **Steps** |
|---|-----------|
| **Customer** | Add-on cart / high-usage banner → **Compare** migration vs add-on → Checkout |
| **System** | Eligibility → `migration_discount_*` events → Billing |
| **Sales / AM** | Optional assisted flows for **wire / enterprise** (separate playbook) |

---

### **4# End of May — agents trial (post-monetization)**

**Acceptance criteria**

- **Agents-only** trial with **additional credits**; messaging **does not** collide with May 6 platform blast.  
- **P1:** First-run guidance in agents.

**Flow**

- TBD Figma: Agents gallery + trial ribbon (Agents PM).

| | **Steps** |
|---|-----------|
| **Customer** | Agents trial start → First run → Paid agents policy |
| **System** | `agents_trial_started` → Agent run debit |
| **PM Agents** | Eligibility rules vs platform grants |

---

## Open questions

1. **Discount mechanics:** % off vs **free / discounted credits for N months** (e.g. 6); **invoice** line presentation — **Finance + Legal**.  
2. **80% rule:** Grant bucket(s), measurement window — **PM + Eng**.  
3. **Overlap UX** when add-on + high-usage both apply — **PM + Design**.  
4. **Agents** trial vs platform grants — **PM Agents + Platform**.

---

## Data & success (appendix)

See [linear-style PRD §5–8](PRD-Existing-Users-AI-Platform-Migration-Incentives.md): events, rollout hypothesis, success metrics, out of scope, market snapshot.
