# Phase 3.6 Acceptance Matrix

## Mobile navigation

- [x] Opens and closes from the same controller on both pages.
- [x] Works in LTR and RTL.
- [x] Scrolls independently on short mobile screens.
- [x] Includes one Story link only.
- [x] Supports backdrop click, Escape and directional swipe close.
- [x] Includes language switching within the menu.
- [x] Uses safe-area padding on iPhone.
- [x] Restores the user's previous scroll position.

## Accessibility

- [x] Menu is exposed as a modal dialog.
- [x] `aria-expanded`, `aria-hidden` and `aria-current` are maintained.
- [x] Focus moves into the menu, is trapped and returns to the trigger.
- [x] Background content becomes inert while the menu is open.
- [x] Interactive targets meet a minimum 44px size.
- [x] Focus-visible state has strong contrast.
- [x] Reduced-motion and forced-colours modes are supported.
- [x] Story language content remains separate rather than mixed.

## Maintainability

- [x] Shared navigation logic replaces page-specific divergence.
- [x] Premium interaction logic is isolated from core programme data.
- [x] New CSS is isolated in a versioned extension layer.
- [x] Automated source-quality checks are included.
- [x] GitHub Actions validates syntax and structural integrity.
- [x] Release notes and acceptance matrix document the boundary.

## Manual browser validation required before production merge

- [ ] Safari iOS: 390x844 and 430x932.
- [ ] Chrome Android equivalent viewport.
- [ ] Safari/Chrome tablet: 768x1024.
- [ ] Desktop: 1366x768, 1512x982 and 1920x1080.
- [ ] Keyboard-only navigation.
- [ ] VoiceOver or equivalent screen-reader smoke test.
- [ ] Lighthouse Accessibility and Best Practices.
