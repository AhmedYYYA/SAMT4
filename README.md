# SAMT Website — Phase 2 v2.0

**SAMT — Strategic Advancement, Management & Transformation**  
**برنامج سَمْت للتقدم الاستراتيجي والإدارة والتحول**  
**From Potential to Command | من الإمكانات إلى القيادة**

This package advances the approved Phase 1 prototype into a complete bilingual leadership-programme website. It uses the approved Strategic Ascent brand identity and the approved cinematic near-black, deep-navy and champagne-gold creative direction.

## Main files

- `index.html` — semantic page architecture and all website sections
- `styles.css` — complete responsive visual system
- `app.js` — GSAP, ScrollTrigger, Lenis, bilingual content, station carousel, dialogs and interaction logic
- `assets/brand/` — approved SAMT production logo assets
- `assets/stations/` — approved animated UAE, UK, France and USA station scenes
- `assets/icons/samt-icons.svg` — custom line-icon sprite
- `docs/` — deployment, motion, content and QA documentation
- `preview/approved-creative-reference.png` — approved aesthetic reference; not loaded by the production website

## Implemented sections

1. Strategic Ascent hero
2. Programme proposition and metrics
3. Six-stage leadership journey
4. Selective admission framework
5. Four animated international preparation stations
6. Command-oriented competency framework
7. Continuous assessment and governance model
8. Institutional impact framework
9. Nomination and admission section
10. Final command-readiness statement

## Interaction system

- GSAP 3.12.5
- GSAP ScrollTrigger 3.12.5
- Lenis 1.0.42
- Canvas particles
- Animated SVG trajectories
- Custom cursor states
- Magnetic buttons
- Card tilt and hover responses
- Scroll-pinned leadership journey
- Animated station carousel with keyboard-accessible controls
- Native accessible dialogs with custom branded presentation
- English LTR and Arabic RTL language switching
- Reduced-motion support

## Run locally

Use a local web server rather than opening the file directly:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

The exact CDN libraries and Google Fonts require an internet connection.

## Deploy to GitHub Pages

Upload the complete contents of this folder to the repository root. Do not upload only `index.html`; the `assets` directory, `styles.css` and `app.js` are required.

Recommended repository root:

```text
index.html
styles.css
app.js
assets/
docs/
manifest.webmanifest
robots.txt
404.html
```

See `docs/DEPLOYMENT_GUIDE.md` for the full procedure.

## Important content boundary

The host categories, preparation activities and programme arrangements are illustrative and subject to formal approval, coordination and agreement. The website does not claim confirmed partnerships.

## v2.1 station asset correction

The four approved animated SVG files are included using the exact filenames already referenced by `index.html` and `app.js`:

```text
assets/stations/uae-animated.svg
assets/stations/uk-animated.svg
assets/stations/france-animated.svg
assets/stations/usa-animated.svg
```

GitHub Pages paths and filenames are case-sensitive. Upload the full `assets` directory and do not rename it to `Assets` or `Stations`.

Use `station-assets-test.html` after deployment to verify the four files independently.
