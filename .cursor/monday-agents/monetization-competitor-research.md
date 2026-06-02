# Agentic AI Monetization: Competitor Research

**Date:** February 25, 2026  
**Author:** Research for Roni (PM, monday.com)  
**Purpose:** Inform monday.com's agentic product monetization strategy (Vibe, Sidekick, Agents)

---

## Executive Summary

The agentic AI monetization landscape is rapidly evolving. The industry is shifting away from simple seat-based models toward **usage-based and outcome-based pricing** that aligns cost with value delivered. Three dominant patterns have emerged: (1) per-resolution/conversation pricing for customer-facing agents, (2) credit/token consumption models for general-purpose AI, and (3) bundling AI into higher tiers to drive upsell. The most innovative model — Zendesk's outcome-based pricing — only charges when AI actually resolves an issue, setting a new standard for value alignment.

---

## Competitor Comparison Table

| Company | Pricing Model | Price Point | Free Tier | AI Included In | What Costs Extra |
|---------|--------------|-------------|-----------|----------------|-----------------|
| **Salesforce Agentforce** | Hybrid: Usage (per-conversation OR per-action credits) + seat add-on | $2/conversation OR $0.10/action (Flex Credits); $125-150/user/mo add-on | 1,000 free conversations via Foundations | Requires Salesforce platform; sold separately | Higher tiers ($550/user/mo for Agentforce 1 Edition); voice actions |
| **ServiceNow Now Assist** | Consumption-based ("assists") + seat add-on | Not publicly disclosed; per-assist pricing varies by complexity | None publicly stated | Requires Pro Plus/Enterprise entitlement on base modules | Module-specific agents (ITSM, HRSD, CSM); higher complexity = more assists consumed |
| **HubSpot Breeze** | Credit-based (usage) | $10/1,000 credits (~$1/conversation for Customer Agent) | 3K-5K credits/mo included with Pro/Enterprise | Requires Professional or Enterprise Hub | Additional credit packs; Prospecting Agent credits |
| **Notion AI** | Bundled into higher tiers | $20/user/mo (Business) includes unlimited AI | 20 AI responses trial on Free/Plus | Business & Enterprise plans only | No standalone AI add-on anymore (discontinued $8/user/mo add-on) |
| **Asana AI** | Bundled + credit add-on | AI included in Starter ($10.99/user/mo); AI Studio credits extra | Basic AI Studio auto-provisioned | All paid plans (Starter and above) | AI Studio Plus and Pro tiers; additional credits for advanced usage |
| **Intercom Fin** | Pure usage-based (per-resolution) | $0.99/resolution flat rate | 14-day free trial | All plans (requires at least 1 paid seat at $29-132/mo) | No volume discounts; minimum 50 resolutions/mo for standalone |
| **Zendesk AI Agents** | Outcome-based (per-automated-resolution) with volume tiers | $1.00-$1.50/resolution (volume-dependent); $2.00 overage | 5-15 ARs/agent/mo included by plan | All Suite/Support plans | Advanced AI add-on ($50/agent/mo for Copilot); QA ($35); WFM ($25) |

---

## Pricing Model Categories

### 1. Pure Usage-Based / Per-Resolution
**Companies:** Intercom, Zendesk

These companies charge based on outcomes — you only pay when the AI agent successfully resolves a customer issue.

- **Intercom Fin**: Flat $0.99/resolution with no volume discounts. Simple, transparent, but costs scale linearly. A company with 2,000 monthly resolutions pays ~$24K/year just for Fin.
- **Zendesk AI Agents**: Tiered volume pricing ($1.00-$1.50/resolution) with included baseline per plan. More sophisticated than Intercom with volume incentives.

**Key insight:** Outcome-based pricing is the strongest value alignment — customers only pay for successful results. But it can create cost anxiety at scale.

### 2. Credit/Token Consumption Model
**Companies:** Salesforce (Flex Credits), HubSpot (Breeze Credits), ServiceNow (Assists)

These companies use an abstracted "credit" currency that is consumed by various AI actions at different rates.

