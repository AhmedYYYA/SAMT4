# Phase 3 Release Notes

## Visual integrity

The validated Strategic Ascent symbol now appears in the loader, header, mobile navigation, footer and programme modal. The bespoke Arabic wordmark is used in the hero identity panel.

## Readability

The Phase 2 design used multiple text sizes below 12 px. Phase 3 introduces a practical typography floor and increases the size and line-height of navigation, station data, cards, governance labels, modals, pop-ups and footer content. Arabic typography receives additional scale and line-height.

## Preparation stations

The UAE, United Kingdom, France and United States animated SVGs are retained as the authoritative station assets. Their 1672 × 941 ratio is preserved through `object-fit: contain` and a matching visual container ratio.

The station control system now includes:

- Previous and next navigation
- Pause and resume for autoplay
- Arrow-key, Home and End navigation
- Focus and hover pause behavior
- Lazy idle preloading of later stations
- Missing-asset fallback messaging

## Accessibility

- Keyboard-operable station route
- Autoplay pause control
- Visible focus states
- Reduced-motion mode
- Dialog keyboard behavior
- Semantic headings and live-region station updates

## Deployment

The package includes a web manifest, branded 404 page, robots.txt, sitemap.xml and `.nojekyll` for GitHub Pages.
