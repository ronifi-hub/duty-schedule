---
name: weekly-feedback
description: Weekly feedback synthesis pipeline. Use when the user asks about pain points, user feedback, product complaints, feature requests, or wants a weekly feedback summary. Also activate when the user mentions Slack feedback channels, support tickets, or Gong calls.
---

# Weekly Feedback Synthesis

Collect and synthesize qualitative product feedback from multiple sources to surface the top 3 pain points weekly.

## When to Use

- User asks "what are users complaining about?" or "what are the top pain points?"
- User wants a weekly feedback summary
- User mentions feedback from Slack, Support, or Gong
- User is preparing a product review or stakeholder update and needs user sentiment data

## Data Sources

### Slack Channels (Primary)
- Channel `C0A4UFBV45C` — pull last 7 days of messages
- Channel `C099J0VV1QV` — pull last 7 days of messages
- Use Slack MCP tools: `slack_get_channel_history` for each channel

### Support Tickets (Phase 2 — when available)
- Pull recent tickets from support tool
- Focus on tickets tagged with product feedback, feature requests, or bugs

### Gong Calls (Phase 3 — when available)
- Check for exported Gong transcripts in `data/gong/`
- Extract product-related pain points from call summaries
- Weight Gong mentions higher (direct customer voice)

## Instructions

### Step 1: Collect raw feedback
Use Slack MCP to pull the last 7 days of messages from both channels. If Slack MCP is not available, ask the user to paste or export recent messages manually.

### Step 2: Filter for signal
Identify messages that contain:
- Complaints or frustration ("this is broken", "why can't I", "it's confusing")
- Feature requests ("it would be great if", "we need", "can you add")
- Confusion or support questions ("how do I", "I can't figure out", "is there a way to")
- Churn signals ("we're considering", "switching to", "cancelling")

Ignore: casual conversation, congratulations, off-topic, bot messages.

### Step 3: Categorize into themes
Group feedback into themes such as:
- Onboarding friction
- Missing features
- Performance / reliability
- Pricing / packaging
- UX confusion
- Integration gaps
- Any other emerging themes

### Step 4: Rank by frequency and severity
- **Frequency:** How many distinct mentions per theme
- **Severity:** Rate High/Medium/Low based on language intensity and business impact
- Combine into a weighted score to rank themes

### Step 5: Generate the report
Output a structured Markdown file to `Knowledge/feedback-reports/YYYY-MM-DD-weekly-pain-points.md` using this template:

```markdown
# Weekly Pain Points — [Start Date] to [End Date]

## Top 3 Pain Points

### 1. [Theme] (X mentions)
- **Severity:** High/Medium/Low
- **Sample quotes:**
  - "[exact quote from user]" — #channel
  - "[exact quote from user]" — #channel
- **Affected segments:** [user types, plan types, use cases]
- **Recommended action:** [specific next step for the PM]

### 2. [Theme] (X mentions)
- **Severity:** High/Medium/Low
- **Sample quotes:**
  - ...
- **Affected segments:** ...
- **Recommended action:** ...

### 3. [Theme] (X mentions)
- **Severity:** High/Medium/Low
- **Sample quotes:**
  - ...
- **Affected segments:** ...
- **Recommended action:** ...

## Honorable Mentions
- [Theme 4]: X mentions — brief summary
- [Theme 5]: X mentions — brief summary

## Trend vs. Last Week
- New this week: ...
- Improving: ...
- Persistent: ...

## Sources
- Slack C0A4UFBV45C: X messages analyzed
- Slack C099J0VV1QV: X messages analyzed
- Support: X tickets analyzed (when available)
- Gong: X calls analyzed (when available)
```

### Step 6: Connect to goals
After generating the report, reference `Knowledge/Roni's GOALS.md` and active tasks in `Knowledge/Tasks/` to highlight which pain points connect to current priorities. Add a "Relevance to Current Tasks" section if connections exist.