- **Salesforce Flex Credits**: $500/100K credits ($0.005/credit), 20 credits per action = ~$0.10/action. Most flexible — credits work across all agent types and actions.
- **HubSpot Breeze Credits**: $10/1K credits ($0.01/credit), 100 credits per conversation = ~$1/conversation. Simpler credit math.
- **ServiceNow Assists**: Consumption unit varies by skill complexity (1 assist for simple tasks, 25+ for complex agentic workflows). Pricing not publicly disclosed.

**Key insight:** Credits provide flexibility to monetize across multiple AI use cases with a single currency, but add cognitive overhead for customers trying to predict costs.

### 3. Bundled into Higher Tiers (Upsell Driver)
**Companies:** Notion, Asana

These companies use AI as the primary reason to upgrade to more expensive plans.

- **Notion**: Eliminated standalone $8/mo AI add-on. AI now only available with Business ($20/user/mo) or Enterprise plans. Forces a ~2x price jump from Plus ($10/user/mo) to access AI.
- **Asana**: AI included in all paid plans, but advanced AI Studio capabilities require additional credit purchases. Gentler approach — basic AI is broadly available.

**Key insight:** Bundling AI drives ARPU growth and simplifies the pricing page. Notion's aggressive move signals confidence that AI is now a core expected feature, not a premium add-on.

### 4. Hybrid (Multiple Models Available)
**Companies:** Salesforce

Salesforce uniquely offers **two pricing models** customers can choose from (but not use simultaneously):
- Per-conversation ($2/conversation) — simpler, predictable for customer-facing agents
- Flex Credits ($0.10/action) — more granular, works for all agent types

Plus seat-based add-ons ($125-150/user/mo) and full editions ($550+/user/mo).

**Key insight:** Offering choice acknowledges that different customers have different usage patterns and preferences. But complexity can slow sales cycles.

---

## Detailed Competitor Profiles

### 1. Salesforce Agentforce

**Model:** Hybrid (usage-based + seat add-ons)

**Pricing tiers:**
- **Free (Foundations):** 200K Flex Credits + Prompt Builder + Agent Builder
- **Flex Credits:** $500/100K credits (~$0.10/action at 20 credits per action)
- **Per-Conversation:** $2/conversation (24-hour window)
- **Agentforce Add-on:** $125/user/mo (unlimited employee-facing agent usage)
- **Industries Add-on:** $150/user/mo (industry-specific AI)
- **Agentforce 1 Edition:** From $550/user/mo (full platform)
- **User License:** $5/user/mo (metered access for all employees, requires Flex Credits)

**What's included vs. extra:**
- Included: Agent Builder, Prompt Builder, Digital Wallet monitoring
- Extra: Voice capabilities, industry-specific agents, unlimited employee usage

**Key insight for monday.com:** Salesforce's $5/user/mo "Agentforce User License" is notable — it provides a low-cost entry point to give every employee basic agent access, while monetizing heavy usage through credits. Monday.com could consider a similar "light agent access" tier for broad organizational adoption.

---

### 2. ServiceNow Now Assist / AI Agents

**Model:** Consumption-based (assists) + module licensing

**Pricing approach:**
- Consumption measured in "assists" — one unit per skill action
- Complexity-based: simple actions = 1 assist; complex agentic workflows = 25+ assists
- Requires Pro Plus or Enterprise Plus entitlement on base module (ITSM, HRSD, CSM)
- Pricing not publicly disclosed — varies by negotiation

**What's included vs. extra:**
- Included with Pro Plus/Enterprise: Base Now Assist capabilities
- Extra: Module-specific agents require corresponding module license; AI Agents require specific platform version

**Key insight for monday.com:** ServiceNow's opacity on pricing is a competitive weakness. Being transparent with pricing (as monday.com already tends to be) is a market differentiator, especially vs. enterprise competitors. However, ServiceNow's model of tying AI to existing module licenses ensures AI revenue compounds on top of existing platform revenue.

---

### 3. HubSpot Breeze AI Agents

**Model:** Credit-based (usage) with Pro/Enterprise gating

