# Platform Agents — Free Trial Flow

**Goal:** Define the end-to-end trial experience for monday.com platform agents  
**Status:** Draft  
**Priority:** High  
**Owner:** Roni  
**Last updated:** March 18, 2026

---

## Problem

Every monday.com account gets a one-time grant of free AI credits. Once those credits are consumed, the account hits a hard wall — no more AI capabilities unless they purchase a credit package.

**The problem:** Platform agents are a new product category launching into accounts that may have already burned through their free credits on other AI features (Sidekick, AI column, AI automations). These users land in the Agent Builder, invest time setting up an agent — configuring triggers, writing instructions, connecting tools — and then hit "Activate" only to be told they're out of credits. Dead end.

This creates three failures:
1. **Zero exposure to agents.** Users who exhausted credits on simpler AI features never get to experience the highest-value AI capability. The accounts most engaged with AI (they used all their credits) are the exact accounts blocked from trying agents.
2. **Wasted setup investment.** The Agent Builder is ungated — users can build an agent end-to-end before discovering they can't run it. That's a frustrating cliff, not a conversion moment.
3. **No data on agent value.** Without a trial, we can't show users (or ourselves) what agents actually deliver. The end-of-trial "performance review" — tasks completed, time saved — is our strongest conversion lever, and it doesn't exist without a trial.

**The core tension:** Free credits are account-level and shared across all AI features. Agents compete for the same pool. Users who already spent credits on lower-value AI features are blocked from trying the higher-value one.

### Who is affected

- Accounts that consumed their free AI credit grant (most active AI users)
- Accounts on plans that don't include purchased AI credits
- Users who completed agent setup but can't execute

### What we need

A dedicated trial for platform agents — separate from the general AI credit pool — that guarantees every account can experience agents regardless of prior credit usage.

---

## Solution

Grant a **dedicated agent trial**: 1,000 AI credits reserved exclusively for platform agents, valid for 30 days, at the account level.

The trial gate kicks in at the moment of **execution** — when the user tries to make the agent actually do work. Setup remains fully ungated. By the time they hit the trial prompt, they've already configured something they want to use. Sunk-cost + curiosity = high trial start rate.

**Trial offer:** 1,000 AI credits · 30 days · account-level (shared across all platform agents)

### Design references

- **Trial start modal:** Based on AI Lead Agent "Unlock" modal pattern (3D characters, value props, single CTA)
- **End-of-trial modal:** Based on monday Vibe end-of-trial pattern (value summary + conversion CTAs)

---

## Flow Overview

```
┌─────────────┐     ┌──────────────────┐     ┌────────────────┐     ┌──────────────┐
│  Agent Setup │ ──▶ │  Trigger: User   │ ──▶ │  Trial Start   │ ──▶ │  Trial Active │
│  (no gate)   │     │  clicks Activate │     │  Modal         │     │  (30 days /   │
│              │     │  or Run Now      │     │                │     │  1000 credits) │
└─────────────┘     └──────────────────┘     └────────────────┘     └──────┬───────┘
                                                                           │
                                              ┌────────────────┐          │
                                              │  End-of-Trial  │ ◀────────┘
                                              │  Modal (value  │
                                              │  summary)      │
                                              └───────┬────────┘
                                                      │
                                              ┌───────▼────────┐
                                              │  Post-Trial    │
                                              │  (graceful     │
                                              │  pause)        │
                                              └────────────────┘
```

---

## Stage 1: Agent Setup (No Gate)

**What happens:** User builds their agent freely — no trial required.

The Agent Builder is fully accessible. Users can:
- Name the agent and set a description
- Configure triggers (e.g., "Mention @Noah in updates", "Assign Noah in People columns")
- Write instructions (overview, templates, behavior rules)
- Add context sources
- Preview the agent's configuration

**Why no gate here:** Setup is the investment phase. The more time a user spends configuring their agent, the higher the likelihood they'll start the trial when prompted. Gating setup would kill top-of-funnel.

---

## Stage 2: Trial Trigger Points

The trial modal appears when an unpaid user attempts to **execute** the agent. Two trigger points:

### Trigger A: "Activate agent" button
- **Location:** Top-right of the Agent Builder (see Agent Builder screen)
- **User intent:** Make the agent live — start listening for triggers and running autonomously
- **Behavior:** If user has no active AI trial or credits → show Trial Start Modal

