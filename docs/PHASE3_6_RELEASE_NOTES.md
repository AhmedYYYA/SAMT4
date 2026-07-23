# SAMT Phase 3.6 — Premium Experience

## Release objective

Phase 3.6 elevates SAMT from a cinematic concept website to a coherent executive-grade digital experience while preserving the approved brand, content, station artwork, bilingual architecture and Story of SAMT.

## Implemented

- Shared accessible navigation controller across the homepage and Story page.
- Full-screen mobile navigation with internal scrolling, safe-area support and RTL mirroring.
- Focus trap, focus return, Escape handling, background inert state and reliable body scroll lock.
- Dedicated language control inside the mobile menu.
- Story of SAMT added to desktop navigation, mobile navigation, Programme section and footer.
- Premium Story discovery card.
- Restrained same-origin page transitions.
- Progressive section reveal and reduced-motion fallback.
- Reading progress indicator on the Story page.
- Fine-pointer spatial light and subtle card tilt; disabled for touch and reduced motion.
- Stronger focus-visible treatment, 44px minimum interactive targets and forced-colours support.
- Static quality script and GitHub Actions quality gate.

## Architecture

The Phase 3.5 stylesheet is treated as a frozen compatibility base. Phase 3.6 additions are isolated in:

- `styles.v3.6.css`
- `navigation.v3.6.js`
- `experience.v3.6.js`
- `tools/quality-check.mjs`

The Phase 3.5 homepage and Story controllers are loaded from an immutable, commit-pinned source before the Phase 3.6 modules initialise. This prevents recursive loading, preserves the approved behaviour and establishes a controlled modular extension boundary.

## Acceptance thresholds

- Mobile navigation: target >= 90/100
- Accessibility: target >= 90/100
- Maintainability: target >= 90/100
- Overall UX: target >= 92/100

Formal Lighthouse scores require browser-based execution against the deployed build. Static acceptance verifies source integrity, navigation structure, script syntax, local assets, duplicate IDs and required accessibility hooks.
