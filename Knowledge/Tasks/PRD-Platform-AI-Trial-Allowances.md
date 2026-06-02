# PRD: Platform AI — experiment allowances

**Status:** Draft for review  
**Owner:** Roni (PM — Sidekick, Agents, AI features)  
**Last updated:** Apr 2026  
**Vision doc:** [`VISION-Platform-AI-Features-Trial.md`](VISION-Platform-AI-Features-Trial.md)

---

## 1. Problem

We ship many AI surfaces, but today's trial is one generic program: no bounded window to drive activation and time-to-value; one shared pool lets a heavy feature burn the trial before others activate; one trial shape cannot match different granularity, frequency, and time-to-aha across Sidekick, agents, notetaker, and blocks; and maturity differs by feature, so timing must be set per surface. We need non-fungible per-feature experiment allowances—user or account scope, daily, one-time, or time-limited—so users reach aha before paid credits without one AI line blocking the rest.

---

## 2. Target users

**Primary:** Individual contributors (members) on monday.com paid plans who have been granted access to one or more AI features but have not yet used them meaningfully.

**Secondary:** Account admins who need to roll out AI to their teams, control spend, and report on evaluation progress to finance or IT.

**Not in scope for this PRD:** New account trials (plan-level trials are a separate surface). Free plan users.

---

## 3. Core decisions

### What we are building

- One trial and allowance model across all AI features.
- A separate, **non-fungible** bucket per feature so one surface cannot drain another.
- A simple user-facing balance experience that makes it clear what the user can try now.
- An admin view that shows how allowances are being used across the account.

### What is configurable

- **Scope** — whether the allowance is granted at the **user level** or **account level**.
- **Grant type** — whether the allowance is **daily recurring**, **one-time**, or **time-limited**.
- **Grant amount** — how much usage is included in the allowance for that feature.
- **Feature bucket** — which AI surface the allowance applies to: Sidekick, agents, notetaker, AI columns, doc summary, workflows, or automations.
- **Eligibility** — which users, roles, plans, or workspaces can receive or consume the allowance.
- **Validity window** — when the allowance starts and ends.
- **Consumption order** — which allowance is used first when both user-level and account-level allowances exist.
- **Per-user draw limits** — how much a single user can consume from a shared account allowance.
- **Admin permissions** — which admin roles can enable, edit, or monitor allowances.

### Product principles

- Users should reach the **aha moment** before they are asked to pay.
- The model should support both **bottom-up discovery** and **admin-led rollouts**.
- Balance messaging should be clear enough that users know what action will consume.
- Permission walls should not become dead ends; blocked users should be able to **ask admin** in one click.

### Follow-ons

- Real-time balance updates after each action.
- Achievement-based messaging after a user reaches first value.
- Admin controls to limit how much one member can draw from shared account allowances.
- Nudges to explore AI surfaces the user has not tried yet.
- Low-balance alerts for admins.

**Per-feature activation notes** (full detail in vision doc):

| Feature | In-feature entry point | AI permissions entry | Member alone? | Admin gate? | Trial scope |
|---------|------------------------|----------------------|---------------|-------------|-------------|
| **Sidekick** | Sidekick panel / sidebar (contextual on boards, items, docs) | Admin enables workspace access | Yes | Possible | User-level |
| **Custom agents** | Agents gallery / Agents tab | Admin sets org scopes and integrations | Yes (build + first run) | Yes (sustained) | Hybrid |
| **AI notetaker** | Meeting integration banner / calendar event / post-meeting inbox | Admin enables recording, calendar connectors — **required** | No | Yes (always) | Account-level |
| **AI columns** | Column type picker when adding a column | Admin may restrict AI column types | Usually | Enterprise: yes | Account-level |
| **Doc summary** | AI toolbar / "Summarize" action inside a doc | Global AI disable only | Yes | Rare | User-level |
| **AI workflows** | AI assist inside the automation recipe editor | Admin controls cross-board publishing | Yes (build) | Publishing only | User-level |
| **AI automations** | AI step available inside any automation recipe | Admin enables OAuth / integrations — often a hard gate | Partial | Yes (OAuth) | Account-level |

## 4. Open questions

| Question | Owner | By when |
|----------|-------|---------|
| What is the default consumption order when a user has both a user grant and an account grant active? | PM + Monetization | Before eng kickoff |
| Daily reset: calendar day (workspace TZ) or rolling 24h? | Platform eng | Before eng kickoff |
| Which specific grant amounts (units) ship for each bucket at launch? | PM + Finance | Before eng kickoff |
| Do purchased AI credits enter the same grant system, or a separate layer? | Monetization | Before eng kickoff |
| Does "AI blocks" get one bucket or four separate buckets at v1? | PM | Before design review |

