# monday.com Platform Agents — Trial Method

## Executive Summary

Design a **credit-based trial** that drives users to the aha moment — **watching their agent autonomously complete real work** — within the first session. The trial should feel generous enough to experience value but bounded enough to create a clear upgrade path.

---

## 1. Trial Model: Hybrid Credit-Based

### Why Not Time-Based

Traditional 14-day trials are a poor fit for AI agents:

- **Variable marginal cost** — each agent run consumes AI credits (tokens, compute). A time-based trial creates unpredictable cost exposure.
- **Usage varies wildly** — a power user might trigger 50 agent runs in day one, while a cautious evaluator takes a week. Time penalizes the latter.
- **The aha moment is action-based, not calendar-based** — research shows achievement-triggered conversion prompts convert **258% higher** than calendar-based "trial ends tomorrow" emails.

### Recommended Model

| Component | Detail |
|---|---|
| **Trial type** | Credit-based with a soft time boundary |
| **Credit allowance** | Grant a meaningful credit bundle (e.g., 500 AI credits) — enough for ~15-25 meaningful agent runs |
| **Time boundary** | 14-day window to use the credits (creates urgency without being the primary constraint) |
| **Agent limit** | Unlimited agent creation (lets users explore and personalize) |
| **CC required** | No — removes friction; no-CC trials produce better 90-day retention |

