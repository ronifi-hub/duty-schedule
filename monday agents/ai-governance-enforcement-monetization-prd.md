# PRD: In-Platform AI Governance & Enforcement Communication

**Author:** Roni | **Date:** Mar 2026 | **Status:** Draft  
**Product area:** AI (Vibe, Sidekick, Agents) — monetization & governance comms

---

## 1. Problem

Customer evidence: *"I want to roll out AI, but without controls one user might burn or hog the entire AI credits pool."* We're shipping per-user and account-level limits (soft now, hard soon) and admin controls. If in-platform messaging is inconsistent or wrong by **user type** (admin vs member, plan), **scope** (user-level vs account-level), or **scenario** (total disable vs soft vs hard limit), users don't know why they're blocked or what to do. Result: wrong CTAs (e.g. "Upgrade" when the blocker is admin policy), support load ("Why can't I use AI?"), and missed conversion (admins who could add credits don't see a clear path). There is no single, authoritative spec for what message and CTA to show to whom for each AI feature and each limit state.

---

## 2. Goals

- **Consistency:** 100% of in-platform AI limit/disable states show the correct message and CTA for that user type (plan × role), scope (user vs account), and scenario (total disable / soft / hard) by launch of hard enforcement.
- **Conversion:** Increase CTA click-through from limit-hit states (upgrade / trial / contact admin) by [TBD]% within 90 days of full rollout.
- **Clarity:** Reduce support tickets tagged "AI access / limit" by [TBD]% within 90 days.

---

## 3. Target Users

**Primary (beneficiaries of the comms):** Account admins (billing, governance) and members who hit limits or see AI disabled — they need to know why and what to do.  
**Secondary (readers of this PRD):** Monetization team (owns copy, placement, CTAs) and product/design (surfaces and flows).

---

## 4. Requirements

**P0 — Does not ship without**

- P0: Every in-platform AI limit or disable state shows a **message that states the reason** (total disable / soft limit / hard limit) and **scope** (your limit / account limit / this agent's limit).
- P0: The **CTA matches user type** (plan × role): admins get enable / upgrade / buy credits where applicable; members get contact admin or request access where applicable; no "Upgrade" when the blocker is admin-disabled.
- P0: **User-level** and **account-level** limit states use **distinct copy and audience** (e.g. user: "Your limit"; account: "Your account's limit" or admin digest only).
- P0: **monday Agents** surfaces use **agent-centric** copy and CTAs (e.g. "This agent is at its limit," "Add credits for this agent") — not user-centric ("You've reached your limit").

**P1 — Ships without it, but degraded**

- P1: **Soft** and **hard** enforcement have **distinct messages** (soft: existing work continues, no new; hard: blocked) and distinct CTAs.
- P1: **Placement** is defined per scenario and per feature surface (banner, inline, modal, empty state) in a single matrix for monetization.

**P2 — Nice to have**

- P2: When per-department limits ship, messaging and CTAs for department-level scope are added to the same matrix.

---

## 5. Success Metrics

| Metric | Target | Counter-metric |
|--------|--------|----------------|
| Correct message + CTA for every limit/disable state (audit) | 100% at launch of hard enforcement | — |
| CTA click-through from limit-hit states | +[TBD]% within 90 days | Without increasing trial cancel or "accidental" upgrade complaints above [TBD]% |
| Support tickets tagged AI access/limit | −[TBD]% within 90 days | Without increasing time-to-resolution for those that remain |

---

## 6. Out of Scope

- **Off-platform only** (e.g. email-only campaigns) — in scope only where they mirror or link to in-platform states.
- **Legal/compliance footer copy** — except where it directly affects the main message or CTA.
- **Implementation** (APIs, feature flags, entitlement logic) — this PRD specifies what to communicate and where; engineering spec is separate.
- **Department-level** messaging until that product capability ships (then P2 applies).

---

## 7. Open Questions

- **Copy ownership:** Who approves final in-product copy for each scenario? (Monetization / Product / Legal — TBD.)
- **Baseline metrics:** What is current CTA click-through and support volume for limit/disable states so we can set TBD targets? (Data/analytics — by [date].)
- **Agents agent-level vs user-level:** When we show "This agent's limit" vs "Your agents' limit," who decides (product) and by when?

---

*Reference: [ai-governance-enforcement-strategy-reference.md](ai-governance-enforcement-strategy-reference.md) — definitions, user vs account, Agents section, and scenario mapping.*
