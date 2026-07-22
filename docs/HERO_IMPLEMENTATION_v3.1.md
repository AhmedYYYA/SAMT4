# SAMT Phase 3.1 — Approved Cinematic Hero Implementation

## Implementation status

The approved hero direction has been implemented as a responsive layered composition rather than a flat screenshot.

## Layer architecture

1. **Earth horizon base**
   - `assets/hero/hero-earth-base.avif`
   - `assets/hero/hero-earth-base.webp`
   - `assets/hero/hero-earth-base.svg`
   - The left side is deliberately darkened to protect headline contrast.

2. **Animated global network overlay**
   - `assets/hero/hero-network-overlay.svg`
   - Includes illuminated nodes, strategic connections, subtle star particles and reduced-motion rules.

3. **Strategic ascent trajectories**
   - Existing inline SVG trajectories remain independently animated.
   - Route geometry was repositioned to avoid crossing the headline and to converge at the command star.

4. **Atmospheric layers**
   - CSS-based blue and champagne-gold atmospheric glow.
   - Subtle grid and parallax movement.

5. **Validated SAMT identity**
   - The approved Arabic wordmark SVG remains the geometric source.
   - A monochrome champagne-gold presentation is applied through an SVG mask for dark-background legibility.

## Responsive behaviour

- Desktop: two-column hero with Earth and identity panel on the right.
- Tablet: single-column content with the identity panel below the main message.
- Mobile: reduced Earth intensity, reduced route density and constrained title scale.

## Accessibility

- `prefers-reduced-motion` disables background drift, atmospheric breathing and panel sheen.
- Existing semantic headings, navigation, alternative text and keyboard interactions are retained.

## Performance

- AVIF and WebP are used where `image-set()` is supported.
- SVG remains the fallback and source-quality format.
- Total new hero asset payload is under 100 KB excluding browser cache and compression headers.
