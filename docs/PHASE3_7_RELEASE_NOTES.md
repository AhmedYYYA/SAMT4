# SAMT Phase 3.7 — Cinematic Experience

## Approved requirements implemented

### Note 01 — Preparation Station
- Desktop station composition now keeps the animated SVG fully visible using proportional `object-fit: contain` scaling.
- Artwork remains on the left and the complete information panel remains visible on the right.
- Tablet and mobile retain a stacked artwork-first composition.
- Fine-pointer parallax and station-change reveal are restrained and disabled for reduced-motion users.

### Note 02 — Language-aware Hero
- The identity panel remains a live semantic HTML/SVG element.
- English: copy left, identity panel right.
- Arabic: copy right, identity panel left.
- Language changes trigger direction-aware motion without embedding text in a background image.

### Note 03 — Leader Journey
- One journey card is presented at centre stage at a time.
- Each stage emerges from depth, enlarges, receives the spotlight, then recedes into the completed timeline.
- The stage heading and description update in synchronisation.
- A visible skip control completes the journey immediately.
- Mobile uses a readable sequential scroll layout without forced cinematic timing.

### Note 04 — Story Transition
- Story links invoke a 3.8-second cinematic bridge.
- The sequence includes the SAMT symbol, Arabic wordmark, language-specific title and narrative line.
- Skip is available by button, Escape, wheel or pointer interaction.
- Arrival continuity is preserved through session state and a soft Story-page reveal.

## Quality controls
- JavaScript syntax checks.
- Local asset and reference validation.
- Duplicate-ID validation.
- Accessibility baseline checks.
- Phase 3.7-specific assertions for station containment, journey sequencing and Story transition timing.

## Build
`3.7.0`