### Trigger B: "Run now" 
- **Location:** Within the agent's action menu / manual execution option
- **User intent:** Test the agent immediately on existing data
- **Behavior:** Same as Trigger A → show Trial Start Modal if no active trial/credits

### Trigger logic (pseudocode)

```
WHEN user clicks "Activate agent" OR "Run now"
  IF account has active AI trial OR purchased credits
    → Execute the agent (normal flow)
  ELSE IF account previously had a trial that expired
    → Show Expired Trial Modal (upgrade prompt)
  ELSE
    → Show Trial Start Modal
```

---

## Stage 3: Trial Start Modal

**Pattern:** AI Lead Agent "Unlock" modal (media modal with 3D illustration + value props)

### Modal content

**Header:** "Unlock Platform Agents"

**Subheader:** "Your agents are built and ready to work. Start your free trial to put them into action — 1,000 AI credits to automate real work across your boards."

**Value propositions (3 bullets):**

- **Always working:** Your agents run 24/7 — handling tasks, updates, and follow-ups so nothing falls through the cracks.
- **Built for your workflow:** Agents follow the instructions you set, working the way your team works.
- **Full visibility:** Track every action your agents take with a real-time activity dashboard.

**CTA:** `Start free trial` (primary, filled button)

**Fine print:** "30-day trial · 1,000 AI credits · No credit card required"

**Visual:** 3D character illustration (consistent with AI Lead Agent style — agent characters in action)

**Dismiss:** X button (top-right). Dismissing returns user to the Agent Builder without activating.

### What happens on click

```
WHEN user clicks "Start free trial"
  → Provision 1,000 AI credits to the account
  → Set trial expiry = today + 30 days
  → Activate the agent (execute the original user intent)
  → Show success toast: "Trial started! Your agent is now active."
  → Log event: trial_started { agent_id, agent_type, user_id, account_id }
```

### Who sees this

- **Admin:** Full modal, starts the trial for the account
- **Member (non-admin):** Modified modal with "Ask your admin to start a trial" CTA instead, or a "Notify admin" button (similar to Vibe's "Notify your admin" pattern)

---

## Stage 4: During Trial (30 Days / 1,000 Credits)

### In-product indicators

**Credit balance indicator:**
- Persistent but non-intrusive indicator in the Agent Builder / agent dashboard
- Shows: "Trial: X credits remaining · Y days left"
- Clicking opens the credit usage dashboard

**Agent activity dashboard:**
- Available from day 1 of trial
- Shows: tasks completed, credits consumed, actions by type
- This is the "performance review" — the primary conversion driver (per monetization strategy: dashboard = performance review)

### Warning notifications

| Trigger | Notification | Channel |
|---------|-------------|---------|
| 80% credits used | "200 credits remaining. View your agents' work summary to plan ahead." | In-app banner (persistent) |
| 100% credits used (days remaining) | "You've used all trial credits. Your agents will pause after finishing current tasks." | In-app modal + email |
| Trial expired | End-of-Trial Modal | In-app modal |

### Mid-trial email (day 15)

**Subject:** "Your agents completed {X} tasks this week"

Purpose: reinforce value, show the "performance review" of what agents did. Link back to activity dashboard. This builds the habit of checking agent output — critical for conversion.

---

## Stage 5: End-of-Trial Modal

**Pattern:** Adapted from monday Vibe end-of-trial modal (in-product modal with value summary)

**Trigger:** Shown when user opens Agent Builder or a board with active agents after trial expiry (or credits exhausted).

### Modal content

**Visual hero:** Blurred/faded view of the user's actual agent dashboard behind a semi-transparent overlay (similar to Vibe's app screenshot in the modal). Agent icon centered.

**Header:** "Your agents trial has ended"

**Subheader:** "Here's what your agents accomplished during the trial"

**Value summary section (the "performance review"):**

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  📊 Your agents in 30 days                      │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   47     │  │  1,000   │  │   12h    │      │
│  │  Tasks   │  │ Credits  │  │  Saved   │      │
│  │completed │  │  used    │  │(estimated)│      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                 │
│  Top actions:                                   │
│  • Summarized 23 meeting transcripts            │
│  • Created 15 follow-up tasks                   │
│  • Updated 9 board items                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Emotional hook:** "Your agents were working while you weren't. Keep the momentum going."

