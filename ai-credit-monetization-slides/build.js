const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

// ---------- palette ----------
const INK = "12132A";      // dark bg
const INK2 = "20224A";     // dark panel
const VIOLET = "5B5FD6";   // product / AI
const MINT = "00C2A8";     // value / positive
const AMBER = "F5A623";    // out-of-credits / caution
const TEXT = "1A1B2E";
const MUTED = "6B7280";
const WHITE = "FFFFFF";
const CARD = "F4F5FB";
const BORDER = "E3E5F0";

const W = 10, H = 5.625;

// ---------- icon helper ----------
async function icon(IconComponent, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}
const hex = (c) => "#" + c;

const shadow = () => ({ type: "outer", color: "000000", blur: 7, offset: 2, angle: 135, opacity: 0.12 });

async function main() {
  const I = {};
  const defs = {
    bolt: fa.FaBolt, warn: fa.FaExclamationTriangle, sync: fa.FaSyncAlt, coins: fa.FaCoins,
    clip: fa.FaClipboardCheck, chart: fa.FaChartLine, check: fa.FaCheckCircle, grid: fa.FaThLarge,
    bell: fa.FaBell, clock: fa.FaClock, bulb: fa.FaLightbulb, rocket: fa.FaRocket,
    play: fa.FaPlayCircle, hand: fa.FaHandPaper, down: fa.FaArrowDown, up: fa.FaArrowUp,
    window: fa.FaWindowRestore, gauge: fa.FaTachometerAlt, target: fa.FaBullseye, envelope: fa.FaEnvelopeOpenText
  };
  // pre-render in several colors
  for (const [k, comp] of Object.entries(defs)) {
    I[k + "_w"] = await icon(comp, hex(WHITE));
    I[k + "_v"] = await icon(comp, hex(VIOLET));
    I[k + "_m"] = await icon(comp, hex(MINT));
    I[k + "_a"] = await icon(comp, hex(AMBER));
  }

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Competitive Research";
  pres.title = "Monetizing Consumption AI";

  // ---------- reusable pieces ----------
  function iconCircle(slide, data, x, y, d, fill) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" } });
    const pad = d * 0.26;
    slide.addImage({ data, x: x + pad, y: y + pad, w: d - pad * 2, h: d - pad * 2 });
  }

  function header(slide, kicker, kickerColor, title, iconData, circleColor) {
    const d = 0.62;
    iconCircle(slide, iconData, 0.5, 0.42, d, circleColor);
    slide.addText(kicker.toUpperCase(), {
      x: 1.28, y: 0.40, w: 8.2, h: 0.26, fontFace: "Arial", fontSize: 11, bold: true,
      color: kickerColor, charSpacing: 3, margin: 0, valign: "middle"
    });
    slide.addText(title, {
      x: 1.28, y: 0.64, w: 8.2, h: 0.55, fontFace: "Georgia", fontSize: 26, bold: true,
      color: TEXT, margin: 0, valign: "middle"
    });
  }

  function footer(slide, note) {
    slide.addText(note, {
      x: 0.5, y: 5.28, w: 9.0, h: 0.26, fontFace: "Arial", fontSize: 8.5, italic: true,
      color: MUTED, margin: 0, valign: "middle"
    });
  }

  // card with title + body lines (array of {label?, text} or strings)
  function card(slide, x, y, w, h, opts) {
    const { accent = VIOLET, fill = CARD, title, titleColor = TEXT, body, who, bodySize = 11.5 } = opts;
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.09, h, fill: { color: accent }, line: { type: "none" } });
    let cy = y + 0.16;
    if (title) {
      slide.addText(title, { x: x + 0.26, y: cy, w: w - 0.42, h: 0.46, fontFace: "Arial", fontSize: 13.5, bold: true, color: titleColor, margin: 0, valign: "top" });
      cy += 0.5;
    }
    if (body) {
      slide.addText(body, { x: x + 0.26, y: cy, w: w - 0.46, h: h - (cy - y) - (who ? 0.42 : 0.16), fontFace: "Arial", fontSize: bodySize, color: TEXT, margin: 0, valign: "top", lineSpacingMultiple: 1.05 });
    }
    if (who) {
      slide.addText(who, { x: x + 0.26, y: y + h - 0.40, w: w - 0.42, h: 0.3, fontFace: "Arial", fontSize: 9.5, italic: true, color: MUTED, margin: 0, valign: "middle" });
    }
  }

  function insight(slide, text, y = 4.74, color = VIOLET) {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.46, fill: { color: INK }, line: { type: "none" }, shadow: shadow() });
    slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.09, h: 0.46, fill: { color: color }, line: { type: "none" } });
    slide.addText([{ text: "INSIGHT  ", options: { bold: true, color: color } }, { text: text, options: { color: "E8E9F5" } }],
      { x: 0.72, y, w: 8.7, h: 0.46, fontFace: "Arial", fontSize: 10.5, margin: 0, valign: "middle" });
  }

  // ============ SLIDE 1 — TITLE ============
  let s = pres.addSlide();
  s.background = { color: INK };
  s.addShape(pres.shapes.OVAL, { x: 7.6, y: -1.6, w: 4.6, h: 4.6, fill: { color: INK2 }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 8.9, y: 3.4, w: 3.0, h: 3.0, fill: { color: VIOLET, transparency: 70 }, line: { type: "none" } });
  iconCircle(s, I.bolt_w, 0.6, 0.7, 0.8, MINT);
  s.addText("COMPETITIVE RESEARCH", { x: 0.62, y: 1.75, w: 8, h: 0.3, fontFace: "Arial", fontSize: 13, bold: true, color: MINT, charSpacing: 4, margin: 0 });
  s.addText("Monetizing Consumption AI", { x: 0.6, y: 2.05, w: 8.8, h: 1.0, fontFace: "Georgia", fontSize: 46, bold: true, color: WHITE, margin: 0 });
  s.addText("End-of-funnel tactics & value demonstration in credit-based B2B SaaS",
    { x: 0.62, y: 3.05, w: 8.8, h: 0.5, fontFace: "Arial", fontSize: 17, color: "C7C9E8", margin: 0 });
  s.addText([
    { text: "26 credit / consumption AI products analyzed   ", options: { color: "9A9CC4" } },
    { text: "·  app builders  ·  media gen  ·  horizontal SaaS  ·  AI writing & infra", options: { color: "6F72A8" } }
  ], { x: 0.62, y: 4.5, w: 9, h: 0.3, fontFace: "Arial", fontSize: 11, margin: 0 });
  s.addText("Research date 2026-06-02  ·  sources: official pricing / help / docs", { x: 0.62, y: 4.82, w: 9, h: 0.3, fontFace: "Arial", fontSize: 9.5, italic: true, color: "6F72A8", margin: 0 });

  // ============ SLIDE 2 — TWO PARTS ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "How to read this deck", VIOLET, "Two questions, two playbooks", I.grid_w, VIOLET);
  // Card A
  const ca = { x: 0.5, y: 1.55, w: 4.45, h: 3.0 };
  s.addShape(pres.shapes.RECTANGLE, { ...ca, fill: { color: CARD }, line: { color: BORDER, width: 1 }, shadow: shadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: ca.x, y: ca.y, w: ca.w, h: 0.09, fill: { color: AMBER }, line: { type: "none" } });
  iconCircle(s, I.warn_w, ca.x + 0.26, ca.y + 0.3, 0.6, AMBER);
  s.addText("PART A", { x: ca.x + 1.0, y: ca.y + 0.32, w: 3, h: 0.26, fontFace: "Arial", fontSize: 11, bold: true, color: AMBER, charSpacing: 3, margin: 0 });
  s.addText("Capture revenue at the run-out moment", { x: ca.x + 1.0, y: ca.y + 0.56, w: 3.3, h: 0.6, fontFace: "Georgia", fontSize: 16, bold: true, color: TEXT, margin: 0 });
  s.addText([
    { text: "Out-of-credits modals & paywalls", options: { bullet: true, breakLine: true } },
    { text: "Auto-recharge / auto-reload flows", options: { bullet: true, breakLine: true } },
    { text: "Top-up, overage & rollover mechanics", options: { bullet: true } }
  ], { x: ca.x + 0.3, y: ca.y + 1.5, w: ca.w - 0.6, h: 1.3, fontFace: "Arial", fontSize: 12.5, color: TEXT, paraSpaceAfter: 8, margin: 0 });
  // Card B
  const cb = { x: 5.05, y: 1.55, w: 4.45, h: 3.0 };
  s.addShape(pres.shapes.RECTANGLE, { ...cb, fill: { color: CARD }, line: { color: BORDER, width: 1 }, shadow: shadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: cb.x, y: cb.y, w: cb.w, h: 0.09, fill: { color: MINT }, line: { type: "none" } });
  iconCircle(s, I.chart_w, cb.x + 0.26, cb.y + 0.3, 0.6, MINT);
  s.addText("PART B", { x: cb.x + 1.0, y: cb.y + 0.32, w: 3, h: 0.26, fontFace: "Arial", fontSize: 11, bold: true, color: "009A86", charSpacing: 3, margin: 0 });
  s.addText("Prove value to the budget owner", { x: cb.x + 1.0, y: cb.y + 0.56, w: 3.3, h: 0.6, fontFace: "Georgia", fontSize: 16, bold: true, color: TEXT, margin: 0 });
  s.addText([
    { text: "Make the credit = a unit of real work", options: { bullet: true, breakLine: true } },
    { text: "Admin consumption dashboards", options: { bullet: true, breakLine: true } },
    { text: "ROI / hours-saved framing & alerts", options: { bullet: true } }
  ], { x: cb.x + 0.3, y: cb.y + 1.5, w: cb.w - 0.6, h: 1.3, fontFace: "Arial", fontSize: 12.5, color: TEXT, paraSpaceAfter: 8, margin: 0 });
  s.addText([
    { text: "Thesis:  ", options: { bold: true, color: MINT } },
    { text: "the hard block is dying. Revenue is made at peak intent — and the buyer says yes only when credits visibly equal work done.", options: { color: "E8E9F5" } }
  ], { x: 0.5, y: 4.78, w: 9.0, h: 0.5, fontFace: "Arial", fontSize: 11, fill: { color: INK }, align: "left", valign: "middle", margin: 10 });

  // ============ SLIDE 3 — PART A DIVIDER ============
  s = pres.addSlide();
  s.background = { color: INK };
  s.addShape(pres.shapes.OVAL, { x: -1.4, y: 3.0, w: 4.2, h: 4.2, fill: { color: INK2 }, line: { type: "none" } });
  iconCircle(s, I.warn_w, 0.7, 1.45, 0.9, AMBER);
  s.addText("PART A", { x: 0.72, y: 2.55, w: 8, h: 0.4, fontFace: "Arial", fontSize: 15, bold: true, color: AMBER, charSpacing: 5, margin: 0 });
  s.addText("Out-of-credits modals\n& auto-recharge flows", { x: 0.68, y: 2.85, w: 9, h: 1.3, fontFace: "Georgia", fontSize: 38, bold: true, color: WHITE, margin: 0, lineSpacingMultiple: 0.98 });
  s.addText("The hard block is dying. The money is made at peak intent — mid-task, out of credits — by removing friction, not adding it.",
    { x: 0.72, y: 4.45, w: 8.6, h: 0.6, fontFace: "Arial", fontSize: 13, italic: true, color: "C7C9E8", margin: 0 });

  // ============ SLIDE 4 — RUN-OUT: 4 BEHAVIORS ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part A · the run-out moment", AMBER, "Four behaviors at zero — choose deliberately", I.gauge_w, AMBER);
  const rw = 2.22, rh = 2.74, ry = 1.5, gap = 0.12;
  const rx0 = 0.5;
  const beh = [
    { ic: I.play_m, cc: MINT, t: "Soft-continue → bill overage", b: "Work never stops; usage billed in arrears. Captures peak intent with zero friction.", w: "Cursor · Copilot · v0 · Replit · Zapier", note: "MOST COMMON" },
    { ic: I.hand_a, cc: AMBER, t: "Hard pause → upgrade / wait", b: "Feature blocked until top-up or reset. Forces the upgrade — higher churn risk.", w: "Synthesia · HubSpot · Intercom · Gamma", note: "" },
    { ic: I.down_v, cc: VIOLET, t: "Degraded-but-free fallback", b: "Drops to a slow / limited free mode. Monetizes speed, not access — zero churn.", w: "Midjourney (Relax) · Runway (Explore)", note: "" },
    { ic: I.up_a, cc: "C0392B", t: "Auto-upgrade to higher tier", b: "Exceeding limit silently bumps you up for the rest of contract. Aggressive, opaque.", w: "HubSpot (once packs bought)", note: "" }
  ];
  beh.forEach((bh, i) => {
    const x = rx0 + i * (rw + gap);
    s.addShape(pres.shapes.RECTANGLE, { x, y: ry, w: rw, h: rh, fill: { color: CARD }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: ry, w: rw, h: 0.08, fill: { color: bh.cc }, line: { type: "none" } });
    iconCircle(s, bh.ic, x + 0.22, ry + 0.24, 0.5, "FFFFFF");
    s.addShape(pres.shapes.OVAL, { x: x + 0.22, y: ry + 0.24, w: 0.5, h: 0.5, fill: { type: "none" }, line: { color: bh.cc, width: 1.5 } });
    if (bh.note) s.addText(bh.note, { x: x + 0.8, y: ry + 0.3, w: rw - 0.9, h: 0.3, fontFace: "Arial", fontSize: 8, bold: true, color: MINT, charSpacing: 1, margin: 0, valign: "middle" });
    s.addText(bh.t, { x: x + 0.2, y: ry + 0.8, w: rw - 0.36, h: 0.62, fontFace: "Arial", fontSize: 11.5, bold: true, color: TEXT, margin: 0, valign: "top" });
    s.addText(bh.b, { x: x + 0.2, y: ry + 1.42, w: rw - 0.36, h: 0.84, fontFace: "Arial", fontSize: 9, color: "44465E", margin: 0, valign: "top", lineSpacingMultiple: 1.0 });
    s.addText(bh.w, { x: x + 0.2, y: ry + rh - 0.4, w: rw - 0.36, h: 0.36, fontFace: "Arial", fontSize: 8.5, italic: true, color: MUTED, margin: 0, valign: "middle" });
  });
  insight(s, "The hard block is increasingly an admin-configurable safety (Copilot, Replit) — not the product default.", 4.5, AMBER);
  footer(s, "Behaviors observed on official pricing/docs pages across all four clusters.");

  // ============ SLIDE 5 — OUT-OF-CREDITS MODAL PATTERNS ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part A · the paywall", AMBER, "What the user actually sees at zero", I.window_w, AMBER);
  // mock modal (left)
  const mx = 0.5, my = 1.55, mw = 4.2, mh = 3.0;
  s.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: mw, h: mh, fill: { color: "FFFFFF" }, line: { color: "D5D8E8", width: 1.5 }, shadow: shadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: mx, y: my, w: mw, h: 0.5, fill: { color: INK }, line: { type: "none" } });
  s.addText("⚡  You're out of credits", { x: mx + 0.2, y: my, w: mw - 0.4, h: 0.5, fontFace: "Arial", fontSize: 12.5, bold: true, color: WHITE, margin: 0, valign: "middle" });
  const opts = [
    ["1  Wait for your next cycle", "Credits reset monthly — no charge."],
    ["2  Keep working with paid usage", "Set a $ budget. “a $10 budget covers 1,000 credits.”"],
    ["3  Switch to a less expensive model", "Stretch remaining budget further."]
  ];
  opts.forEach((o, i) => {
    const oy = my + 0.66 + i * 0.74;
    s.addShape(pres.shapes.RECTANGLE, { x: mx + 0.2, y: oy, w: mw - 0.4, h: 0.62, fill: { color: i === 1 ? "EAF8F5" : CARD }, line: { color: i === 1 ? MINT : BORDER, width: i === 1 ? 1.25 : 1 } });
    s.addText(o[0], { x: mx + 0.34, y: oy + 0.06, w: mw - 0.66, h: 0.28, fontFace: "Arial", fontSize: 10.5, bold: true, color: TEXT, margin: 0, valign: "middle" });
    s.addText(o[1], { x: mx + 0.34, y: oy + 0.32, w: mw - 0.66, h: 0.26, fontFace: "Arial", fontSize: 8.5, color: MUTED, margin: 0, valign: "middle" });
  });
  s.addText("GitHub Copilot — reconstructed from docs", { x: mx, y: my + mh + 0.04, w: mw, h: 0.24, fontFace: "Arial", fontSize: 8, italic: true, color: MUTED, margin: 0, align: "center" });
  // right: other patterns
  const px = 5.0, pw = 4.5;
  const pats = [
    ["HeyGen", "On exhausting premium credits a pop-up offers credit packs: “select packs & complete purchase to continue creating.”", AMBER],
    ["Lovable", "In-chat low-credit alert fires before zero — the nudge is the upsell trigger.", VIOLET],
    ["v0 (Vercel)", "“When credits are used up, generation pauses” — soft stop, then buy more.", VIOLET],
    ["GitHub (admin)", "Admins can disallow paid usage → “Copilot pauses until the next cycle.”", "C0392B"]
  ];
  pats.forEach((p, i) => {
    const py = 1.55 + i * 0.74;
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: py, w: pw, h: 0.64, fill: { color: CARD }, line: { color: BORDER, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: py, w: 0.07, h: 0.64, fill: { color: p[2] }, line: { type: "none" } });
    s.addText(p[0], { x: px + 0.2, y: py, w: 1.35, h: 0.64, fontFace: "Arial", fontSize: 11, bold: true, color: TEXT, margin: 0, valign: "middle" });
    s.addText(p[1], { x: px + 1.5, y: py + 0.04, w: pw - 1.65, h: 0.56, fontFace: "Arial", fontSize: 9, color: "44465E", margin: 0, valign: "middle", lineSpacingMultiple: 1.0 });
  });
  footer(s, "Verbatim modal copy is not published publicly — reconstructed from official docs. Live screen-capture available on request.");

  // ============ SLIDE 6 — AUTO-RECHARGE ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part A · the frontier", AMBER, "Auto-recharge: remove the run-out moment entirely", I.sync_w, MINT);
  // ElevenLabs hero flow
  s.addText([{ text: "ElevenLabs — “Auto Top Up”  ", options: { bold: true, color: TEXT } }, { text: "best-in-class in the application layer", options: { italic: true, color: MUTED } }],
    { x: 0.5, y: 1.42, w: 9, h: 0.3, fontFace: "Arial", fontSize: 13, margin: 0 });
  const steps = [
    ["Balance < $10", "Low-balance threshold trips automatically", MINT],
    ["Charge saved card", "No user action — runs in the background", VIOLET],
    ["Reload +$20", "Default top-up amount, configurable", MINT],
    ["Fail → pause", "Service pauses only if the charge fails", AMBER]
  ];
  const sw = 2.15, sx0 = 0.5, sy = 1.84, shh = 1.16;
  steps.forEach((st, i) => {
    const x = sx0 + i * (sw + 0.22);
    s.addShape(pres.shapes.RECTANGLE, { x, y: sy, w: sw, h: shh, fill: { color: i === 3 ? "FDF3E2" : CARD }, line: { color: i === 3 ? AMBER : BORDER, width: 1 }, shadow: shadow() });
    s.addText(`STEP ${i + 1}`, { x: x + 0.16, y: sy + 0.12, w: sw - 0.3, h: 0.22, fontFace: "Arial", fontSize: 8, bold: true, color: st[2], charSpacing: 2, margin: 0 });
    s.addText(st[0], { x: x + 0.16, y: sy + 0.32, w: sw - 0.3, h: 0.34, fontFace: "Arial", fontSize: 13, bold: true, color: TEXT, margin: 0 });
    s.addText(st[1], { x: x + 0.16, y: sy + 0.66, w: sw - 0.3, h: 0.46, fontFace: "Arial", fontSize: 9, color: "44465E", margin: 0, lineSpacingMultiple: 1.0 });
    if (i < 3) s.addText("→", { x: x + sw + 0.0, y: sy, w: 0.22, h: shh, fontFace: "Arial", fontSize: 18, bold: true, color: MUTED, align: "center", valign: "middle", margin: 0 });
  });
  // others row
  const others = [
    ["OpenAI & Anthropic", "API prepaid auto-recharge: “when balance < $X, refill to $Y.”"],
    ["HeyGen", "Auto-renewing add-on packs approximate auto-reload."],
    ["Atlassian Rovo Dev", "Auto-overage ON by default — extra 2,000 credits/user at $0.01 each."]
  ];
  others.forEach((o, i) => {
    const x = 0.5 + i * 3.04;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 3.28, w: 2.9, h: 1.1, fill: { color: WHITE }, line: { color: BORDER, width: 1 } });
    s.addText(o[0], { x: x + 0.16, y: 3.38, w: 2.6, h: 0.3, fontFace: "Arial", fontSize: 11, bold: true, color: VIOLET, margin: 0 });
    s.addText(o[1], { x: x + 0.16, y: 3.7, w: 2.62, h: 0.62, fontFace: "Arial", fontSize: 9.5, color: "44465E", margin: 0, lineSpacingMultiple: 1.02 });
  });
  insight(s, "The highest-leverage end-of-funnel mechanic — and the least adopted in the application layer.", 4.55, MINT);
  footer(s, "ElevenLabs defaults per official PAYG docs. OpenAI/Anthropic exact UI values sit behind login — capture available.");

  // ============ SLIDE 7 — TOP-UP & OVERAGE MECHANICS ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part A · the mechanics", AMBER, "Top-up, overage & rollover — engineered to be sticky", I.coins_w, AMBER);
  const tiles = [
    ["Self-serve instant top-up", "Now table stakes — buy credits in-app, applied immediately.", "Lovable · v0 · Replit · HeyGen · ElevenLabs · Clay", VIOLET],
    ["“Used only after allowance”", "Top-ups consumed after monthly credits — feel like insurance, not waste.", "ElevenLabs · v0 · Descript", MINT],
    ["Long expiry pre-commits cash", "Purchased credits valid 12 months — locks in spend, kills waste anxiety.", "ElevenLabs · Descript", MINT],
    ["Premium top-up drives upsize", "Top-ups priced at a premium so upsizing the base plan is the rational move.", "Clay (+30% on top-ups)", AMBER],
    ["Tiered overage → hard ceiling", "Keep working at a premium rate, then a hard stop forces the upgrade talk.", "Zapier (1.25× per task, stop at 3×)", AMBER],
    ["Non-rollover = scarcity", "Monthly credits expire; rollover (if any) needs an active sub & a clock.", "Bolt 2mo · v0 65d · HubSpot “use-or-lose”", VIOLET]
  ];
  const tw = 3.0, th = 1.36, tgx = 0.13, tgy = 0.14, tx0 = 0.5, ty0 = 1.5;
  tiles.forEach((t, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = tx0 + col * (tw + tgx), y = ty0 + row * (th + tgy);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: tw, h: th, fill: { color: CARD }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.08, h: th, fill: { color: t[3] }, line: { type: "none" } });
    s.addText(t[0], { x: x + 0.22, y: y + 0.12, w: tw - 0.36, h: 0.3, fontFace: "Arial", fontSize: 11.5, bold: true, color: TEXT, margin: 0 });
    s.addText(t[1], { x: x + 0.22, y: y + 0.44, w: tw - 0.36, h: 0.58, fontFace: "Arial", fontSize: 9.5, color: "44465E", margin: 0, lineSpacingMultiple: 1.02 });
    s.addText(t[2], { x: x + 0.22, y: y + th - 0.32, w: tw - 0.36, h: 0.28, fontFace: "Arial", fontSize: 8.5, italic: true, color: MUTED, margin: 0, valign: "middle" });
  });
  footer(s, "Mechanics confirmed on official pricing/help pages; a few rates via vendor-citing secondary sources.");

  // ============ SLIDE 8 — END-OF-FUNNEL CHEAT SHEET ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part A · summary", AMBER, "End-of-funnel cheat sheet", I.clip_w, AMBER);
  const rows = [
    ["Tactic", "Steal from", "The specific mechanic"],
    ["Frictionless run-out", "Cursor · Copilot", "Soft-continue + “set a $ budget” menu; never downgrade quality"],
    ["True auto-recharge", "ElevenLabs", "Reload $X when balance < $Y; pause only on a failed charge"],
    ["Top-up that drives upsize", "Clay", "+30% premium on top-ups makes upsizing the base plan rational"],
    ["Sticky pre-paid credits", "ElevenLabs · Descript", "“Used after allowance” ordering + 12-month expiry"],
    ["Tiered overage → ceiling", "Zapier", "1.25× per-task premium, then hard stop at 3× the limit"],
    ["Hard cap as admin safety", "Copilot · Replit", "Block is an opt-in admin control, not the default"]
  ];
  const tdata = rows.map((r, ri) => r.map((c, ci) => ({
    text: c,
    options: ri === 0
      ? { fill: { color: INK }, color: WHITE, bold: true, fontSize: 11.5, align: ci === 2 ? "left" : "left", valign: "middle" }
      : { fill: { color: ri % 2 ? WHITE : CARD }, color: ci === 0 ? TEXT : (ci === 1 ? VIOLET : "44465E"), bold: ci === 0, fontSize: 10.5, valign: "middle", align: "left" }
  })));
  s.addTable(tdata, { x: 0.5, y: 1.55, w: 9.0, colW: [2.5, 1.95, 4.55], rowH: [0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], border: { pt: 0.5, color: BORDER }, margin: [3, 6, 3, 6], fontFace: "Arial" });
  footer(s, "Cross-company synthesis · Part A.");

  // ============ SLIDE 9 — PART B DIVIDER ============
  s = pres.addSlide();
  s.background = { color: INK };
  s.addShape(pres.shapes.OVAL, { x: 7.2, y: 2.6, w: 4.6, h: 4.6, fill: { color: INK2 }, line: { type: "none" } });
  iconCircle(s, I.chart_w, 0.7, 1.45, 0.9, MINT);
  s.addText("PART B", { x: 0.72, y: 2.55, w: 8, h: 0.4, fontFace: "Arial", fontSize: 15, bold: true, color: MINT, charSpacing: 5, margin: 0 });
  s.addText("Demonstrating the value", { x: 0.68, y: 2.85, w: 9, h: 0.9, fontFace: "Georgia", fontSize: 40, bold: true, color: WHITE, margin: 0 });
  s.addText("Almost everyone built a cost-control meter. Almost no one built a value surface. That gap is the opportunity.",
    { x: 0.72, y: 3.95, w: 8.4, h: 0.6, fontFace: "Arial", fontSize: 13, italic: true, color: "C7C9E8", margin: 0 });

  // ============ SLIDE 10 — CREDIT = UNIT OF WORK ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part B · the foundation", MINT, "Make the credit = a unit of real work", I.check_w, MINT);
  card(s, 0.5, 1.55, 4.45, 2.05, {
    accent: MINT, title: "Intercom Fin  ·  $0.99 per resolution",
    body: "Charged only when the customer's issue is actually resolved. If a “resolved” ticket re-opens — even across billing periods — the charge is clawed back.",
    who: "Pitch: every dollar billed = one deflected human ticket."
  });
  card(s, 5.05, 1.55, 4.45, 2.05, {
    accent: VIOLET, title: "Salesforce Agentforce  ·  $0.10 / action",
    body: "Pivoted from $2 / conversation to per-action Flex Credits because “businesses faced a fundamental mismatch between pricing and value.”",
    who: "Coarse → fine metering so the bill tracks real work."
  });
  // strip
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.78, w: 9.0, h: 0.7, fill: { color: CARD }, line: { color: BORDER, width: 1 } });
  s.addText([
    { text: "Media gen sells the deliverable, not the credit:  ", options: { bold: true, color: TEXT } },
    { text: "ElevenLabs / Synthesia / HeyGen = minutes · Runway = seconds · Midjourney = GPU hours.", options: { color: "44465E" } }
  ], { x: 0.7, y: 3.78, w: 8.6, h: 0.7, fontFace: "Arial", fontSize: 11, margin: 0, valign: "middle" });
  insight(s, "For monday: define the credit as a recognizable work artifact (a completed automation, an updated item) — never an opaque “AI action.”", 4.66, MINT);

  // ============ SLIDE 11 — ADMIN DASHBOARDS ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part B · the surface", MINT, "Admin consumption dashboard + attribution", I.grid_w, MINT);
  const dcards = [
    ["HubSpot", "REFERENCE", "Usage & Limits → per-feature breakdown (“Manage Credit Usage by Feature”) + historical usage log.", MINT],
    ["Synthesia", "EXPORTABLE", "Allocate credits per workspace + export .csv of consumption by feature / user / workspace (Insights tab).", VIOLET],
    ["Replit", "ENTERPRISE", "Per-member & per-app consumption, budget-vs-spend, exportable reports for accounting.", VIOLET],
    ["Cursor", "POOLED", "Admin usage analytics + pooled team usage “to maximize budget efficiency.”", MINT]
  ];
  dcards.forEach((d, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.5 + col * 4.6, y = 1.55 + row * 1.45;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.4, h: 1.3, fill: { color: CARD }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.08, h: 1.3, fill: { color: d[3] }, line: { type: "none" } });
    s.addText(d[0], { x: x + 0.24, y: y + 0.13, w: 2.6, h: 0.34, fontFace: "Arial", fontSize: 14, bold: true, color: TEXT, margin: 0 });
    s.addText(d[1], { x: x + 2.4, y: y + 0.16, w: 1.9, h: 0.26, fontFace: "Arial", fontSize: 8.5, bold: true, color: d[3], charSpacing: 2, align: "right", margin: 0, valign: "middle" });
    s.addText(d[2], { x: x + 0.24, y: y + 0.5, w: 4.0, h: 0.72, fontFace: "Arial", fontSize: 10, color: "44465E", margin: 0, lineSpacingMultiple: 1.03 });
  });
  insight(s, "The multi-seat upsell engine = a pooled account balance + an admin attribution surface. This is the most replicable, most monday-relevant mechanic.", 4.66, MINT);

  // ============ SLIDE 12 — THRESHOLD ALERT LADDER ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part B · the nudge", MINT, "Staged threshold alerts = the upsell ladder", I.bell_w, MINT);
  // ascending bars
  const ladder = [["75%", "EAF8F5", MINT], ["85%", "D6F1EB", MINT], ["90%", "FDF3E2", AMBER], ["100%", "FBE3DE", "C0392B"]];
  const lx0 = 1.1, lbw = 1.7, lgap = 0.42, baseY = 4.0, maxH = 2.0;
  ladder.forEach((l, i) => {
    const hgt = maxH * (0.45 + i * 0.18);
    const x = lx0 + i * (lbw + lgap);
    const y = baseY - hgt;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: lbw, h: hgt, fill: { color: l[1] }, line: { color: l[2], width: 1.25 } });
    s.addText(l[0], { x, y: y - 0.02, w: lbw, h: 0.5, fontFace: "Georgia", fontSize: 22, bold: true, color: l[2], align: "center", margin: 0, valign: "bottom" });
    s.addText(["soft reminder", "watch usage", "near cap", "over limit"][i], { x, y: baseY + 0.06, w: lbw, h: 0.3, fontFace: "Arial", fontSize: 9.5, color: MUTED, align: "center", margin: 0 });
  });
  s.addShape(pres.shapes.LINE, { x: lx0, y: baseY, w: 4 * lbw + 3 * lgap + 0.0 - (lbw - lbw), h: 0, line: { color: BORDER, width: 1 } });
  s.addText("Who fires staged alerts:", { x: 0.5, y: 4.46, w: 9, h: 0.3, fontFace: "Arial", fontSize: 11, bold: true, color: TEXT, margin: 0 });
  s.addText("HubSpot 75 / 85 / 90 / over-limit   ·   Synthesia 75 / 90 / 100   ·   Copilot 75 / 90 / 100   ·   Atlassian Rovo 80 / 100",
    { x: 0.5, y: 4.74, w: 9, h: 0.3, fontFace: "Arial", fontSize: 10.5, color: "44465E", margin: 0 });
  insight(s, "Escalating alerts manufacture the upgrade conversation before the hard wall — the single most replicable mechanic.", 5.04, MINT);

  // ============ SLIDE 13 — ROI / HOURS-SAVED ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part B · the proof", MINT, "ROI framing on the buying surface (rare)", I.clock_w, MINT);
  const roi = [
    ["Jasper", "Best ROI tooling", "Admin analytics surfaces total generations, active users, and “hours saved” — arms the budget owner directly.", MINT],
    ["GitHub Copilot", "On the pricing page", "“55% more productive” and “75% higher job satisfaction” placed where the purchase decision happens.", VIOLET],
    ["Anthropic", "Capacity headroom", "In-product headroom charts turn “near your limit” into an upgrade nudge; worked ROI “~$37 per 10,000 tickets.”", MINT]
  ];
  roi.forEach((r, i) => {
    const x = 0.5 + i * 3.04;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.55, w: 2.9, h: 2.55, fill: { color: CARD }, line: { color: BORDER, width: 1 }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.55, w: 2.9, h: 0.08, fill: { color: r[3] }, line: { type: "none" } });
    s.addText(r[0], { x: x + 0.22, y: 1.74, w: 2.5, h: 0.4, fontFace: "Georgia", fontSize: 16, bold: true, color: TEXT, margin: 0 });
    s.addText(r[1], { x: x + 0.22, y: 2.14, w: 2.5, h: 0.3, fontFace: "Arial", fontSize: 9.5, bold: true, color: r[3], charSpacing: 1, margin: 0 });
    s.addText(r[2], { x: x + 0.22, y: 2.5, w: 2.5, h: 1.5, fontFace: "Arial", fontSize: 10.5, color: "44465E", margin: 0, lineSpacingMultiple: 1.05 });
  });
  insight(s, "Very few put hard value numbers where the purchase decision happens — the dashboard is a meter, not a proof of value.", 4.45, MINT);
  footer(s, "Claims per official pricing / docs pages.");

  // ============ SLIDE 14 — THE GAP / OPPORTUNITY ============
  s = pres.addSlide();
  s.background = { color: WHITE };
  header(s, "Part B · the opportunity", MINT, "The market gap = a value-framed notification", I.bulb_w, MINT);
  s.addText([
    { text: "Across all 26 products, the admin surface is framed as ", options: { color: TEXT } },
    { text: "cost-control / spend-anxiety", options: { bold: true, color: AMBER } },
    { text: " — not ", options: { color: TEXT } },
    { text: "value / ROI.", options: { bold: true, color: MINT } },
    { text: "  Almost no one sends a value-framed low-balance email.", options: { color: TEXT } }
  ], { x: 0.5, y: 1.5, w: 9.0, h: 0.7, fontFace: "Arial", fontSize: 13, margin: 0, valign: "middle", lineSpacingMultiple: 1.05 });
  // mock notification (value-framed)
  const nx = 1.3, ny = 2.4, nw = 7.4, nh = 1.6;
  s.addShape(pres.shapes.RECTANGLE, { x: nx, y: ny, w: nw, h: nh, fill: { color: "EAF8F5" }, line: { color: MINT, width: 1.5 }, shadow: shadow() });
  iconCircle(s, I.envelope_w, nx + 0.28, ny + 0.32, 0.62, MINT);
  s.addText("Your AI is paying off this month", { x: nx + 1.15, y: ny + 0.22, w: nw - 1.4, h: 0.36, fontFace: "Arial", fontSize: 14, bold: true, color: "0A5C50", margin: 0 });
  s.addText([
    { text: "Your team's credits automated ", options: { color: "1A3A35" } },
    { text: "1,240 tasks", options: { bold: true, color: "0A5C50" } },
    { text: " and saved an estimated ", options: { color: "1A3A35" } },
    { text: "~63 hours", options: { bold: true, color: "0A5C50" } },
    { text: ". You're at 88% of your balance — ", options: { color: "1A3A35" } },
    { text: "add credits to keep automations running →", options: { bold: true, color: "009A86" } }
  ], { x: nx + 1.15, y: ny + 0.6, w: nw - 1.45, h: 0.9, fontFace: "Arial", fontSize: 11.5, margin: 0, valign: "top", lineSpacingMultiple: 1.1 });
  s.addText("Illustrative — the value-framed notification almost no competitor sends today.", { x: nx, y: ny + nh + 0.05, w: nw, h: 0.26, fontFace: "Arial", fontSize: 8.5, italic: true, color: MUTED, align: "center", margin: 0 });
  insight(s, "Convert the consumption meter into a proof-of-value surface aimed at the budget owner. That is the differentiated play.", 4.66, MINT);

  // ============ SLIDE 15 — SO WHAT FOR MONDAY ============
  s = pres.addSlide();
  s.background = { color: INK };
  iconCircle(s, I.rocket_w, 0.5, 0.45, 0.66, MINT);
  s.addText("RECOMMENDATIONS", { x: 1.3, y: 0.42, w: 8, h: 0.26, fontFace: "Arial", fontSize: 11, bold: true, color: MINT, charSpacing: 3, margin: 0, valign: "middle" });
  s.addText("So what for monday.com", { x: 1.3, y: 0.66, w: 8, h: 0.55, fontFace: "Georgia", fontSize: 26, bold: true, color: WHITE, margin: 0, valign: "middle" });
  const recs = [
    ["Architecture", "Account-level credit pool. End-users spend; admin owns budget, dashboard & purchase."],
    ["Default behavior", "Soft-continue + overage; expose a hard cap as an admin safety (Copilot / Replit)."],
    ["Name the unit", "Define the credit as a monday work artifact — not an opaque “AI action.”"],
    ["Win the gap", "Value dashboard + value-framed low-balance email: Jasper hours-saved × HubSpot attribution × Synthesia export."],
    ["Add auto-recharge", "Ship true auto-reload (ElevenLabs model) — highest leverage, least adopted."]
  ];
  recs.forEach((r, i) => {
    const y = 1.45 + i * 0.72;
    s.addShape(pres.shapes.OVAL, { x: 0.5, y, w: 0.46, h: 0.46, fill: { color: i === 3 ? MINT : INK2 }, line: { color: i === 3 ? MINT : VIOLET, width: 1.25 } });
    s.addText(String(i + 1), { x: 0.5, y, w: 0.46, h: 0.46, fontFace: "Georgia", fontSize: 16, bold: true, color: i === 3 ? INK : WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText(r[0], { x: 1.1, y: y - 0.04, w: 2.3, h: 0.5, fontFace: "Arial", fontSize: 13, bold: true, color: i === 3 ? MINT : "C7C9E8", margin: 0, valign: "middle" });
    s.addText(r[1], { x: 3.35, y: y - 0.04, w: 6.15, h: 0.6, fontFace: "Arial", fontSize: 11, color: "E2E3F2", margin: 0, valign: "middle", lineSpacingMultiple: 1.0 });
  });
  s.addText("Next: live screen-capture of competitor modals & auto-recharge UIs · battlecard vs. a named competitor · log to monday board.",
    { x: 0.5, y: 5.12, w: 9, h: 0.3, fontFace: "Arial", fontSize: 9, italic: true, color: "6F72A8", margin: 0 });

  await pres.writeFile({ fileName: "AI-Credit-Monetization.pptx" });
  console.log("written");
}
main().catch(e => { console.error(e); process.exit(1); });
