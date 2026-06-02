# AI Governance & Enforcement Strategy — Reference for Monetization Requirements

**Purpose:** Ground truth for the monetization communication requirements doc. Aligns in-platform messaging and CTAs with the actual governance and enforcement rollout.

**Internal doc links (sources):**
- https://monday.monday.com/docs/18398615129
- https://monday.monday.com/docs/18398614984
- https://monday.monday.com/docs/18395507211

---

## 1. Customer problem we're solving

> "I want to roll out AI, but without controls one user might burn or hog the entire AI credits pool."

Governance = admins need **per-user (and later per-department) control** over AI credit consumption so they can roll out AI safely.

---

## 2. How it works today (v1)

| Aspect | Current behavior |
|--------|------------------|
| **Where** | Per-user AI credit limits in **Admin Panel** |
| **Policies** | Admins define limits. Can be **specific** (e.g. "these power users: 1000 credits") or **catch-all default** (e.g. "all other users: 100 credits"). |
| **Limit type** | All limits are **soft limits**. Hard limits coming soon. |
| **When user hits limit** | **Existing workflows keep running**; user **cannot create new ones**. |
| **Admin visibility** | Warnings/notifications to admins when users or the account hit limits (e.g. **daily digest**). |

Implication for **monetization comms:** At soft limit we inform the user they can't create new workflows; we don't block existing ones. Message = "You've reached your limit for new workflows" + CTA (upgrade / request more / contact admin). Admin gets digest so they can adjust policies or purchase.

---

## 3. Coming next (roadmap)

- **Higher-granularity usage view** — usage attributed to a clear, specific source.
- **Mix of soft + hard limits** — customers can use **hard limits** on less-critical flows and **soft limits** on critical ones so business continuity is preserved.
- **Hard enforcement at user level** — coming soon. Any use case that consumes AI credits must implement **hard enforcement at the user level** (contact @reitta if first time hearing this).
- **Limits per department** — for larger orgs, easier governance at scale.

Implication for **monetization comms:** We will need distinct messaging and CTAs for:
- **Soft:** "You're at your limit; existing work keeps running, but you can't start new X. Request more or contact admin."
- **Hard:** "You're blocked. No new workflows and [optional: existing ones paused]. Upgrade or contact admin."

---

## 4. User-level vs account-level

Limits and enforcement can apply at **user level** or **account level**. Messaging and who sees what must reflect the right scope.

| Dimension | User-level | Account-level |
|-----------|------------|---------------|
| **What is limited** | Credits (or usage) allocated to a **specific user**. Each user has their own limit/bucket. | Credits (or usage) for the **entire account**. Shared pool across all users (and possibly agents). |
| **Who sets it** | Admin defines per-user policies (specific users or default for "all others"). | Admin/plan defines account-wide quota or cap. |
| **Who hits the limit** | A single user consumes their own allocation. | The account collectively consumes the pool; one user can "hog" and affect everyone. |
| **Who is notified** | The user (at limit) + admin (e.g. in digest: "User X hit their limit"). | Admin (and optionally billing owner). "Your account has reached its AI credit limit." |
| **Who gets the CTA** | **User at limit:** "You've reached your limit" → request more / contact admin. **Admin:** digest → adjust policy or add credits. | **Admin/account:** "Account limit reached" → upgrade / buy more credits. Members may see "Ask your admin" or generic "limit reached" if we don't expose account-level detail to them. |
| **Enforcement** | Soft/hard at **user** level: this user can't create new (or is blocked). Other users unaffected. | Soft/hard at **account** level: when account pool is exhausted, all users (and agents) may be affected. |

**For the requirements doc:** Define separate rows or subsections for user-level vs account-level in the message/CTA matrix. Same scenarios (total disable, soft, hard) but copy and audience differ: user-level = "your limit" / "you"; account-level = "your account's limit" / "your admin" or "the account."

---

## 5. Mapping to the two HL scenarios (for requirements doc)

