# 📋 AI add-on pricing surface — product spec (draft)

## 🎯 Goal

**Move customers to the new AI platform offering** (AI Work Platform). This pricing / upgrade surface is the lever: make the switch understandable and worthwhile so clients choose the new packaged SKU instead of staying on legacy AI credits / fragmented paths.

## 🧪 Hypothesis

If we show **personalized usage**, an **obvious promo on bundled credits**, and a **short explanation of the full AI platform**, then **more customers choose AI Work Platform over legacy AI credits**, because the upgrade feels concrete (they already used AI) and fairly priced—not abstract “more credits.”

---

## 🔀 Two ways to frame the purchase

### 🔹 Option A — New offering only

Single narrative: **AI Work Platform** is what you buy. The screen shows how much AI the account already used, what the bundle includes, the promotional price on bundled credits, and one primary path to checkout. There is no side-by-side “old SKU” on this screen. If migration context is needed, it can live in email, admin messaging, or help center.

### 🔸 Option B — Old next to new

Same core purchase flow as Option A, but the **prior model** (e.g. standalone AI credits add-on) appears **next to** AI Work Platform so the move feels intentional: simpler packaging, broader AI coverage, and promotional bundled credits versus staying on or repurchasing the legacy construct. Keep the comparison short—enough to answer “why change?” without becoming a full pricing matrix.

---

## 💎 Expected value on the screen

### 📊 1. Usage of the product (personalized)

Show **this account’s** recent AI activity so upgrade feels grounded in real behavior (not abstract “credits” only). Candidates:

- AI agent tasks created and/or completed *(define “task” and time window—e.g. billing period or trailing 30 days—in implementation).*
- AI column runs *(same: definition + window).*
- Vibe apps created *(optionally: published apps if that’s the stronger signal).*
- Users on the new layout *(define clearly in copy—e.g. teammates on the new workspace layout / migrated seats—and add tooltip if the label isn’t obvious to buyers).*

**UX intent:** one compact summary or strip—not a full analytics dashboard. If data is missing, use a simple empty state or hide the row until telemetry is available.

### 🏷️ 2. Highlight the benefit — nominal discount on credits

Make the **promo obvious at a glance:** list price vs discounted price on **bundled monthly credits**, visual treatment (e.g. strike-through + net price, promo ribbon), and **how long** the discount applies (e.g. number of billing cycles). Tie the offer to **moving to AI Work Platform** so “why now?” is clear.

### 🤖 3. Short explanation — what “AI Work Platform” includes

A concise block (short headline + scannable bullets) describing **everything** the buyer gets under the unified AI offering: agents, workflows/automation, column-level AI, Vibe / app builder, and any other surfaces that are **actually entitled** at purchase. Messaging goal: credits are the **meter**; platform scope is the **product**—not “more credits only.”

---

## ❔ Open decisions

- Ship Option A, Option B, or Option B as a collapsible “Previously…” section inside an Option A layout.
- Final metric definitions and time windows for usage strip.
- Exact entitlement list per tier vs flat inclusion with tier scaling only on credit quantities.
- **Phase two:** Priority among **high-intent** intercepts vs **med/low** promos; **heavy use** definition + eligibility (account vs user); **above 15 seats** vs sales-led variants.

---

## 📈 Success signals (draft)

Click-through to checkout, attach rate on promoted bundled tier, support tickets about “what’s included,” qualitative comprehension in usability tests.

---

## 🔮 Phase two — Levers to move customers to the new offering

**Scope:** Strategy framing *below 15 seats* ([deck](https://docs.google.com/presentation/d/1oMeCsI34arACAes17hRkyTPxHHPbZhpmbn0CR4A_cBk/edit)); **above 15 seats** may differ (e.g. sales-led). Phase one stays the **dedicated pricing / upgrade surface**.

### ⚡ High-intent moments (intercept in funnel)

- **AI add-on purchase** — Buying **AI credits**, **Vibe**, or similar → steer default path to **AI Work Platform** (swap SKU, bundled checkout, post-cart correction — *implementation open*).
- **Core plan tier upgrade** — Seat/plan upgrade → **attach or bundle** AI Work Platform with same promo narrative.
- **Credits depleted / limit hit** — Blocker surfaces → primary CTA = migrate to platform SKU (often overlaps Phase one pricing page).

### 📣 Med & low-intent moments (promo & timing)

- **Heavy use of free or trial credits** — Behavioral threshold → **promo** + migration story before churn or stall.
- **Trial ending (time-based)** — Clock ran out → **promo** + clear next step (not silent cutoff).
- **Trial countdown / “running low”** — Early warning → optional lighter touch (education + soft offer).

