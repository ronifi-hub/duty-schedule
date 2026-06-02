/**
 * Push “two populations” copy into the existing P&P deck (native Slides — not via Cursor).
 *
 * WHY: Cursor’s Google MCP can only READ Slides. Apps Script runs as YOU and can WRITE.
 *
 * HOW TO USE:
 * 1. Open the deck: https://docs.google.com/presentation/d/1jOfnWygOBi9z09T3H5TXPBmKnOd4J0D4fEka28Lzcoo/edit
 * 2. Extensions → Apps Script → delete default code → paste this entire file → Save.
 * 3. Select function `runAllTwoPopulationsUpdates` → Run → Authorize (first time).
 * 4. Reload the Slides tab. If inserts look wrong, Undo once and run functions separately.
 *
 * IDEMPOTENCY: Running `updatePopulationATextGlobally` twice may garble text (string replacement).
 *            Run that function once per deck, or restore from version history before re-run.
 */

var PRESENTATION_ID = '1jOfnWygOBi9z09T3H5TXPBmKnOd4J0D4fEka28Lzcoo';
/** Slide you linked — we add speaker notes here; text updates hit ALL slides with the old phrases. */
var ANCHOR_SLIDE_OBJECT_ID = 'g39ab25fd5f1_0_0';

function runAllTwoPopulationsUpdates() {
  updatePopulationATextGlobally();
  insertFourSlidesAfterAnchor();
  setAnchorSpeakerNotes();
}

/** Replaces headline + subline wherever they appear (including duplicate slides in this deck). */
function updatePopulationATextGlobally() {
  var pres = SlidesApp.openById(PRESENTATION_ID);
  var slides = pres.getSlides();
  for (var i = 0; i < slides.length; i++) {
    replaceTextInSlideElements(slides[i].getPageElements());
  }
}

function replaceTextInSlideElements(elements) {
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    var t = el.getPageElementType();
    if (t === SlidesApp.PageElementType.GROUP) {
      replaceTextInSlideElements(el.asGroup().getChildren());
      continue;
    }
    if (t !== SlidesApp.PageElementType.SHAPE) {
      continue;
    }
    var shape = el.asShape();
    if (typeof shape.getText !== 'function') {
      continue;
    }
    var textRange = shape.getText();
    if (!textRange) {
      continue;
    }
    var s = textRange.asString();
    if (!s) {
      continue;
    }
    var n = s;
    // Idempotent: do not re-match the embedded "Add-on paywall → purchase flow" inside the new subtitle.
    if (n.indexOf('Population (a): Credit exhaustion → paywall') === -1) {
      n = n.replace(/Add-on paywall → purchase flow/g, 'Population (a): Credit exhaustion → paywall');
    }
    if (n.indexOf('Add-on paywall → purchase flow →') === -1) {
      n = n.replace(/“No brainer” switch to the new model/g, 'Add-on paywall → purchase flow → “no-brainer” switch to the new model');
      n = n.replace(/"No brainer" switch to the new model/g, 'Add-on paywall → purchase flow → “no-brainer” switch to the new model');
    }
    if (n !== s) {
      textRange.setText(n);
    }
  }
}

function insertFourSlidesAfterAnchor() {
  var pres = SlidesApp.openById(PRESENTATION_ID);
  var slides = pres.getSlides();
  var idx = -1;
  for (var i = 0; i < slides.length; i++) {
    if (slides[i].getObjectId() === ANCHOR_SLIDE_OBJECT_ID) {
      idx = i;
      break;
    }
  }
  if (idx < 0) {
    throw new Error('Anchor slide not found: ' + ANCHOR_SLIDE_OBJECT_ID);
  }

  var after = slides[idx + 1];
  if (after && getPlaceholderTitleText(after) === 'Existing users: two paths on the AI platform') {
    Logger.log('insertFourSlidesAfterAnchor: skipped (first inserted slide already exists after anchor).');
    return;
  }

  var blocks = [
    {
      title: 'Existing users: two paths on the AI platform',
      body:
        '• One story: discover what’s new → try the platform → choose packaged AI when ready (voluntary migration).\n' +
        '• Two populations by state: blocked (credits exhausted) vs still has credits → different UX and comms.\n' +
        '• Success: fewer dead ends; clearer next step; stronger activation on the new model.'
    },
    {
      title: 'Journey — blocked (credits exhausted)',
      body:
        '• Trigger: user hits credit limit / paywall on the legacy add-on path.\n' +
        '• Experience: paywall → purchase → foreground switch to new model as the smart default where we show it.\n' +
        '• Visual: Agents monetization journey in Figma (node 2162-20419).'
    },
    {
      title: 'Journey — not blocked (promo / discovery)',
      body:
        '• Trigger: account still has credits; no hard stop.\n' +
        '• Experience: in-product promotion — balance visible, what’s new, CTA into the platform.\n' +
        '• Visual: AI Credits promo pop-up in Figma (node 932-32222).'
    },
    {
      title: 'Rollout — promo for population (b)',
      body:
        '• Who: Admins · existing · <15 seats · no-touch · not in the blocked / paywall-first journey.\n' +
        '• What: in-product promo (Figma); email / lifecycle TBD.\n' +
        '• When: phased rollout TBD (flag + measure before broadening).\n' +
        '• Guardrails: Legal / Finance on copy and eligibility; population (a) stays on a separate track.'
    }
  ];

  var insertAt = idx + 1;
  for (var j = 0; j < blocks.length; j++) {
    var slide = pres.insertSlide(insertAt, SlidesApp.PredefinedLayout.TITLE_AND_BODY);
    fillTitleAndBody(slide, blocks[j].title, blocks[j].body);
    insertAt++;
  }
}

function setAnchorSpeakerNotes() {
  var pres = SlidesApp.openById(PRESENTATION_ID);
  var slide = null;
  var slides = pres.getSlides();
  for (var i = 0; i < slides.length; i++) {
    if (slides[i].getObjectId() === ANCHOR_SLIDE_OBJECT_ID) {
      slide = slides[i];
      break;
    }
  }
  if (!slide) {
    throw new Error('Anchor slide not found');
  }
  var notes = slide.getNotesPage().getSpeakerNotesShape().getText();
  var figmaA = 'https://www.figma.com/design/dV1oD5cFArzDy1b5xwZs0W/Agents-monetization?node-id=2162-20419';
  var figmaB = 'https://www.figma.com/design/ErzdM0aHRUDyi4aJf4QPVd/AI-Credits?node-id=932-32222';
  notes.setText(
    'Population (a) = credit exhaustion / paywall path. Figma journey: ' +
      figmaA +
      '\n\nPopulation (b) promo reference: ' +
      figmaB
  );
}

function getPlaceholderTitleText(slide) {
  var elements = slide.getPageElements();
  for (var i = 0; i < elements.length; i++) {
    var el = elements[i];
    if (el.getPageElementType() !== SlidesApp.PageElementType.PLACEHOLDER) {
      continue;
    }
    var ph = el.asPlaceholder();
    var type = ph.getPlaceholderType();
    if (type !== SlidesApp.PlaceholderType.TITLE && type !== SlidesApp.PlaceholderType.CENTERED_TITLE) {
      continue;
    }
    try {
      return ph.asShape().getText().asString();
    } catch (e) {
      continue;
    }
  }
  return '';
}

/** Copied pattern from google-slides-CreateEditableDeck.gs */
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
