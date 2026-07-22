# SAMT Website Phase 3 — Final Production Release

**SAMT — Strategic Advancement, Management & Transformation**  
**برنامج سَمْت للتقدم الاستراتيجي والإدارة والتحول**  
**From Potential to Command | من الإمكانات إلى القيادة**

## Purpose

This release consolidates the approved SAMT brand identity, programme narrative, animated preparation stations and premium motion system into a GitHub Pages-ready bilingual website.

## Main improvements in Phase 3

- Restored the validated Strategic Ascent symbol, Arabic wordmark, favicon and icon sprite.
- Integrated the four approved animated SVG preparation stations.
- Corrected station artwork scaling to preserve the complete SVG composition without cropping.
- Raised typography sizes across navigation, cards, station panels, modals, pop-ups and footers.
- Added Arabic-specific readability refinements and complete RTL behavior.
- Added station autoplay pause/resume, keyboard navigation and resilient asset fallbacks.
- Added asset preloading and smoother station transitions.
- Added deployment support files: manifest, 404 page, robots.txt, sitemap.xml and .nojekyll.
- Preserved GSAP, ScrollTrigger and Lenis integration with reduced-motion fallbacks.

## Deployment

Upload the **contents** of this folder to the repository root. Keep the folder structure unchanged.

```text
index.html
styles.css
app.js
manifest.webmanifest
404.html
robots.txt
sitemap.xml
.nojekyll
assets/
  brand/
  icons/
  stations/
preview/
docs/
```

The production URL is configured as:

```text
https://ahmedyyya.github.io/SAMT4/
```

## External libraries

The page loads these exact versions from jsDelivr:

- GSAP 3.12.5
- GSAP ScrollTrigger 3.12.5
- Lenis 1.0.42

## Browser support

Designed for current versions of Safari, Chrome, Edge and Firefox. Real-device validation is still recommended after deployment, particularly on iOS Safari.

## Governance note

The website is a programme concept and brand implementation. Proposed partners, dates, host categories and programme arrangements remain subject to formal approval and agreement.
