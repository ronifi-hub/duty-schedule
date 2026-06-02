# Competitive Research: AI Agent Trial Mechanisms & Experience

**Topic:** How competitors structure and deliver AI agent trials  
**Date:** March 16, 2026  
**Context:** Informing trial mechanism and UX design for monday.com platform agents

**Shareable links:**  
- [Rendered presentation (share this)](https://gist.githack.com/ronifi-hub/5c06ecccaf90c810ed3f682ee2ba7ab5/raw/agent-trial-competitive-research.html)  
- [Gist source (edit)](https://gist.github.com/ronifi-hub/5c06ecccaf90c810ed3f682ee2ba7ab5)  
- Local HTML: `monday agents/agent-trial-competitive-research.html`

---

# Part 1: Trial Mechanisms — How They Structure Free Access

## Trial Mechanism Overview

| Company | Trial Mechanism | Pricing Model | Self-Serve |
|---------|----------------|---------------|------------|
| **Notion** | Free 10 weeks (grace period), then credits | $10/1K Notion Credits, complexity-based | Yes |
| **ClickUp** | Trial AI in Free plan; paid AI $7–22/user/mo | Per-seat add-on + Super Credits ($10/10K) | Yes |
| **Airtable** | Credits bundled in all plans (500/editor on Free) | Pooled workspace credits; add-on packs $40–400/mo | Yes |
| **Base44** | Permanent free tier (100 integration credits/mo) | Dual credits (message + integration) | Yes |
| **Salesforce** | Free Dev Org + Foundations ($0) with 250K credits | Flex Credits (~$0.10/action) | Partial |
| **Intercom** | 14-day free trial, no CC required | $0.99/resolution | Yes |
| **Zendesk** | Suite trial + baseline free resolutions | Pay per resolution (outcome-based) | Yes |
| **Microsoft** | Free trial + $200 Azure credits | Copilot Credits or pay-as-you-go | Yes |
| **HubSpot** | Basic AI in Free CRM; full agents at $500+/mo | Tier-gated | Partial |
| **Asana** | Basic on paid plans; Plus at $135/mo for 100K credits | Credits-based | Yes |
| **ServiceNow** | No public trial — contact sales | Custom/negotiated | No |

---

## Five trial patterns (taxonomy)

How competitors map to **credit / trial mechanics**. One product can use **more than one** pattern (e.g. time-boxed trial *and* credits inside it).

| Pattern | What it is | Primary examples (AI / agents / credits) |
|--------|------------|------------------------------------------|
| **1. One-time capped** | A **fixed pool** that **does not reset** on a daily or monthly schedule until the user upgrades, buys, or purchases more. | **Notion** — complimentary AI **responses** until exhausted (each action/`Try again` counts; then upgrade). **Salesforce Foundations** — large **Agentforce Flex** starter grant for POCs (tracked in Digital Wallet; overage after burn). **ClickUp** — workspace **AI trial**: fixed **Brain uses** + **AI Super Credits** cap **until** you buy an add-on (not an ongoing free monthly refresh). |
| **2. Daily usage + free tier** | **Per-day throttle**, often with a **monthly ceiling** on the free/low tier. | **Base44** Free — **5 message credits / day**, **25 / month**; paid plans reset monthly. (Integration credits are separate; runtime agents/LLM use integration credits.) |
| **3. Time-boxed** | Access (or a specific plan) is bounded by **calendar time**, independent of whether metering is also credit-based. | **Intercom** — **14-day** trial, no card. **Salesforce** — standard CRM **30-day** trial (separate from Foundations credit wallet). **Airtable** — **Team plan trial** includes a **time-limited** evaluation with **different** monthly AI credit rules (e.g. **7,500** credits per editor during trial per support docs). |
| **4. Outcome-based** | Price or trial story ties to a **delivered outcome** (resolution, deflection, etc.), not just seats or raw generations. | **Zendesk** — **pay per resolution** (CX narrative). **Intercom** — AI agent **per-resolution** commercial model (alongside time-boxed trial for the product). |
| **5. Dev sandbox** | **Free isolated** org/environment to **build and test** agents without production billing. | **Salesforce** — **Agentforce Developer Edition** / dev orgs for prototyping (technical eval, not end-user PLG). |

### Outside these five (still common)

- **Recurring monthly included credits (ongoing packaging, not a “trial type” by itself):** **Airtable** (pooled monthly AI credits per plan; expire at period end), **HubSpot** (monthly **HubSpot Credits** bundled on **Pro/Enterprise** for **Breeze Customer Agent**). This is **how they monetize after** adoption, analogous to “always-on” caps rather than a one-time taste.
- **Tier-gated agents:** **ClickUp** Super Agents / higher bundles, **Asana** AI credit SKUs, **HubSpot** higher hubs — **distribution** choice more than credit *trial* pattern.
- **Launch free, charge later (grace period):** **Notion**-style **time-limited free access to a feature** before credits bill — overlaps **time-boxed** + **one-time/complimentary** perception; treat as a **GTM layer** on top of patterns 1 or 3.

### Quick reference — where each competitor sits

| Company | Strongest fit(s) | Notes |
|---------|------------------|--------|
| **Base44** | **2** (daily + free tier) | Dual credit types; free tier is explicitly daily-capped. |
| **Notion** | **1** | Complimentary responses = non-resetting pool until paid plan. |
| **Salesforce** | **1**, **3**, **5** | Foundations flex grant (1); standard trials (3); dev org (5). |
| **ClickUp** | **1** (pre-purchase trial bucket) | Trial uses + Super Credits until add-on; paid = monthly Super Credits. |
| **Airtable** | **3** (on paid/Team **trial**); **recurring monthly** otherwise | Free/Team/Business = **monthly** pooled credits — not “one-time” and not “daily.” |
| **HubSpot** | **recurring credits on paid** | Pro/Enterprise monthly credits for Customer Agent; not a classic free AI-agent trial. |
| **Intercom** | **3**, **4** | Time-boxed trial + outcome-priced agent. |
| **Zendesk** | **4** | Outcome-based resolutions. |
| **Microsoft** | **1**, **3** | Azure / Copilot promos often **one-time credit** or **time-bound** trials (varies by SKU). |

**Screenshots (pricing / help):** `Knowledge/Research/agent-trial-mechanisms/screenshots/` (Salesforce marketing pages often block automated capture; use manual browser for Salesforce UI).

---

## Key Market Trends

1. **Per-seat → usage/outcome pricing.** Salesforce, Zendesk, Intercom align cost with value delivered, not headcount.
2. **Credits are the universal currency.** Notion, ClickUp, Airtable, Salesforce, Microsoft, Base44 — every competitor uses credits.
3. **Self-serve trial is table stakes.** ServiceNow is the only outlier with zero self-serve.
4. **Grace periods are the new trial.** Notion (free 10 weeks) and HubSpot launched features free and turned on pricing later. Dominant in work management.
5. **Work management platforms bundle AI into existing plans.** Airtable, ClickUp, Notion embed credits in tiers — agents aren't a separate product.
6. **"Aha moment" before paywall is critical.** Best trials guarantee users experience real agent value before asking for money.

---

## Implications for monday.com

### Opportunities
- **Notion's grace period is the #1 playbook.** Same category, same buyer, launched 3 weeks ago. Free 10 weeks, then credits.
- **Bundled credits = emerging standard.** Embedding AI credits in existing tiers feels natural and avoids friction of separate purchase.
- **Outcome-based pricing is unclaimed in work management.** If monday.com can define a clear outcome unit, this differentiates.
- **Dual credits solve transparency.** Separating conversation from action credits (Base44's model) helps users understand costs.

### Risks
- **Notion sets the expectation.** 10 weeks free — anything less looks stingy.
- **Stacking agent cost on seat cost kills adoption.** ClickUp's $22/user/mo on top of base pricing adds up fast.
- **Pooled credits need governance.** One power user burning team credits is a real complaint (Airtable).
- **Billing cliff = #1 conversion risk.** Abrupt cutoff when credits expire is the worst UX.

### Strategic Questions
1. **Grace period or usage-capped from day one?** Grace period delays revenue but maximizes adoption.
2. **What's the credit unit?** Needs to map to user-perceived value — not raw tokens.
3. **Bundled or add-on?** Where do agents sit in monday's plan hierarchy?
4. **Per-seat or per-workspace credits?** Fundamentally affects how teams adopt and budget.
5. **What's the degradation model?** When credits run out, what happens?

---

# Part 2: Trial Experience — What Users Actually See and Do

## The Agent Trial Journey — 5 Stages

We analyzed 11 competitors across 5 stages of the trial experience: **Discovery → First Setup → Using the Agent → Hitting Limits → Conversion Moment**.

---

## Stage 1: Discovery — How Users Find Agents

| Company | Discovery Entry Point | Friction to Start |
|---------|----------------------|-------------------|
| **Notion** | Agents surface as a new section in the sidebar; launch blog + in-app announcement | Very low — visible to all Business/Enterprise users immediately |
| **ClickUp** | "Brain" icon in sidebar; agents appear as workspace-level feature | Low — visible in free plan, but Super Agents gated behind paid AI add-on |
| **Airtable** | "Build a field agent" appears as a field type when adding columns to a table | Very low — integrated into existing workflow (adding fields), not a separate product |
| **Base44** | "Agents" section in app dashboard; toggle to enable | Low — available on free plan, 2-click enable |
| **Intercom** | "Fin AI Agent" section in main nav; dedicated setup wizard | Low — clear entry, but requires content setup before agent works |
| **Salesforce** | "Agent Builder" in Setup menu; guided Trailhead learning path | Medium — requires navigating Salesforce Setup, Einstein enablement first |
| **Zendesk** | AI agents surfaced during Suite trial setup wizard | Low — presented as part of platform onboarding, not a separate discovery step |

**Key pattern:** The best experiences don't make agents a separate product to discover. Airtable embeds agents into the field creation flow. Notion adds them to the sidebar. The worst experiences (Salesforce) require navigating settings menus and enabling prerequisites first.

---

## Stage 2: First Setup — Creating Your First Agent

### Notion Custom Agents
- **Setup method:** Conversational — describe what you want the agent to do in natural language, and it writes its own instructions and wires up tools
- **Time to first agent:** Minutes — "as simple as writing a short job description and chatting with it"
- **Configuration:** Agent auto-generates instructions, tool connections, and triggers. User can refine via chat.
- **Triggers:** Schedule-based (daily, weekly) or event-based (Slack message, database change, email)
- **Connected tools:** Notion, Slack, Mail, Calendar, Figma, Linear, custom MCP servers
- **Templates:** Pre-built agent templates available + Notion Academy course
- **Key UX choice:** The agent builds itself from a description. User doesn't configure fields — they describe intent.

### ClickUp Brain / Super Agents
- **Setup method:** Conversational + guided framework
- **Time to first agent:** 15-30 minutes for a meaningful agent
- **Configuration:** 6-step deliberate process — choose workflow, decide agent type (Super Agent vs Autopilot), define scope, set permissions, choose knowledge sources, pick rollout model
- **Recommended approach:** Start with one specific workflow, sandbox → pilot → scale
- **Key UX choice:** More structured than Notion — ClickUp pushes users to think through scope and permissions before deploying. Feels more "enterprise" but adds friction.

### Airtable Field Agents
- **Setup method:** Inline — create an agent as a field within a table
- **Time to first agent:** Under 5 minutes
- **Configuration:** Click (+) to add field → select "Build a field agent" → name it → choose field type (text, number, select, etc.) → write prompt instructions → enable options like "internet search" and "run automatically"
- **Key UX choice:** Agents live inside your data, not as a separate feature. You're adding an "AI column" to your table. This is the lowest friction approach — no separate agent builder, no configuration wizard.

### Base44
- **Setup method:** Dashboard toggle + conversational
- **Time to first agent:** Under 5 minutes
- **Configuration:** Go to Dashboard → Click Agents → Toggle on → Use AI chat to describe the agent's role. Customize via 4 panels: Guidelines (behavior/persona/model), Tools (data access), Memory (cross-conversation recall), WhatsApp (channel connection)
- **Key UX choice:** Suggests starting prompts like "Build me a task manager with an AI assistant" — gives users a mental model of what's possible.

### Intercom Fin
- **Setup method:** 4-stage wizard — Train → Test → Deploy → Analyze (the "Fin Flywheel")
- **Time to first agent:** 30-60 minutes (content setup required)
- **Configuration:** Add support content (FAQs, guides) → Configure behavior with natural language guidance → Define multi-step tasks → Test in preview → Deploy across channels
- **Key UX choice:** Testing before deployment is built into the flow. Preview panels let you simulate conversations before going live. More guided than others, but requires content prep upfront.

### Salesforce Agentforce
- **Setup method:** Agent Builder in Setup menu
- **Time to first agent:** 20+ minutes (Trailhead guided path), longer without guidance
- **Configuration:** Enable Einstein → optionally enable Data Cloud → open Agent Builder → configure agent topics, actions, and knowledge sources
- **Key UX choice:** Trailhead provides a structured learning path to build your first agent. The guided experience helps, but the prerequisite steps (Einstein enablement, Data Cloud setup) add friction before you even start building.

**Key pattern:** The lowest friction experiences (Airtable, Base44, Notion) let users describe what they want in natural language and get a working agent in minutes. The highest friction (Salesforce, ClickUp) require prerequisite steps and structured configuration. Intercom sits in the middle — guided but requires content preparation.

---

## Stage 3: Using the Agent — What the Experience Feels Like

### How Agents Run

| Company | How Agent Runs | Visibility Into Actions | User Control |
|---------|---------------|------------------------|--------------|
| **Notion** | Background — scheduled or triggered. Runs autonomously 24/7 | Logged runs showing trigger, actions taken, and credit usage per run | Pause/resume, undo any change, detailed permissions |
| **ClickUp** | Within workspace — responds to triggers or user requests | Action logging with enterprise audit trail | Granular permissions, stop conditions, scope limits |
| **Airtable** | Inline — generates content in table cells, can run automatically per row | Visible in-cell — you see the output right in your data | Manual "Generate" button or auto-run toggle |
| **Base44** | Chat interface — responds to user messages within app | Conversation history with memory across sessions | Model selection (GPT/Claude/Gemini), tool access controls |
| **Intercom** | Customer-facing — handles support conversations across channels | AI-powered analytics dashboard; resolution tracking | Brand voice guidance, escalation rules, task definitions |
| **Salesforce** | Within CRM workflows — handles cases, leads, coaching | Trust Layer monitoring, action logs | Topic/action configuration, guardrails |

### What Stands Out

- **Notion agents run in the background** — users don't interact with them directly. They set them up and agents work autonomously (answering Slack questions, routing tasks, compiling reports). Users check results in Notion pages and the usage dashboard.
- **Airtable agents are inline** — they feel like smart spreadsheet formulas, not chatbots. You see outputs in cells alongside your data. This makes the value immediately visible.
- **Base44 agents are conversational** — classic chat interface. Users talk to agents who can take actions on backend data. Memory feature lets agents remember context across conversations.
- **Intercom Fin is customer-facing** — users don't interact with the agent themselves. They configure it and then customers interact with it. The user monitors performance via dashboards.

---

## Stage 4: Hitting Limits — What Happens When the Trial Runs Out

| Company | What Happens | User Experience | Warning System |
|---------|-------------|-----------------|----------------|
| **Notion** | Agents **pause at next monthly service date** — never mid-workflow | Graceful — current runs complete, agents stop at billing cycle boundary | Proactive alerts as credits approach limit; usage dashboard shows real-time consumption |
| **ClickUp** | Falls back to **limited free AI access**; Super Agent features disabled | Degraded — basic AI still works, advanced agents stop | Credit balance visible; in-product notifications |
| **Airtable** | Can **buy more credits instantly** in-product; agents stop generating if no credits | Moderate — need to purchase but process is instant; no abrupt mid-cell cutoff | Credit usage logs; workspace-level monitoring |
| **Base44** | **Hard stop until monthly reset** — credits don't roll over | Abrupt — agents stop responding until next month or upgrade | Credit counter visible; per-model cost shown |
| **Intercom** | **Seamless transition to paid** — $0.99/resolution after 14-day trial ends | Smooth — no disruption; billing starts automatically (CC required at some point) | Trial countdown; resolution tracking |
| **Salesforce** | **Switches to pay-as-you-go** from free credits | Smooth — no disruption for users with billing set up | Credit dashboard; Flex Credit balance tracking |

**Key pattern:** The best degradation experiences (Notion, Intercom, Salesforce) never interrupt active work. Notion's "pause at next service date" is the gold standard — agents finish their current runs, then stop cleanly at the billing boundary. Base44's hard stop is the worst UX — agents just go silent.

---

## Stage 5: Conversion Moment — How They Ask for Money

| Company | Conversion Trigger | Conversion UX |
|---------|-------------------|---------------|
| **Notion** | Grace period ends May 4; usage dashboard builds awareness throughout free period | Admin purchases credits from in-product dashboard. Agents resume automatically once credits are added. No sales call required for self-serve. |
| **ClickUp** | User hits AI trial limits; sees Super Agent features locked | Upsell prompts within AI interface. Upgrade path: $7 Brain AI → $22 Everything AI per user. Clear tier comparison. |
| **Airtable** | Credits depleted; agent fields stop generating | "Buy more credits" prompt in-product. Pre-set credit packs from $40/mo. Instant purchase, agents resume immediately. |
| **Base44** | Monthly credits exhausted; agents stop responding | Upgrade prompt to Starter ($20/mo) or higher. Plan comparison shown. Monthly reset gives a natural "try again" window. |
| **Intercom** | 14-day trial ends | Automatic billing starts if CC on file. If no CC, prompts payment setup. Resolution-based billing means cost scales with actual usage. |
| **Salesforce** | Free credits exhausted | Flex Credit purchase or pay-as-you-go setup. Account team engagement for larger deployments. |

**Key pattern:** The smoothest conversion (Intercom, Salesforce) requires no user action — billing just starts. The most user-controlled (Notion, Airtable) let admins decide when and how much to buy. ClickUp's tiered upsell adds decision complexity.

---

## Cross-Competitor Experience Comparison

| Dimension | Notion | ClickUp | Airtable | Base44 | Intercom |
|-----------|--------|---------|----------|--------|----------|
| **Time to first agent** | Minutes | 15-30 min | Under 5 min | Under 5 min | 30-60 min |
| **Setup method** | Conversational (describe intent) | Guided 6-step framework | Inline (add field to table) | Toggle + chat | 4-stage wizard |
| **Agent paradigm** | Background autonomous | Workspace assistant | Smart data field | Chat interface | Customer-facing bot |
| **Visibility of value** | Async — check results later | Within task context | Immediate — in-cell output | Real-time chat | Dashboard metrics |
| **Limit experience** | Pause at billing boundary | Degrade to basic AI | Buy more instantly | Hard stop | Auto-bill |
| **Admin controls** | Permission controls, usage dashboard, undo | Granular permissions, audit trail | Workspace-level credit monitoring | Model/tool selection | Brand voice, escalation rules |
| **Standout UX feature** | Agent writes its own instructions | Deliberate rollout framework | No separate agent builder | Model cost transparency | Test before deploy |

---

## Key Experience Insights for monday.com

### What the best trial experiences get right

1. **Agent builds itself from intent.** Notion's approach — describe what you want, agent generates its own config — is the lowest friction and most magical. Users don't configure; they describe.

2. **Value is visible immediately.** Airtable shows agent output inline in cells. You don't have to go somewhere to check results. The value is right where you're working.

3. **Testing before deployment is underrated.** Intercom's preview panel and test mode give users confidence. For agents that take real actions (updating records, sending messages), a "dry run" mode matters.

4. **Graceful degradation > hard cutoff.** Notion pauses at billing boundary with proactive warnings. Base44 just stops. For users who built dependency on agents during trial, abrupt cutoff feels like a punishment.

5. **Usage transparency builds trust.** Notion's credit dashboard during the free period is smart — users can see what agents cost before they pay. This removes the "surprise bill" fear.

### What they get wrong

1. **Prerequisite steps kill momentum.** Salesforce requires enabling Einstein and Data Cloud before you can even open Agent Builder. Every prerequisite step is a dropout point.

2. **No guidance on what to build first.** Most platforms drop users into an agent builder without suggesting a starting use case. Base44's starter prompts and Intercom's templates are exceptions.

3. **Background agents lack immediate feedback.** Notion agents run async — you set them up and wait for results. For a trial, this means the "aha moment" is delayed. Users need to check back later to see if it worked.

4. **Configuration complexity varies wildly.** ClickUp's 6-step setup feels enterprise-grade but adds friction for a first-time user. Airtable's "add a field" approach is at the opposite extreme — almost too simple to feel powerful.

---

## Recommended UX Principles for monday.com Agents Trial

1. **Let users describe, not configure.** Follow Notion's lead — conversational agent creation where the user states intent and the agent generates its own setup.

2. **Show value inline, not in a dashboard.** Follow Airtable's lead — agent outputs should appear where users already work (boards, items, columns), not in a separate agent dashboard.

3. **Include a "try it now" dry run.** Follow Intercom's lead — let users preview what an agent would do before it runs for real. Especially critical for agents that modify data.

4. **Provide a starter use case.** Don't just open a blank agent builder. Suggest the first agent based on the user's board structure, most common workflows, or most repetitive tasks.

5. **Never interrupt active work.** Follow Notion's degradation model — agents finish current runs and pause at billing boundary. Show warnings well before limits are hit.

6. **Make usage visible from day one.** Show a credit/usage dashboard during the free period so users can forecast costs and feel in control — not surprised when billing starts.

---

## Sources
- https://www.notion.com/help/custom-agent-pricing
- https://www.notion.com/blog/introducing-custom-agents
- https://www.notion.com/releases/2026-02-24
- https://consultevo.com/clickup-ai-agents-setup-guide-6/
- https://consultevo.com/clickup-ai-agents-guide-2/
- https://clickup.com/solutions/ai-agent-builder
- https://support.airtable.com/docs/using-airtable-ai-in-fields
- https://tinkeringwithideas.io/airtable-field-agent/
- https://docs.base44.com/Building-your-app/AI-agents
- https://docs.base44.com/Getting-Started/ai-agent
- https://www.intercom.com/help/en/articles/10742658-navigating-fin-from-setup-to-deploy
- https://www.intercom.com/help/en/articles/7837514-add-your-support-content-for-fin-ai-agent
- https://www.salesforceben.com/how-to-get-started-with-agentforce-for-free/
- https://support.zendesk.com/hc/en-us/articles/9748832324634
