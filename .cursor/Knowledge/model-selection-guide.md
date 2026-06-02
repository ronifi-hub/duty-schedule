# Model selection guide for PM tasks

**Last updated:** February 2026

Use this to pick the right model for the job. Update as models evolve or as you develop new preferences from experience.

---

## Quick reference

| Task | Best model | Why |
|---|---|---|
| Writing PRDs, strategy docs, narratives | Claude Opus | Best at nuanced, structured long-form writing. Gets tone right. |
| Analyzing large files, data, long transcripts | Claude Sonnet | 1M token context window. Fast. Handles big inputs without choking. |
| Quick edits, short tasks, file cleanup | Claude Sonnet or GPT-4o | Fast and cheap. Don't pay Opus prices for simple work. |
| SQL queries, data analysis | Claude Opus or Sonnet | Both strong at structured output. Opus for complex logic, Sonnet for speed. |
| Brainstorming, ideation | Claude Opus or GPT-4o | Both creative, different flavors. Try both and compare. |
| Summarizing meetings / docs | Claude Sonnet | Fast, handles long inputs, good at extracting key points. |
| Visual prototyping (describing UI) | Claude Opus | Best at understanding design intent and translating to detailed specs. |
| Research / web search tasks | Gemini | Strong at search-grounded tasks. Good for market research. |

---

## Decision framework

1. **Start with your go-to** — Claude Opus for important work, Sonnet for everything else
2. **When output disappoints, switch models** and try the same prompt
3. **Notice the differences** — not just quality, but speed, tone, tool-calling reliability
4. **Over time, build gut instinct** — the kind no benchmark can give you

## Key tradeoffs to evaluate

| Dimension | What to consider |
|---|---|
| **Quality** | How nuanced, accurate, and well-structured is the output? |
| **Speed** | How fast does it respond? Matters for iterative work. |
| **Context window** | How much input can it handle? Matters for large docs and data. |
| **Tool calling** | How reliably does it call the right tools? Matters for agent tasks. |
| **Cost** | At scale (for your monday.com products), cost per request adds up fast. |

---

## Personal notes

<!-- Add your own observations here as you use different models -->
<!-- e.g. "Tried Gemini for PLG analysis — fast but missed nuance in segmentation" -->
<!-- e.g. "Opus nailed the monetization narrative but was slow on the SQL query" -->