**Pricing:**
- $10/1,000 credits
- Customer Agent: 100 credits/conversation (~$1/conversation)
- Prospecting Agent: 100 credits/monitored contact/month
- Data Agent: 10 credits/prompt
- Workflow actions: 10 credits/action
- Pro customers: 3,000 credits/mo included
- Enterprise customers: 5,000 credits/mo included

**What's included vs. extra:**
- Included: Breeze Assistant with Core Seats; monthly credit allowance
- Extra: Additional credit packs; Professional/Enterprise Hub required for agents

**Key insight for monday.com:** HubSpot's approach of including a meaningful credit allowance (3K-5K/mo) with existing plans reduces friction for trial. The credit system also enables monetization across different AI capabilities (support, prospecting, data, content) with a unified currency. This is relevant for monday.com's diverse AI features across workflows, sales, service, and dev products.

---

### 4. Notion AI

**Model:** Bundled into higher tiers

**Pricing:**
- Free/Plus plans: 20 AI responses (one-time trial, not monthly)
- Business: $20/user/mo (annual) — unlimited AI included
- Enterprise: Custom pricing — unlimited AI included
- Former $8/user/mo add-on discontinued for new customers (May 2025)

**What's included vs. extra:**
- Included in Business/Enterprise: Unlimited AI chat, generation, autofill, Agent, Enterprise Search, Meeting Notes
- Free/Plus: Only a tiny trial (20 responses total)

**Key insight for monday.com:** Notion's decision to eliminate the standalone AI add-on and force users onto Business plans is bold but effective for ARPU. It essentially makes AI the #1 reason to upgrade. However, the sharp cutoff (20 responses total on free/Plus vs. unlimited on Business) may feel punitive. A more graduated approach could reduce churn risk.

---

### 5. Asana AI

**Model:** Bundled (base AI) + credit add-on (advanced AI Studio)

**Pricing:**
- Personal (Free): No AI
- Starter ($10.99/user/mo): Asana AI + AI Studio Basic included
- Advanced ($24.99/user/mo): Enhanced AI + AI Studio with higher credit allowances
- Enterprise/Enterprise+: Contact sales — full AI suite
- AI Studio Plus/Pro: Paid add-ons with additional credits (annual purchase required)

**What's included vs. extra:**
- Included: Smart chat, smart editor, smart fields, smart summaries, risk reports (varies by tier)
- Extra: AI Studio Plus/Pro tiers, additional credit purchases, autonomous agents at higher tiers

**Key insight for monday.com:** Asana's graduated approach is the most customer-friendly among competitors. AI is available starting at the lowest paid tier ($10.99), with progressively more advanced capabilities at higher tiers. This reduces barrier to entry while still providing upsell paths. Most directly comparable to monday.com's market position.

---

### 6. Intercom Fin AI Agent

**Model:** Pure usage-based (per-resolution)

**Pricing:**
- $0.99/resolution (flat, no volume discounts)
- Requires at least 1 paid seat: Essential ($29/mo), Advanced ($85/mo), or Expert ($132/mo)
- Standalone Fin (on Zendesk/Salesforce): $0.99/resolution, minimum 50 resolutions/mo
- Copilot add-on: $29/agent/mo for unlimited usage

**What's included vs. extra:**
- Included: Fin AI Agent access on all plans; 14-day free trial
- Extra: Per-resolution charges; Copilot; Proactive Support Plus ($99/mo)

**Key insight for monday.com:** Intercom's model is the simplest and most transparent in the market. $0.99/resolution is easy to understand and budget for. The "Fin Million Dollar Guarantee" (guaranteeing ROI) is a strong go-to-market move that reduces buyer risk. For monday.com's Sidekick/Agent products, a similar guarantee or SLA could accelerate adoption. However, the lack of volume discounts may push high-volume customers to competitors.

---

### 7. Zendesk AI Agents

**Model:** Outcome-based (per-automated-resolution) with volume tiers

