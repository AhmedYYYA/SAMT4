# SAMT Phase 4 — World-Class Major Enhancement

## Status
Approved and active.

## Objective
Implement every validated audit finding for the SAMT website through a controlled, step-by-step enhancement programme. No item is considered complete until its remediation, verification evidence and acceptance gate are recorded.

## Governing principles

1. Preserve the approved SAMT brand, narrative and Phase 3.7 experience direction.
2. Separate design quality from measurable accessibility, performance, security and engineering quality.
3. Treat English and Arabic as equal first-class experiences.
4. Do not merge incomplete or unverified work into `main`.
5. Maintain graceful degradation when JavaScript, animation or external resources are unavailable.
6. Respect user intent: transitions and motion must be skippable, interruptible and reduced when requested.

## Phase 4 workstreams

### 4.1 Baseline and release control
- Freeze the current `main` implementation as the audit baseline.
- Maintain all Phase 4 work in `phase4-world-class-enhancement`.
- Create a traceability matrix linking each finding to code changes, tests and evidence.
- Confirm the live GitHub Pages deployment source before release.

Acceptance gate:
- Baseline commit recorded.
- All audit findings represented in the traceability matrix.
- No direct unreviewed changes to `main`.

### 4.2 Architecture and maintainability
- Refactor the monolithic stylesheet into controlled layers:
  - `tokens.css`
  - `base.css`
  - `layout.css`
  - `components.css`
  - `motion.css`
  - `story.css`
  - `responsive.css`
- Separate page-specific JavaScript from shared site behaviour.
- Remove dead, duplicated and superseded rules.
- Introduce explicit build/version identifiers and cache-safe asset naming.

Acceptance gate:
- No visual regression against approved design.
- No duplicate critical selectors.
- Shared and page-specific responsibilities are documented.

### 4.3 Bilingual and RTL architecture
- Treat Arabic and English as independent, equivalent experiences.
- Implement reliable `lang` and `dir` state changes.
- Verify title, labels, navigation, focus order and accessible names in each language.
- Evaluate and implement separate language URLs where feasible:
  - `/en/story-of-samt.html`
  - `/ar/story-of-samt.html`
- Add reciprocal `hreflang` and `x-default` declarations.
- Ensure Arabic motion direction, alignment and component order are intentionally mirrored.

Acceptance gate:
- Arabic and English pass independent visual, keyboard and screen-reader checks.
- No mixed-language metadata or incorrect reading direction.
- Search engines can discover both language versions.

### 4.4 Story experience and Phase 3.7 integration
- Preserve the approved Story of SAMT content.
- Implement the approved 3–4 second cinematic transition as an intentional narrative bridge.
- Make the transition:
  - skippable;
  - interruptible by click, scroll, keyboard and Escape;
  - reduced on repeat visits;
  - bypassed for deep links;
  - replaced by a minimal dissolve under reduced-motion preferences.
- Add progressive chapter reveals without obstructing reading.
- Introduce a clear reading-progress treatment using the SAMT ascent motif.
- Strengthen the signature quotation and closing return sequence.

Acceptance gate:
- First visit provides the complete cinematic sequence.
- Repeat visits and reduced-motion mode do not impose unnecessary delay.
- Focus lands correctly on the Story heading after transition.
- Content remains fully readable with JavaScript disabled.

### 4.5 Accessibility and inclusive design
- Target WCAG 2.2 AA.
- Verify:
  - keyboard navigation;
  - visible focus states;
  - logical focus order;
  - colour contrast;
  - semantic heading structure;
  - language declarations;
  - touch-target size;
  - reduced-motion behaviour;
  - screen-reader announcements;
  - skip-link operation;
  - menu and modal focus management.
- Remove or remediate serious automated accessibility violations.

Acceptance gate:
- No serious or critical Axe findings.
- Complete keyboard-only journey passes.
- Arabic and English screen-reader smoke tests pass.
- Motion-sensitive users receive a stable experience.