> **Why unlimited agents:** Creating an agent is low-cost (it's just configuration). The cost lives in *running* the agent. Letting users create freely encourages experimentation and personal investment, which increases switching costs.

---

## 2. The Aha Moment: Agent Does Real Work

### Definition

The aha moment is: **the user sees their agent autonomously complete a task on real monday.com data** — not a simulation, but actual work appearing in their boards.

### Why This Specific Moment

| Benchmark | Aha Moment | Why It Works |
|---|---|---|
| Slack | Team sends 2,000 messages | Proves collaborative value |
| Dropbox | User uploads 10 files | Data is now "living" in the product |
| Figma | Creates and shares first design | Demonstrates workflow value |
| **monday Agents** | **Agent writes to a board autonomously** | **Proves the agent replaces manual work** |

The user must feel: *"This thing just did 20 minutes of work in 10 seconds — without me."*

---

## 3. Trial Flow Design

### Phase 1: Frictionless Entry (0-30 seconds)

```
[Existing monday.com user]
        │
        ▼
  "AI Agents" nav item  ──→  Landing page with agent gallery
        │
        ▼
  "Try Agents Free" CTA
        │
        ▼
  Credit grant (500 credits) — single click, no form
```

**Key decisions:**
- No separate signup — leverage existing monday.com session
- Show credit balance immediately ("You have 500 AI credits to explore agents")
- No credit card required at this stage

### Phase 2: Guided First Agent (30 seconds – 3 minutes)

This is the most critical phase. The goal is to get the user to a **working agent in under 3 minutes**.

**Option A: Start from a template agent (recommended for trial)**

Instead of starting from scratch, present **pre-configured agents tailored to the user's workspace context**:

```
"Agent suggestions tailored to your [Project management] team"
        │
        ├── Nina, Status Reporter → "Automated project visibility"
        ├── Leo, Thread Follow-up → "Ensure task follow-up"
        ├── James, Meeting Actions → "Convert meetings to tasks"
        └── [+ Start from scratch]
```

When a user picks a template:
1. Agent is **pre-built with instructions, triggers, and capabilities already configured**
2. User lands in Studio with everything ready
3. A single CTA: **"Activate & Run on Your Data"**

**Option B: Start from scratch (power users)**

The existing flow (describe → build → configure → activate) works well. Keep it available but don't make it the default trial entry point.

### Phase 3: First Agent Run — The Aha Moment (3-5 minutes)

This is where the trial is won or lost.

**Recommended approach: Auto-triggered first run**

After the user activates their agent:

1. **Don't wait for a trigger to happen organically** — that could take hours or days
2. Instead, offer an **immediate demonstration run**:
   ```
   ┌─────────────────────────────────────────────────────┐
   │  Jason is now active!                                │
   │                                                      │
   │  Want to see Jason work right now?                   │
   │                                                      │
   │  [▶ Run on "My First Project" board]   [I'll wait]   │
   │                                                      │
   │  This will use ~5 credits from your trial balance    │
   └─────────────────────────────────────────────────────┘
   ```
3. When the user clicks "Run now":
   - Show a **live activity stream** of what the agent is doing (reading data → analyzing → writing results)
   - The agent produces **visible output on a real board** — a status update, a summary, a categorized list
   - Celebrate the completion: *"Jason just analyzed 12 items and posted 3 updates — in 8 seconds"*

**This is the conversion moment.** Research shows users who reach this point within the first session convert at 2-3x higher rates.

### Phase 4: Expansion & Depth (minutes 5-30)

After the first aha moment, guide users to deepen engagement:

```
Activation Checklist (gamified, contextual):
  ✅ Created your first agent
  ✅ Agent completed its first run
  ☐ Create a second agent for a different workflow
  ☐ Customize your agent's instructions
  ☐ Set up an automatic trigger (Mentioned or Assigned)
  ☐ Connect an additional capability (e.g., Send email)
```

Each completed step reinforces the value and increases switching cost.

### Phase 5: Upgrade Path (credit depletion or day 10+)

```
Credit Usage:  ████████████░░░░░░░░  410/500 used
               "You've used 82% of your trial credits"
               "Your agents have completed 23 tasks autonomously"

[Upgrade to keep your agents running] [See plans]
```

**Key upgrade triggers (behavioral, not calendar):**

| Trigger | Message |
|---|---|
| 80% credits used | "Your agents are doing great work — upgrade to keep them running" |
| Agent produces high-impact output | "Jason just saved you ~45 min this week" |
| User creates 3+ agents | "You've built a team of agents — unlock unlimited runs" |
| Credits depleted | "Your agents are paused. Upgrade to reactivate them" |
| Day 12 (if credits remain) | "Your trial credits expire in 2 days — use them or upgrade" |

---

## 4. Critical Design Principles

### Principle 1: Zero-to-Value in One Session

| Metric | Target |
|---|---|
| Time to first agent created | < 2 minutes |
| Time to first agent run (aha moment) | < 5 minutes |
| Time to first visible output on a board | < 5 minutes |

Research shows every 10-minute delay costs ~8% in conversion. The current flow (describe → build → configure triggers → activate → wait for trigger) has too many steps before value. **Compress the path to the aha moment.**

### Principle 2: Show the Work, Not Just the Result

During agent execution, show a **live activity stream**:
```
  ⚡ Jason is working...
  │
  ├─ Reading "Q1 Projects" board... (12 items found)
  ├─ Analyzing market trends across items...
  ├─ Identifying 3 key patterns...
  ├─ Writing summary to "Strategic Insights" board...
  │
  ✅ Done — 4 updates posted in 8 seconds
     Credits used: 5   |   Credits remaining: 495
```

This makes the AI visible and trustworthy. Users need to *see* the agent working to believe it replaces their manual effort.

### Principle 3: Real Data, Not Simulation

The Preview/Simulation mode is useful for testing, but **the trial aha moment must happen on real data**. Simulations feel fake. The user needs to see output show up on their actual board.

**Recommended flow:**
- Simulation = tool for iterating on agent instructions (available in Studio)
- Trial aha moment = real run on real board with real output

### Principle 4: Credit Transparency

Always show:
- Current credit balance
- Credits per agent run (estimated)
- What the user "got" from credits spent ("3 status updates, 1 summary report")

This builds trust and helps users understand the value exchange before upgrading.

### Principle 5: Don't Gate Creation, Gate Execution

| Action | Trial Behavior |
|---|---|
| Create agents | Unlimited, free |
| Configure agents | Unlimited, free |
| Simulate agents | Unlimited, free |
| **Run agents on real data** | **Consumes credits** |
| View agent activity | Unlimited, free |

This maximizes investment (the more agents you build, the more you need to upgrade) while keeping costs predictable.

---

## 5. Benchmarked Trial Patterns Applied

### Pattern: Template-First Start (from Notion)
Notion never shows a blank page. monday Agents should never show a blank agent builder as the first experience. **Lead with pre-configured agents that match the user's workspace type.**

### Pattern: Quick-Win in First Session (from Canva)
Canva gets users to a finished design in under 2 minutes using templates. monday Agents should get users to a **completed agent run in under 5 minutes** using template agents.

### Pattern: Team Virality (from Slack)
Slack's aha moment involves the team. Consider: when an agent posts an update to a board, other team members see it → curiosity → "I want an agent too." **Agent output is inherently viral within the workspace.**

### Pattern: Progressive Value Demonstration (from Salesforce)
Salesforce pre-populates trial orgs with sample data to tell a story. monday Agents should **show estimated time-saved after each agent run** to tell the ROI story progressively.

### Pattern: Achievement-Based Upgrade Prompts (from Duolingo)
Don't prompt upgrade on a calendar. Prompt when the user hits a milestone:
- "Your agents completed 10 tasks — that's ~2 hours saved"
- "You've built 3 agents — your AI team is growing"

---

## 6. What to Measure

### Primary Metrics

| Metric | Definition | Target |
|---|---|---|
| **Time to First Agent Run** | Minutes from trial start to first real agent execution | < 5 min |
| **Trial Activation Rate** | % of trial users who complete at least 1 real agent run | > 65% |
| **Trial-to-Paid Conversion** | % of trial users who upgrade | > 20% |
| **Credit Utilization** | % of trial credits actually used | > 60% |

### Secondary Metrics

| Metric | Definition | Why It Matters |
|---|---|---|
| Agents created per trial user | Average count | Measures exploration depth |
| Agent runs per trial user | Average count | Measures perceived value |
| Time between first and second agent run | Hours/days | Measures stickiness |
| Multi-agent adoption | % creating 2+ agents | Predicts expansion revenue |

### Activation Funnel

```
Trial Start
    │  100%
    ▼
First Agent Created
    │  Target: 85%+
    ▼
First Agent Activated
    │  Target: 70%+
    ▼
First Real Agent Run (AHA MOMENT)
    │  Target: 65%+
    ▼
Second Agent Created
    │  Target: 40%+
    ▼
Upgrade
    │  Target: 20%+
    ▼
Retained (Month 2)
       Target: 80%+ of converters
```

---

## 7. Risk Mitigation

| Risk | Mitigation |
|---|---|
| Users burn credits on poorly configured agents | Show "estimated credits" before run; offer simulation first |
| Agent produces low-quality output → bad first impression | Curate template agents with tested prompts; use simulation as safety net |
| Credit anxiety prevents exploration | Show clear credit costs; make first run cost very low (~5 credits) |
| Users create agents but never activate → no aha moment | Auto-prompt "Run now" after creation; don't let users leave without running |
| High trial cost per user (AI compute) | Set credit cap; monitor per-user cost; optimize agent efficiency |
| Trial users who love it but don't buy (budget constraints) | Offer a small always-free tier (e.g., 50 credits/month) to maintain habit |

---

## 8. Summary: The Trial in One Sentence

> **Give users enough credits to fall in love with agents doing their work, then make the upgrade feel like hiring the team permanently.**

### The 3 Non-Negotiables

1. **First agent run within 5 minutes** — template agents + "Run Now" button
2. **Real output on real boards** — not simulations
3. **Credit-based with behavioral upgrade prompts** — not calendar-based expiration

---

## Appendix: Trial Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        TRIAL ENTRY                               │
│  User clicks "AI Agents" → Sees landing page → "Try Free"       │
│  → 500 credits granted instantly (no CC, no form)                │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    FIRST AGENT (< 2 min)                         │
│  Template gallery (personalized) → Pick agent → Auto-configured │
│  OR: "Start from scratch" → Describe → Build (existing flow)    │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    AHA MOMENT (< 5 min)                          │
│  "Run Now" button → Live activity stream → Real output on board │
│  → Celebration: "Agent saved you X minutes"                     │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    DEEPEN ENGAGEMENT                              │
│  Activation checklist → Second agent → Customize instructions    │
│  → Set up triggers → Connect capabilities                       │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                    CONVERSION                                    │
│  Behavioral triggers (80% credits, milestones, time saved)       │
│  → Upgrade CTA → Plan selection → Agents keep running           │
└──────────────────────────────────────────────────────────────────┘
```
