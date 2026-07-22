# GitHub Pages Deployment Guide

## 1. Repository structure

Place these files in the repository root:

```text
index.html
styles.css
app.js
manifest.webmanifest
robots.txt
404.html
assets/
docs/
preview/
```

## 2. Commit and publish

1. Open the repository on GitHub.
2. Upload the complete package contents.
3. Confirm `index.html` is in the repository root.
4. Open **Settings → Pages**.
5. Select the intended branch and `/root` folder.
6. Save and wait for the Pages workflow to complete successfully.

## 3. Verify

Check:

- The SAMT logo loads in the header.
- The UAE animated station loads first.
- UK, France and USA load when their route nodes are selected.
- English/Arabic switching changes direction and content.
- Pop-ups open and close using the mouse, keyboard and Escape key.
- The mobile menu opens and closes correctly.
- The exact GSAP, ScrollTrigger and Lenis CDN resources load.

## 4. Cache refresh

After replacing a previous version, use a hard refresh or open the site in a private browser window. GitHub Pages and browser caching may temporarily display older assets.

## 5. Common failure modes

### Missing animated stations
The `assets/stations` directory was not uploaded or its path changed.

### Missing brand logo
The `assets/brand` directory was omitted.

### No animation
A CDN may be blocked. The content remains visible, but GSAP/Lenis motion requires the external libraries.

### Oversized interface
Confirm the viewport contains a valid meta tag and that `styles.css` is the Phase 2 file.
