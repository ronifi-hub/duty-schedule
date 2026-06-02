# Monetizing Agents: A New Playbook

**Goal:** Strategic leverage — define monetization strategy for monday.com's agentic product
**Status:** In progress
**Priority:** High

---

## 1. The Platform Shift: From Managing Work to Doing Work

monday.com has always been the place where teams **manage** work — track tasks, assign owners, visualize progress. But with agents, the platform is crossing a fundamental threshold: it's now where work **gets done**.

This isn't a feature upgrade. It's a category shift.

- **Before:** Users come to monday to organize, update, and track work that happens elsewhere (in email, Slack, spreadsheets, meetings)
- **After:** Agents execute work inside the platform — writing updates, processing data, triaging requests, following up with stakeholders
- The active users in the platform are increasingly **agents, not people**. Humans are stepping back from being the primary "doers."

### The work conversation moved inside

The communication about work being done used to happen **outside** the platform. An employee does work, then reports to their manager in 1:1s, Slack, weekly updates — the visibility into productivity happened through human channels, not the work tool.

Now the agent does work inside the platform, and the platform itself becomes the communication channel between "worker" and "manager." The platform owns both the work AND the reporting on the work.

This changes who the product is for, what the product needs to prove, and how we charge for it.

---

## 2. What's Changing

### The North Star is Changing

- **Old north star:** Active users on the platform (DAU/MAU, seats filled)
- **New north star:** Work completed / value delivered
- Some "users" are now agents — they consume resources, produce output, and generate value
- Metrics, dashboards, and reporting need to evolve to reflect agent-driven work alongside human work
- Implication: the value story shifts from "how many people use this" to "how much gets done"

### The ICP is Changing

- Panels (individual boards, views) are shrinking in importance — visibility and governance across the system become the product
- The buyer shifts from individual contributor to **admin/manager**
- The manager doesn't care about the agent's UI — they care about:
  - What did the agent do?
  - Can I trust it?
  - Can I control it?
- Governance, trust, and visibility are not features — they are the product for this new ICP

### Agent = Employee (The Core Monetization Insight)

The agent is the new employee. The admin is the employer. The platform is where the performance review happens.

- A manager pays for an employee when they see **productivity and achievements** — the exact same logic applies to agents
- The manager will pay for more credits (= more labor) when the agent **proves its worth**
- The activity dashboard is literally the performance review — it's how the "employer" evaluates the "employee"
- Want the admin to pay more? Show them the agent's output. Want them to "hire" more agents? Show them the ROI of the first one
- Credits = salary. Dashboard = performance review. Governance = HR system.

### Pricing Education: How Does the ICP Know How to Pay?

- Credits-based pricing is new for work management buyers
- We need to teach the ICP what they're paying for (work completed, not seats occupied)
- The framing matters: "You're hiring a digital team member" is more intuitive than "You're buying API calls"
- Onboarding and first-use experience must make the value-to-cost connection obvious

---

## 3. Competitive Landscape

### How Others Monetize Agents

| Company | Model | Pricing | Key Insight |
|---------|-------|---------|-------------|
| **Salesforce Agentforce** | Credits (Flex Credits) | $0.10/action, min 100K credits ($500/mo). Add-on: $125/user/mo unlimited. Edition: $550/user/mo with 1M credits | Shifted from $2/conversation to action-based after 90% of CTOs said cost unpredictability limited adoption |
| **ServiceNow Now Assist** | Consumption ("assists") | Per-assist pricing, varies by complexity (1 assist for summarization, 25+ for agentic workflows) | Low transparency — customers struggle to predict costs. Sales-led, not self-serve |
| **Lindy AI** | Credits | Free (400 credits/mo), Pro ($49/mo, 5K credits), Business ($299/mo, 30K credits). Extra: $10/1K credits | Fully self-serve, credits priced by task complexity and model used |
| **HubSpot AI** | Bundled (freemium) | AI baked into free tier, upgrades in paid plans | No separate AI pricing — reduces friction but limits monetization upside |
| **ClickUp AI** | Bundled (freemium) | AI included in free plan with limits | Similar to HubSpot — AI as default, not standalone revenue |

### Market Trends

- **61% of SaaS companies** expected to adopt usage-based or hybrid pricing by 2026
- **40% of enterprise apps** will feature task-specific AI agents by 2026 (up from <5% in 2025)
- Credit wallets are becoming infrastructure — as fundamental as payment processing
- LLM inference costs dropping 9x-900x/year, enabling more competitive pricing
- Hybrid pricing (base fee + usage) is emerging as the recommended model for B2B SaaS

### Key Takeaway

The market is converging on **consumption/credits-based pricing** for agents. The winners are those who make the value-to-cost connection clear and give managers visibility into what they're paying for.

---

## 4. Our Model: Credits-Based

### How It Works

- Agents consume credits when they perform work
- Credit cost scales with task complexity and value delivered
- The agent can request escalation/upgrade when it needs more capacity
- Manager controls the credit budget — they decide how much "labor" to allocate

### Why Credits

- **Aligns cost with value:** Manager pays proportional to work done, not seats filled
- **Scalable:** Works for a team with 1 agent or 100
- **Predictable with control:** Credit budgets give managers spending guardrails
- **Familiar analogy:** "You're allocating a budget for your digital team members"

### Pricing Education Challenge

- Must make it clear what credits buy (tasks completed, not abstract units)
- Show ROI: "This agent completed X tasks this month, equivalent to Y hours of human work"
- Dashboard-driven: the activity dashboard IS the pricing justification

---

## 5. Conversion Levers

### Lever 1: Visibility

The #1 conversion driver. A manager will pay when they **see** the value.

- Agent activity dashboard showing: tasks completed, time saved, quality metrics
- Comparison view: agent output vs. equivalent human effort
- Notifications and reports: "Your agent completed 47 tasks this week"
- The dashboard is not a feature — it's the conversion engine

### Lever 2: Trust & Governance

The ability to convert depends directly on trust. Moving from preview to production requires:

- Permission controls: what can the agent do, what requires approval
- Escalation workflows: agent asks for human review when uncertain
- Audit trail: full history of agent actions and decisions
- The governance layer is not overhead — it IS the product for enterprise buyers

### Lever 3: Quality & Training

Better agents = more usage = more credits purchased.

- Invest in agent training and quality so output is reliable
- Quality feedback loops: manager rates agent work, agent improves
- Domain-specific training: agents that understand the customer's context
- The flywheel: quality → trust → usage → revenue

---

## 6. What We Need to Build

- **Agent Activity Dashboard** — visibility for managers into agent work output and ROI
- **Governance Controls** — permissions, escalation, audit trail, approval workflows
- **Credits System** — consumption tracking, budget controls, usage alerts
- **Pricing Education** — onboarding flow that connects credits to value, in-product ROI calculator
- **Quality/Training Loop** — feedback mechanisms, domain-specific improvement, reliability metrics
- **"Agent as Employee" Framing** — product copy, marketing, and UX that positions agents as team members

---

## 7. Open Questions

- [ ] What are the unit economics of running agents at scale? (cost per task by type)
- [ ] Where is the willingness-to-pay threshold for different customer segments?
- [ ] How do we price credits? Per-action (like Salesforce) or per-task-complexity (like Lindy)?
- [ ] What's the right free tier — how many credits to give away to drive adoption?
- [ ] How do we measure and display "time saved" or "work equivalent" to justify credits?
- [ ] What does the governance MVP look like — minimum viable trust for managers to start paying?
