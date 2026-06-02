/**
 * Google Apps Script — creates an editable Google Slides deck (same story as index.html).
 *
 * HOW TO USE:
 * 1. Open https://script.google.com → New project → paste this file → Save.
 * 2. Run `createExistingUsersAIMigrationDeck` → Authorize.
 * 3. Open the URL from View → Executions → Logs, or find the new file in Drive: "Existing users — AI platform (editable)".
 *
 * OR attach to Slides: Extensions → Apps Script in any Slides doc, paste, run the same function (creates a *new* presentation in Drive).
 *
 * Google Slides cannot import HTML. This script creates native text you can edit, restyle, and move to your template deck.
 */

function createExistingUsersAIMigrationDeck() {
  var slides = [
    {
      title: 'Existing users & the new AI platform',
      body: 'Adoption, incentives, voluntary migration · Apr 2026\n\n• One coherent AI platform story: existing users discover, try, and can choose the new packaged offer.\n• New logos (from May 6): new plan lineup only — separate policy.\n• Same migration SKU + same discount; only population and messaging differ (add-on path vs high usage).'
    },
    {
      title: 'Why now',
      body: 'Problem framing\n\n• Two-track risk: legacy + add-on vs AI-inclusive plans for new buyers.\n• Without action: under-discovery, support load, slower unified adoption.\n• Goal: voluntary migration with clear TCO and trust — not forced cutover.'
    },
    {
      title: 'Strategy at a glance',
      body: 'One screen\n\n• May 6 — All existing: visibility + new platform CTA; ≥80% grant use → extra credits\n• End May — Agents monetization → agents-only trial (+ credits)\n• Purchase — One migration discount (terms TBD) — add-on path & high usage, same SKU'
    },
    {
      title: 'Timeline',
      body: 'Cadence\n\n[Recreate the visual timeline in Slides with shapes/lines, or Insert → Image from a screenshot of the HTML deck Timeline slide.]\n\nMay 6 — Platform & comms — credits visible · new CTA · 80%+ grant top-up\nEnd May — Agents — agents-only trial + credits\nOngoing — Migration offer — same SKU/discount (add-on + high usage)\nPost-promo — Standard terms — after promo window (Finance/Legal)\n\n• May 6: Platform + comms everywhere; 80%+ grant cohort gets top-up.\n• End May: Agents trial wave (after monetization live).\n• Ongoing: Migration offer in purchase flows + high-usage surfaces.\n• Post-promo: Clear transition (e.g. after 6 months promotional credits — TBD).'
    },
    {
      title: 'Deep dive — May 6 (all existing)',
      body: 'Discovery & entry\n\n• Both: surface existing entitlements and what is new with the platform.\n• CTA: primary → new AI platform mode.\n• Success: impressions → click → first meaningful action.'
    },
    {
      title: 'Deep dive — May 6 (≥80% grant cohort)',
      body: 'Heavy grant consumers\n\n• Who: consumed ≥80% of one-time purchase grant.\n• What: additional credits to experiment (bucket/validity — Finance).\n• Why: reduce hard stop without defaulting to “buy more add-on.”'
    },
    {
      title: 'Deep dive — End of May (agents)',
      body: 'Second beat\n\n• When: after agents monetization ships.\n• What: agents-only trial + additional credits.\n• Success: trial start → first agent run → paid policy.\n• Comms: separate cadence from May 6 blast.'
    },
    {
      title: 'Deep dive — Purchase (single offer)',
      body: 'Migration vs add-on\n\n• Offer: discount to adopt new packaged offering instead of buying AI add-on again.\n• Same SKU + same discount for add-on intent and high usage — copy differs.\n• Overlap guardrail: one coherent promo if both apply.\n• Open: discount shape (e.g. free credits N months) — Finance/Legal.'
    },
    {
      title: 'Messaging matrix',
      body: 'Same deal, two doors\n\nAdd-on intent — AI add-ons checkout — Before you buy add-on, see bundled TCO\nHigh usage — Usage / admin — Simplify billing with one packaged offer'
    },
    {
      title: 'Metrics & guardrails',
      body: 'Data\n\n• Platform activation; migration funnel; support volume; margin per cohort.\n• Counter-metrics: churn, NPS, billing disputes.\n• Events: ai_platform_cta_*, migration_discount_*, grant_topup_applied, agents_trial_started'
    },
    {
      title: 'Open decisions & next steps',
      body: 'Ask\n\n• Finalize discount mechanics & invoice presentation (Finance + Legal).\n• Define 80% rule buckets (PM + Eng).\n• Design review: surfaces + overlap (see design brief).\n• Comms calendar: May 6 vs end-May agents.'
    }
  ];

  var presentation = SlidesApp.create('Existing users — AI platform (editable)');

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
