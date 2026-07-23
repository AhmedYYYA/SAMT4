# SAMT Phase 3.4 Deployment Guide

## Upload target

Repository: `AhmedYYYA/SAMT4`  
Branch: `main` or a review branch merged into `main`  
GitHub Pages path: repository root

## Mandatory files

```text
index.html
styles.v3.4.css
app.v3.4.js
assets/hero/hero-earth-approved-v3.4.webp
assets/hero/hero-earth-approved-v3.4.jpg
assets/stations/uae-animated-v3.4.svg
assets/stations/uk-animated-v3.4.svg
assets/stations/france-animated-v3.4.svg
assets/stations/usa-animated-v3.4.svg
```

Upload the entire package contents so all brand, icon, manifest, modal and support assets remain available.

## Deployment sequence

1. Remove or overwrite the previous release files.
2. Upload all Phase 3.4 contents to the repository root.
3. Confirm `index.html` loads `styles.v3.4.css` and `app.v3.4.js`.
4. Confirm the four v3.4 station SVG files exist under `assets/stations/`.
5. Wait for the GitHub Pages deployment to finish.
6. Open the website in a private window.
7. Perform the live visual checklist in `PHASE3_4_QA_CHECKLIST.md`.

## Cache control

The production filenames are versioned, so normal refresh should load Phase 3.4. Safari users may also use `Command + Shift + R` after deployment.
