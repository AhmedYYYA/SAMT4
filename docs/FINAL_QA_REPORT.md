# SAMT Website Phase 3.4 — Final QA Report

## Build assessed

- Build: `phase3-v3.4`
- Version: `3.4.0`
- Production HTML: `index.html`
- Production CSS: `styles.v3.4.css`
- Production JavaScript: `app.v3.4.js`

## Static validation result

**PASS**

The following checks passed:

- JavaScript syntax validation
- CSS parsing and brace balance
- HTML duplicate-ID scan
- Local HTML and CSS asset resolution
- Four station SVG XML parses
- Four station animation definitions
- Seven orbit items and seven counter-rotating carriers
- English and Arabic Critical Thinking translation keys
- UAE / UK / France / USA durations of 3 / 6 / 3 / 4 weeks
- Sixteen-week programme total
- No obsolete duration placeholder in production files
- Versioned CSS, JavaScript, hero and station references
- Full-width desktop station composition using `object-fit: contain`
- Approved mobile station caption and card arrangement
- Transparent horizontal SAMT station signature with no hard logo rectangle
- Mobile station SVG rule that hides the desktop signature to preserve the approved mobile artwork
- One hero identity panel on desktop and restored live semantic panel on stacked layouts
- Reduced-motion orbit fallback

Machine-readable evidence is available in `STATIC_QA_REPORT_v3.4.json`.

## Visual proofs generated

- `preview/v3.4/hero-desktop-final.png`
- `preview/v3.4/hero-mobile-final.png`
- `preview/v3.4/desktop-station-final.png`
- `preview/v3.4/mobile-station-approved-layout.png`
- `preview/v3.4/selection-orbit-desktop-final.png`
- `preview/v3.4/selection-orbit-mobile-final.png`

The proofs confirm that the desktop station artwork is no longer covered by a vertical information panel, the approved mobile card remains intact, the station signature has no blank rectangular background, the hero identity is not duplicated, and the seven dimensions orbit the fixed `10 Future Leaders` core.

## Deployment limitation

Local validation cannot certify the final GitHub Pages rendering in every browser. After deployment, complete the documented Safari, Chrome, Edge, iOS Safari, Android Chrome, English LTR and Arabic RTL checks before locking v3.4 as the production baseline.
