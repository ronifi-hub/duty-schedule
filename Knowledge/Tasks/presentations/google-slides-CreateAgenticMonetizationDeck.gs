/**
 * Google Apps Script — creates an editable Google Slides deck for the team roadmap session:
 * "Changing our mind: growth monetization in the agentic era".
 *
 * Audience: immediate team. Tone: candid, opinionated, detail-OK.
 * Spine: old belief → new belief. Each "mind-change" slide names what we used to assume,
 * why the agentic shift breaks it, and what we now believe instead.
 *
 * HOW TO USE:
 * 1. Open https://script.google.com → New project → paste this file → Save.
 * 2. Run `createAgenticMonetizationDeck` → Authorize.
 * 3. Open the URL from View → Executions → Logs, or find the new file in Drive:
 *    "Changing our mind — growth monetization in the agentic era (editable)".
 *
 * OR attach to Slides: Extensions → Apps Script in any Slides doc, paste, run the same function
 * (creates a *new* presentation in Drive).
 *
 * Google Slides cannot import HTML. This script creates native text you can edit, restyle, and
 * move into your team template.
 */

function createAgenticMonetizationDeck() {
  var slides = [
    {
      title: 'Changing our mind: growth monetization in the agentic era',
      body: 'Team roadmap session · Jun 2026\n\n' +
        '• This is not a plan tweak — we are changing some beliefs about how we make money.\n' +
        '• Thesis: agents move the unit of value from "access to software" to "work done." Our monetization has to follow.\n' +
        '• Format today: for each belief — what we used to assume → why it breaks → what we now believe → what changes in the roadmap.'
    },
    {
      title: 'Why this session (and why now)',
      body: 'Framing\n\n' +
        '• Our current model was built for assistive AI: a seat-based core + an AI add-on + credits that meter usage.\n' +
        '• Agents monetization ships end of May, the platform story goes live May 6 — so the pricing assumptions underneath are about to be load-bearing.\n' +
        '• Honest admission: a few things we designed for (add-on, credit gates, "migrate by deadline") no longer match where value is created.\n' +
        '• Goal of the hour: align on the belief changes, then on what they mean for the roadmap.'
    },
    {
      title: 'What we used to believe',
      body: 'The old monetization model\n\n' +
        '• AI is an add-on you attach to the core product.\n' +
        '• Seats price the value — more users = more revenue.\n' +
        '• Credits/grants meter AI; the paywall is the wall that triggers "buy more."\n' +
        '• Everyone gets one motion: hit the limit → upsell the add-on.\n' +
        '• Migration to anything new happens on our calendar (deadline + cutover).'
    },
    {
      title: 'What the agentic shift breaks',
      body: 'Why the old model strains\n\n' +
        '• Agents do multi-step work unattended — value decouples from "a human in a seat."\n' +
        '• Cost is now variable and real (tokens/compute per run), so flat add-on pricing leaks margin or caps usage badly.\n' +
        '• The add-on framing caps ambition: we are pricing a feature, not the platform.\n' +
        '• A hard paywall at credit exhaustion reads as a dead end exactly when the user is most engaged.'
    },
    {
      title: 'Mind-change #1 — Add-on → Platform',
      body: 'From feature to platform\n\n' +
        '• Old: sell AI as an add-on SKU on top of the existing plan.\n' +
        '• New: AI is the platform; the packaged offer is the destination, the add-on is a legacy on-ramp.\n' +
        '• So what: one coherent story — discover → try → choose packaged AI when ready (voluntary migration, not forced).\n' +
        '• Roadmap tie-in: May 6 platform visibility + new-platform CTA across existing users.'
    },
    {
      title: 'Mind-change #2 — Seats → Work/Outcomes',
      body: 'From access to value delivered\n\n' +
        '• Old: seats are the meter — pricing scales with how many people can log in.\n' +
        '• New: agents are priced on work done (runs/outcomes), decoupled from seat count.\n' +
        '• So what: a 10-seat account running heavy agent workloads should monetize like it — seats alone undercharge it.\n' +
        '• Open debate (later slide): per-run vs outcome-based vs included-then-metered — we need a position today.'
    },
    {
      title: 'Mind-change #3 — Paywall → Fork in the road',
      body: 'From wall to guided choice\n\n' +
        '• Old: credits run out → paywall → "buy more add-on." The wall is the product.\n' +
        '• New: exhaustion is a fork — foreground the smart default (switch to the packaged model) instead of refilling the old one.\n' +
        '• So what: the "no-brainer" switch lives at the paywall moment for the blocked population.\n' +
        '• Roadmap tie-in: blocked journey = paywall → purchase → foreground switch (Agents monetization journey).'
    },
    {
      title: 'Mind-change #4 — Credits as gate → Credits as fuel',
      body: 'From meter to growth lever\n\n' +
        '• Old: grants/credits exist to meter and to gate; running low is a stick.\n' +
        '• New: credits are adoption fuel — top-ups and trials buy us activation and trust, not just a billing event.\n' +
        '• So what: heavy grant consumers (≥80% used) get extra credits to keep experimenting instead of a hard stop.\n' +
        '• Guardrail: this is an investment with a budget — Finance owns bucket size + validity, not an open tap.'
    },
    {
      title: 'Mind-change #5 — One motion → Population-aware',
      body: 'From one funnel to state-based monetization\n\n' +
        '• Old: same upsell for everyone the moment they hit a limit.\n' +
        '• New: monetize by user state — blocked (credits exhausted) vs not blocked (still has credits / discovery).\n' +
        '• So what: blocked → paywall-first switch; not-blocked → in-product promo (balance visible, what is new, CTA).\n' +
        '• Same migration SKU + same discount; only the population and the messaging differ.'
    },
    {
      title: 'Mind-change #6 — Deadline cutover → Voluntary migration',
      body: 'From forced to earned\n\n' +
        '• Old: pick a date, flip everyone, absorb the support and churn hit.\n' +
        '• New: voluntary migration earned with clear TCO and trust — one migration discount, terms transparent.\n' +
        '• So what: fewer dead ends, clearer next step, stronger activation on the new model — and defensible margin.\n' +
        '• Post-promo: a clear standard-terms transition (e.g. after the promotional-credit window) — Finance/Legal.'
    },
    {
      title: 'Our new monetization principles',
      body: 'The durable beliefs (the part that should outlast this roadmap)\n\n' +
        '• Price the work, not the seat.\n' +
        '• The platform is the product; add-ons are on-ramps, not destinations.\n' +
        '• Every limit is a guided choice, never a dead end.\n' +
        '• Credits are an adoption investment with a budget — measured, not infinite.\n' +
        '• Migration is voluntary, earned with TCO clarity and trust.'
    },
    {
      title: 'What this means for the roadmap',
      body: 'Near-term cadence\n\n' +
        '• May 6 — Platform + comms live; new-platform CTA for all existing; ≥80% grant cohort gets a top-up.\n' +
        '• End May — Agents monetization ships → agents-only trial + credits (separate comms beat).\n' +
        '• Ongoing — One migration offer (same SKU/discount) in purchase + high-usage surfaces; population-aware copy.\n' +
        '• Post-promo — Standard terms after the promo window (Finance/Legal) — define before we turn it on.'
    },
    {
      title: 'Open debates for today',
      body: 'Where we still disagree — let us decide\n\n' +
        '• Agent pricing unit: per-run vs outcome-based vs included-then-metered? (margin vs simplicity vs predictability)\n' +
        '• Discount shape: free credits for N months vs % off vs price hold — and how it shows on the invoice.\n' +
        '• The 80% top-up: bucket size, validity, and the abuse/overlap guardrail.\n' +
        '• When two offers apply (add-on intent + high usage): one coherent promo — who arbitrates?'
    },
    {
      title: 'What I am asking from you',
      body: 'Decisions & owners\n\n' +
        '• Land a default position on the agent pricing unit today (we can refine, but pick a direction).\n' +
        '• Finance + Legal: discount mechanics + invoice presentation; credit-budget for top-ups.\n' +
        '• PM + Eng: define the ≥80% rule buckets and the blocked vs not-blocked detection.\n' +
        '• Next checkpoint: comms calendar (May 6 vs end-May agents) + a single metrics/guardrails dashboard.'
    }
  ];

  var presentation = SlidesApp.create('Changing our mind — growth monetization in the agentic era (editable)');

  for (var i = 0; i < slides.length; i++) {
    var slide = presentation.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);
    fillTitleAndBody(slide, slides[i].title, slides[i].body);
  }

  if (presentation.getSlides().length > slides.length) {
    presentation.getSlides()[0].remove();
  }

  Logger.log(presentation.getUrl());
}

/**
 * getPlaceholders() returns PageElements — call asPlaceholder() before getPlaceholderType().
 */
function fillTitleAndBody(slide, titleText, bodyText) {
  var elements = slide.getPageElements();
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if (el.getPageElementType() !== SlidesApp.PageElementType.PLACEHOLDER) {
      continue;
    }
    var ph = el.asPlaceholder();
    var type = ph.getPlaceholderType();
    var shape;
    try {
      shape = ph.asShape();
    } catch (e) {
      continue;
    }
    if (!shape || typeof shape.getText !== 'function') {
      continue;
    }
    if (type === SlidesApp.PlaceholderType.TITLE || type === SlidesApp.PlaceholderType.CENTERED_TITLE) {
      shape.getText().setText(titleText);
    } else if (type === SlidesApp.PlaceholderType.BODY || type === SlidesApp.PlaceholderType.SUBTITLE) {
      shape.getText().setText(bodyText);
    }
  }
}