| HL scenario | Governance/enforcement reality | What monetization must communicate |
|-------------|---------------------------------|-----------------------------------|
| **1. Total disability of the feature** | Feature off for the user/account (e.g. admin disabled, no entitlement, plan doesn’t include AI). User has no access. | Message: why it's off. CTA by role: admin → enable/upgrade; member → contact admin. |
| **2a. Soft enforcement** | User hit **soft** limit. Existing workflows keep running; **cannot create new** workflows. Admin gets warnings/digest. | Message: limit reached for *new* usage; existing work continues. CTA: request more / upgrade / contact admin. Optional: "View usage" / "See plan." |
| **2b. Hard enforcement** | User hit **hard** limit (when available). Stricter block (e.g. no new + possibly no running workflows, depending on product). | Message: usage blocked. CTA: upgrade / buy credits / contact admin. No "keep using" for the blocked action. |

---

## 6. Definitions to use in the monetization requirements doc

- **Soft limit (enforcement):** User is at or over their allocated limit. **Existing workflows keep running**; user **cannot create new** workflows (or equivalent for the feature). Notifications/warnings to admins. In-product message is informative + CTA to get more.
- **Hard limit (enforcement):** User is blocked from using the feature (or specific actions) until limit is increased or entitlement changes. Stricter than soft; may affect running work depending on product. In-product message is blocking + clear CTA (upgrade / contact admin).
- **Total disability:** Feature is fully off (admin turned off, no plan, post-trial, etc.). No usage possible. Message explains why + CTA by user type.

---

## 7. User types (plan × role) — unchanged

- **Plans:** free / trial / paid (add-on or included) / enterprise.
- **Roles:** admin (billing, governance) vs. member.
- Monetization matrix: message + CTA per (plan × role) for each of: total disable, soft enforcement, hard enforcement.

---

## 8. AI features in scope

Vibe, Sidekick, Agents (and any other in-platform AI that consumes credits and is covered by Admin Panel limits). Each feature may expose limits in different surfaces (Centerkick, chat, agent center, board, etc.) — the requirements doc should list surfaces per feature.

---

## 9. monday Agents — credits consumed by the agent, not the user

**What Agents is:** A product within monday where **agents do the work for the customer** — they execute tasks, process data, and run workflows in the platform. The human user configures and oversees; the **agent** is the one performing work and consuming resources.

**Why experience must differ:** The **agent** consumes AI credits, not the user directly. So:

- **Attribution:** When limits are hit, it's the **agent's** usage (or the agent's assigned quota) that is exhausted, not "the user's" in the same way as Sidekick or Vibe.
- **Who sees the message:** The **user** (owner/admin who set up the agent) or **admin** may see "Your agent has reached its credit limit" / "This agent can't run new tasks" — not "You've reached your limit."
- **CTA framing:** CTAs should reflect that the **agent** is the consumer: e.g. "Add credits for this agent," "Increase this agent's limit," "Your agent is paused — upgrade to keep it running." Avoid first-person ("You've used your credits") when the primary consumer is the agent.
- **Soft vs hard at agent level:** Same logic (soft = existing agent tasks keep running, no new ones; hard = agent blocked). Messaging: "This agent is at its limit" / "This agent is paused" so the human understands the **agent** is the entity being limited.
- **User-level vs account-level for Agents:** Limits can be per-agent, per-user (all agents owned by this user), or account-wide agent pool. The requirements doc should specify messaging for each: "This agent," "Your agents," or "Your account's agent credits."

**For the requirements doc:** Give monday Agents its own subsection or matrix. Same scenarios (total disable, soft, hard) and same user types (plan × role), but:
- Copy and CTAs are **agent-centric** (agent consumed credits; agent at limit; agent paused).
- Placement may differ (agent center, agent card, board where agent runs, admin view of agent usage).
- Account-level vs user-level vs **agent-level** limits should be explicit so we don't reuse "your limit" when we mean "this agent's limit."

---

*Use this reference when writing or updating the monetization communication requirements so copy, placement, and CTAs match the enforcement strategy and roadmap.*