**Pricing:**
- Included ARs by plan: Team (5/agent/mo), Professional/Growth (10/agent/mo), Enterprise (15/agent/mo)
- Additional ARs by volume:
  - 1-100: $1.50/AR
  - 101-1,000: $1.30/AR
  - 1,001-5,000: $1.10/AR
  - 5,001+: $1.00/AR
  - Overage: $2.00/AR
- Advanced AI add-on: Copilot ($50/agent/mo), QA ($35/agent/mo), WFM ($25/agent/mo)
- Suite + Copilot bundle: Professional ($155/agent/mo), Enterprise ($209/agent/mo)

**What's included vs. extra:**
- Included: AI agent access + baseline ARs on all plans
- Extra: Additional ARs beyond baseline; Copilot, QA, WFM add-ons

**Key insight for monday.com:** Zendesk's volume-tiered outcome pricing is the most sophisticated model in the market. It rewards scale, includes a free tier to reduce adoption friction, and only charges for successful outcomes. The tiered pricing also gives Zendesk a competitive advantage over Intercom's flat-rate model at high volumes. For monday.com, consider a similar tiered approach that rewards larger customers.

---

## Industry Trends & Patterns

### 1. The Shift from Seats to Outcomes
The most significant trend is the movement away from per-seat licensing toward usage/outcome-based pricing for AI features. Salesforce, Zendesk, and Intercom all charge based on what the AI actually does, not how many people have access to it. This reflects a fundamental truth: AI agents don't occupy seats — they perform actions.

### 2. The "Digital Labor" Framing
Salesforce is leading the narrative positioning AI agents as "digital labor" — a new category of worker that should be priced differently from human seats. This framing justifies usage-based pricing and positions AI spending as labor cost replacement rather than software cost addition.

### 3. Free Tiers Are Standard
Every competitor offers some form of free AI access — whether it's Salesforce's 1,000 conversations, Zendesk's per-plan ARs, or Notion's 20-response trial. The consensus is that trial/free usage is essential for adoption. The question is how generous to be.

### 4. Credits as Universal Currency
Multiple competitors (Salesforce, HubSpot, Asana) are converging on "credit" systems that abstract away the underlying AI costs. Credits allow a single billing mechanism across diverse AI capabilities and provide flexibility as new features launch.

### 5. The Add-on vs. Bundle Tension
The industry is split between two philosophies:
- **Bundle camp** (Notion, Asana): AI is the product differentiator; include it in plans to drive upgrades
- **Add-on camp** (Salesforce, Zendesk, Intercom): AI is a distinct value stream; price it separately to capture incremental revenue

The trend is moving toward bundling base AI capabilities while charging separately for advanced/agentic features.

### 6. Transparency as Competitive Advantage
ServiceNow's pricing opacity is increasingly a weakness. Intercom's radical transparency ($0.99 flat rate) and Zendesk's published volume tiers are winning customer trust. Transparent pricing reduces sales friction and accelerates adoption.

---

## Top 3 Strategic Recommendations for monday.com

### Recommendation 1: Adopt a Hybrid Model — Bundled Base AI + Usage-Based Agents

**What:** Include foundational AI features (smart suggestions, summaries, content generation) in all paid plans to drive platform stickiness. Price autonomous agent actions (Sidekick, Vibe Agents) on a credit/usage basis.

**Why:** This follows the emerging industry consensus while playing to monday.com's strengths. Bundling base AI differentiates paid plans and drives upgrades (like Notion/Asana). Usage-based agent pricing captures the high-value agentic workloads without limiting adoption (like Salesforce/HubSpot).

