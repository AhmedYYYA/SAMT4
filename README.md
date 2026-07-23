# SAMT Website Phase 3.4

**SAMT — Strategic Advancement, Management & Transformation**  
**برنامج سَمْت للتقدم الاستراتيجي والإدارة والتحول**  
**From Potential to Command | من الإمكانات إلى القيادة**

## Release purpose

Phase 3.4 corrects the published desktop composition while preserving the approved mobile preparation-station design and the approved SAMT visual direction.

## Authoritative production files

```text
index.html
styles.v3.4.css
app.v3.4.js
assets/
  brand/
  hero/
    hero-earth-approved-v3.4.webp
    hero-earth-approved-v3.4.jpg
  icons/
  stations/
    uae-animated-v3.4.svg
    uk-animated-v3.4.svg
    france-animated-v3.4.svg
    usa-animated-v3.4.svg
```

`styles.css` and `app.js` are retained as synchronized compatibility copies, but `index.html` intentionally loads the versioned v3.4 files to prevent mixed browser caches.

## Phase 3.4 corrections

- Desktop and laptop station artwork is displayed at full width above the information panel; it is no longer cropped behind a vertical content column.
- The approved mobile station arrangement is preserved.
- The original placeholder logo is removed from each station scene and the validated SAMT signature is printed directly over the cleaned artwork without a hard rectangular panel.
- Desktop hero rendering displays one identity panel only. On stacked tablet/mobile layouts, the live semantic identity panel is restored and the background crop excludes the baked reference panel.
- Seven selection dimensions orbit the fixed “10 Future Leaders” centre while remaining upright and readable.
- Reduced-motion mode stops orbital and decorative animation.
- Versioned CSS, JavaScript, station SVGs and hero assets prevent stale mixed releases.
- Station durations remain UAE 3 weeks, UK 6 weeks, France 3 weeks and USA 4 weeks, for a 16-week total.

## Deployment

Upload the **contents of this folder** to the root of `AhmedYYYA/SAMT4`, replacing the previous release. Do not upload the outer folder itself.

After GitHub Pages finishes publishing, test in a private browser window first. Safari users should also use `Command + Shift + R` once.

## Validation status

Static validation passed for JavaScript syntax, duplicate HTML IDs, local asset references, SVG parsing, translation keys, duration data, CSS structure and versioned production paths.

Live Safari, Chrome, Edge, iOS and Android visual acceptance must be completed after deployment because the final GitHub Pages rendering cannot be fully certified from the local static checks alone.