**CTAs:**
- `Purchase credits` (primary, filled button) → leads to credit package selection
- `See plans` (secondary, text link) → leads to pricing page
- `Contact sales` (tertiary, text link) → for enterprise buyers

**Dismiss:** X button. Dismissing returns user to the paused agent state.

### Modal variants by role

| Role | Header variation | Primary CTA |
|------|-----------------|-------------|
| Admin | "Your agents trial has ended" | `Purchase credits` |
| Member | "Your agents trial has ended" | `Notify your admin` |

---

## Stage 6: Post-Trial (Graceful Pause)

### What happens

```
WHEN trial expires OR credits exhausted
  → Agents finish any currently running task (never interrupt mid-execution)
  → Agents enter "Paused" state
  → Agent status badge changes to "Paused — trial ended"
  → Triggers stop firing (no new executions)
  → Agent configuration is fully preserved (nothing lost)
  → Activity dashboard remains accessible (read-only)
```

### Agent Builder state after trial

- Agent cards show "Paused" badge with amber indicator
- "Activate" button label changes to "Resume — purchase credits"
- Agent instructions, triggers, and context remain intact
- Activity history and dashboard remain fully viewable

### Why graceful pause (not hard stop)

1. **Never punish investment.** Users built something — deleting or breaking it destroys trust.
2. **Dashboard as conversion.** The activity dashboard showing what agents DID is the strongest purchase motivator. Keeping it visible post-trial is a conversion lever, not a cost.
3. **Competitive alignment.** Notion (gold standard) pauses at billing boundary. Base44's hard stop is universally criticized.
4. **Re-engagement.** A paused agent with visible past results is an ongoing reminder of value. Dead agents don't convert.

---

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| User builds multiple agents during trial | All share the 1,000 credit pool. Each agent's usage tracked separately in dashboard. |
| Credits run out on day 10 (20 days remaining) | Credit-exhaustion modal shown. Same as end-of-trial but header: "You've used all your trial credits." Agents pause. |
| Admin starts trial; member tries to run agent | Agent runs using account trial credits. Member sees credit balance indicator. |
| User dismisses trial start modal, clicks Activate again | Modal re-appears. No "don't show again" — this is a deliberate gate. |
| Account already had a different AI trial (e.g., Sidekick) | Platform agents trial is separate. Each product has its own trial grant. (Assumption — validate with monetization team.) |
| User is on Enterprise plan with purchased credits | No trial modal — agent activates immediately using purchased credits. |

---

## Success Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Trial start rate | % of users who see the modal and click "Start free trial" | >60% |
| Activation depth | Avg. number of agent tasks completed during trial | >20 tasks |
| Credit utilization | % of 1,000 credits used during trial | >70% |
| Trial-to-paid conversion | % of trial accounts that purchase credits within 14 days of trial end | >15% |
| Time to first agent run | Time from trial start to first completed agent task | <5 min |

---

## Assumptions (to validate)

1. **1,000 credits is enough to reach the aha moment.** Need to model: how many credits does a typical agent task consume? If a meeting summary costs 50 credits, that's only 20 summaries — is that enough?
2. **30 days is the right window.** Competitive range: Intercom (14 days), Notion (10 weeks). 30 days is middle ground. May need A/B testing.
3. **Account-level trial works for multi-agent accounts.** If one power user burns all 1,000 credits on day 2, other team members get zero value. Consider per-user credit allocation within account pool.
4. **Separate trials per product.** If Sidekick and Agents share credits, the trial may not showcase either properly. If separate, we need to manage "trial fatigue."
5. **"Time saved" estimation is feasible.** The end-of-trial modal shows estimated time saved. Need a credible calculation model (e.g., avg. human time per task type vs. agent time).

---

## Open Questions

- [ ] What is the credit cost per agent task type? (meeting summary, task creation, board update, etc.)
- [ ] Should the end-of-trial modal include a limited-time discount to drive urgency?
- [ ] How does this interact with existing AI credit packages and plan tiers?
- [ ] Should "Run now" during trial count differently than trigger-based runs? (manual test vs. automated execution)
- [ ] What's the re-trial policy? Can an account get a second trial?