**How it could work:**
- Standard/Pro/Enterprise plans include AI assistant features (like Asana's approach)
- Introduce "monday AI Credits" consumed by agent actions (workflow automation, data analysis, content creation)
- Include a meaningful monthly credit allowance per plan tier (e.g., 1K/3K/10K credits)
- Additional credits available in packages ($10/1K credits, similar to HubSpot)

### Recommendation 2: Price Customer-Facing Agents on Outcomes, Not Actions

**What:** For monday.com Service (or any customer-facing agent product), adopt outcome-based pricing similar to Zendesk — charge per successful resolution, not per interaction or seat.

**Why:** Outcome-based pricing is the strongest value alignment in the market. It eliminates buyer risk ("what if the AI doesn't work well?"), aligns monday.com's incentive with the customer's, and creates a self-reinforcing loop: better AI = more resolutions = more revenue. Both Zendesk and Intercom validate this model at scale.

**How it could work:**
- Include baseline resolutions per plan (e.g., 10/agent/mo)
- Volume-tiered pricing for additional resolutions ($0.75-$1.25/resolution, undercutting Intercom's $0.99)
- "Resolution Guarantee" marketing — only pay for successful outcomes
- Dashboard for tracking resolution rates and ROI

### Recommendation 3: Offer a $5/User "Agent Access" License for Organization-Wide Adoption

**What:** Create a low-cost license (inspired by Salesforce's $5/user/mo Agentforce User License) that gives every employee in an organization access to AI agent capabilities within monday.com, with usage metered through credits.

**Why:** The biggest challenge in AI monetization is driving adoption breadth. A $5/user license makes it easy for champions to roll out AI across entire organizations, dramatically increasing the user base and creating expansion opportunities. This is especially powerful for monday.com's horizontal Work OS positioning — AI shouldn't be locked to power users.

**How it could work:**
- $5/user/mo "monday AI Access" license for light users
- Includes basic AI chat, smart suggestions, and limited agent interactions
- Heavy usage metered through credit consumption
- Natural upgrade path to full seats as users discover value
- Positions monday.com as the most accessible AI work platform

---

## Pricing Sensitivity Analysis

| Monthly Volume | Intercom | Zendesk (est.) | Salesforce (Flex) | HubSpot |
|---------------|----------|----------------|-------------------|---------|
| 100 resolutions | $99 | $150 | $30 (3 actions/conv) | $100 |
| 500 resolutions | $495 | $570 | $150 | $500 |
| 1,000 resolutions | $990 | $1,100 | $300 | $1,000 |
| 5,000 resolutions | $4,950 | $5,200 | $1,500 | $5,000 |
| 10,000 resolutions | $9,900 | $10,000 | $3,000 | $10,000 |

*Note: Salesforce Flex Credits are significantly cheaper per-action but measure actions (not full resolutions), so a single resolution may consume multiple actions. Effective cost depends on agent complexity.*

---

## Screenshots

Due to browser security restrictions in this environment, pricing page screenshots could not be captured directly. The following URLs were used as primary sources and can be screenshotted manually:

1. **Salesforce Agentforce**: https://www.salesforce.com/agentforce/pricing/
2. **ServiceNow Now Assist**: No public pricing page (contact sales model)
3. **HubSpot Breeze**: https://www.hubspot.com/pricing + https://knowledge.hubspot.com/account-management/understand-hubspot-credits-and-billing
4. **Notion AI**: https://www.notion.com/pricing
5. **Asana AI**: https://asana.com/pricing
6. **Intercom Fin**: https://www.intercom.com/pricing
7. **Zendesk AI Agents**: https://www.zendesk.com/pricing/

---

## Sources

- Salesforce Agentforce Pricing Page (salesforce.com/agentforce/pricing/)
- Salesforce Flex Credits Press Release (May 2025)
- UpperEdge: ServiceNow Now Assist Consumption-Based Licensing Analysis
- ServiceNow Community Forums (Now Assist pricing discussions)
- HubSpot Credits & Billing Knowledge Base
- Resolve247: HubSpot AI Agent Pricing Explained
- Notion Help Center: 2025 Pricing Changes
- CheckThat.ai: Notion Pricing 2026 Analysis
- Asana Pricing Page (asana.com/pricing)
- Intercom Pricing Page (intercom.com/pricing)
- Zendesk Outcome-Based Pricing Newsroom Article
- Zendesk Help: Moving to Automated Resolutions
- Eesel.ai: Zendesk AI Agent Features & Pricing 2026
- GetMacha: Zendesk AI Pricing Complete Breakdown

---

*Last updated: February 25, 2026*
