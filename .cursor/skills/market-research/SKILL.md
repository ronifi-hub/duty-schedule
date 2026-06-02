---
name: market-research
description: Competitive and market research for product decisions, including visual competitor UI capture. Use when the user mentions competitors, market trends, competitive analysis, benchmarking, screenshots of competitor products, or asks about how other products solve a problem.
---

# Market Research

Conduct structured competitive and market research to support product decisions. Includes visual competitor UI capture via browser screenshots.

## When to Use

- User mentions a competitor or competing product
- User asks "how do others solve this?" or "what's the market doing?"
- User is working on a PRD and needs market context
- User asks about pricing, packaging, or positioning trends
- User asks to screenshot or capture competitor UIs

## Instructions

1. **Identify the research scope** — ask the user to clarify the specific area if unclear (e.g., feature comparison, pricing model, go-to-market strategy). Also ask which competitors or URLs to capture.

2. **Search for current information** — use web search to find the latest data. Don't rely on training data alone for competitive intel.

3. **Capture competitor UI screenshots** — when visual comparison is relevant, follow the screenshot workflow below.

4. **Structure the output as a research brief** using the template below.

5. **Connect findings to Roni's goals** — reference `Knowledge/Roni's GOALS.md` and active tasks in `Knowledge/Tasks/` to tie research back to current priorities.

6. **Recommend next steps** — don't just report, suggest 2-3 actionable next steps based on the research.

---

## Screenshot Capture Workflow

Use the `cursor-ide-browser` tools to navigate to competitor sites and capture their UIs.

### Steps

1. **Ask the user** for the output folder path. Default: `Knowledge/Research/[topic-slug]/screenshots/`.
2. **For each competitor URL:**
   - `browser_navigate` to the URL.
   - Wait for the page to load (`browser_wait_for` with a short delay, then `browser_snapshot` to confirm).
   - `browser_take_screenshot` — save with a descriptive filename: `[company]-[feature-or-page].png`.
   - If the page has a long scroll, use `fullPage: true` to capture the entire page.
   - For specific UI elements, use `browser_snapshot` to find the `ref`, then screenshot with `ref` to isolate the element.
3. **Scroll and capture subsections** if comparing a specific feature area (e.g., pricing table, onboarding flow, dashboard). Use `browser_scroll` + `browser_take_screenshot` to capture below-the-fold content.
4. **Close or navigate away** when done with each competitor.

### Screenshot Naming Convention

```
[company]-[page-or-feature]-[optional-detail].png
```

Examples:
- `asana-dashboard-overview.png`
- `notion-ai-assistant-sidebar.png`
- `clickup-pricing-page-full.png`

---

## Research Brief Template

**Topic:** [What we're researching]
**Date:** [Today's date]
**Screenshots:** [Path to screenshots folder, if captured]

### Competitive Landscape
| Company | Approach | Strengths | Weaknesses | Screenshot |
|---------|----------|-----------|------------|------------|
|         |          |           |            | `filename` |

### Visual Comparison Notes
- Key UI/UX differences observed across competitors
- Patterns that appear across multiple products
- Notable design choices relevant to our product

### Key Trends
- Trend 1
- Trend 2
- Trend 3

### Implications for monday.com
- What this means for our product decisions
- Opportunities to differentiate
- Risks if we don't act

### Sources
- List URLs and sources used