### 4.6 Performance and Core Web Vitals
- Defer or module-load non-critical scripts.
- Reduce render-blocking resources.
- Self-host or rationalise fonts and weights where appropriate.
- Audit canvas, particles, blur, grain and scroll effects for frame stability.
- Lazy-load non-critical media.
- Optimise SVGs and images.
- Remove unused CSS and JavaScript.
- Target:
  - LCP <= 2.5 s
  - INP <= 200 ms
  - CLS <= 0.1

Acceptance gate:
- Lighthouse lab results recorded for mobile and desktop.
- No material animation jank on target devices.
- Core page interaction remains responsive during animation.

### 4.7 SEO and social sharing
- Retain canonical metadata.
- Add complete social metadata:
  - `og:image`
  - image dimensions and alt text
  - locale and alternate locale
  - Twitter/X card metadata
- Add appropriate structured data.
- Add multilingual discovery signals.
- Validate page title and description in both languages.

Acceptance gate:
- Social preview renders with controlled SAMT artwork.
- Structured data validates without critical errors.
- Canonical and alternate-language signals are consistent.

### 4.8 Security and dependency hardening
- Review all third-party scripts and fonts.
- Prefer self-hosted, pinned production dependencies.
- Where external assets remain, add appropriate SRI and CORS attributes where supported.
- Establish a practical Content Security Policy for GitHub Pages deployment.
- Confirm no sensitive information, secrets or unnecessary debug data are exposed.

Acceptance gate:
- Dependency inventory completed.
- No unpinned or unnecessary third-party production dependency remains.
- Security headers and deployment limitations documented.

### 4.9 Responsive visual QA
Test the complete experience at minimum at:

Desktop:
- 1440 px
- 1920 px

Mobile:
- 360 px
- 390 px
- 430 px

Also verify tablet and intermediate breakpoints.

Acceptance gate:
- No clipping, overlap, unintended horizontal scrolling or unreadable text.
- Arabic and English layouts receive equal approval.
- Approved Phase 3.7 station, hero and journey behaviours remain intact.

### 4.10 Final independent re-audit and release
- Re-run the multidisciplinary audit against the release candidate.
- Compare results with the Phase 4 baseline.
- Record residual risks and accepted limitations.
- Open a pull request only after all mandatory gates pass.
- Merge to `main` only after final approval.
- Verify the deployed GitHub Pages version after merge.

Acceptance gate:
- All mandatory findings closed or formally accepted with rationale.
- Final score supported by evidence, not visual opinion alone.
- Live deployment matches the approved release candidate.

## Audit traceability register

| ID | Finding | Workstream | Priority | Status |
|---|---|---|---|---|
| F-01 | Public Story page remains a Phase 3.5 build | 4.1 / 4.4 | Critical | Open |
| F-02 | Narrative is strong but linguistic claims require validation | 4.4 | Medium | Open |
| F-03 | Semantic foundation requires complete accessibility verification | 4.5 | High | Open |
| F-04 | Bilingual and RTL architecture requires strengthening | 4.3 | Critical | Open |
| F-05 | GSAP and ScrollTrigger are render-blocking | 4.6 | High | Open |
| F-06 | Motion and visual effects present unmeasured performance risk | 4.6 | High | Open |
| F-07 | Cinematic transition requires skip and reduced-motion controls | 4.4 / 4.5 | Critical | Open |
| F-08 | Social-sharing metadata is incomplete | 4.7 | Medium | Open |
| F-09 | External dependency security hardening is incomplete | 4.8 | High | Open |
| F-10 | CSS and front-end structure are monolithic | 4.2 | High | Open |
| F-11 | Measured Lighthouse, Core Web Vitals and browser QA are absent | 4.6 / 4.9 | Critical | Open |
| F-12 | Final world-class score requires independent evidence-based re-audit | 4.10 | Critical | Open |

## Definition of done
Phase 4 is complete only when:

- every audit item is closed or formally accepted;
- all required accessibility, bilingual, responsive, performance, SEO and security gates pass;
- the approved cinematic and premium experience remains intact;
- a reviewed pull request is merged into `main`;
- GitHub Pages is verified after deployment;
- the final independent audit is documented.
