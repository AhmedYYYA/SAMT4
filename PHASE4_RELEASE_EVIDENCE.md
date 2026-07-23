# SAMT Phase 4 — Release Evidence

## Release candidate

- Repository: `AhmedYYYA/SAMT4`
- Branch: `phase4-world-class-enhancement`
- Pull request: `#3`
- Tested release commit: `af78fe22a4e50cce60c552cd4e891f68ac148d97`
- GitHub Actions run: `30044573719`

## Automated gate results

| Gate | Result |
|---|---|
| JavaScript syntax validation | Passed |
| Phase 4 deterministic static audit | Passed |
| Three-run mobile Lighthouse quality gate | Passed |
| Two-run desktop Lighthouse quality gate | Passed |
| English home runtime | Passed |
| Arabic home runtime | Passed |
| English Story page | Passed |
| Arabic Story page | Passed |
| Accessibility assertions | Passed |
| SEO assertions | Passed |
| Best-practice assertions | Passed |
| LCP budget | Passed |
| CLS budget | Passed |
| Total Blocking Time budget | Passed |

## Lighthouse results

### Mobile — three-run median

| Page/state | Performance | Accessibility | Best Practices | SEO | Median LCP | Median CLS | Median TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| English home — `index.html` | 100 | 100 | 100 | 100 | 1,436 ms | 0.000 | 0 ms |
| Arabic home — `index.html?lang=ar` | 100 | 100 | 100 | 100 | 1,423 ms | 0.000 | 0 ms |
| English Story — `story-of-samt.html` | 100 | 100 | 100 | 100 | 1,413 ms | 0.000 | 0 ms |
| Arabic Story — `story-of-samt-ar.html` | 100 | 100 | 100 | 100 | 1,415 ms | 0.000 | 0 ms |

### Desktop — two runs

| Page/state | Performance | Accessibility | Best Practices | SEO | LCP range | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| English home — `index.html` | 99 | 100 | 100 | 100 | 713–715 ms | 0.007 | 0 ms |
| Arabic home — `index.html?lang=ar` | 99 | 100 | 100 | 100 | 796–799 ms | 0.000 | 0 ms |
| English Story — `story-of-samt.html` | 99 | 100 | 100 | 100 | 717 ms | 0.009 | 0 ms |
| Arabic Story — `story-of-samt-ar.html` | 99 | 100 | 100 | 100 | 757–762 ms | 0.003 | 0 ms |

## Retained workflow artifacts

- `phase4-lighthouse-mobile`
  - Artifact ID: `8578656530`
  - Digest: `sha256:b9ea94ea46e5f075a4cada1b71bdd151d80ce1ae82bde7fffa4c58b807c1b55c`
- `phase4-lighthouse-desktop`
  - Artifact ID: `8578635176`
  - Digest: `sha256:eb51e401d959995687760f284c3cfd2732ef03f90572e10e1b71c71a78bb9b4d`

Artifacts are retained by GitHub Actions for 14 days from the evidence run.

## Visual evidence reviewed

Final Lighthouse screenshots were reviewed for:

- desktop English home;
- mobile English home;
- desktop Arabic home runtime;
- mobile Arabic home runtime;
- desktop and mobile English Story openings;
- desktop and mobile Arabic Story openings.

The reviewed frames confirm:

- premium deep-navy and champagne-gold presentation;
- correctly positioned live identity panel;
- legible mobile headlines and calls to action;
- correct Arabic RTL composition and headline/panel relationship;
- distinct English and Arabic Story openings;
- no first-viewport clipping or unintended horizontal overflow in the audited frames;
- no intermediate English layout appearing in the audited Arabic state.

## Performance architecture evidence

- Production JavaScript is self-hosted and dependency-free.
- No GSAP or ScrollTrigger scripts are loaded by Phase 4 pages.
- Arabic translations are loaded only when Arabic is requested.
- Preparation-station datasets are loaded on demand by language.
- Journey and station controllers initialise only when their sections approach the viewport.
- The full-document JavaScript progress measurement was removed.
- The scroll-linked progress line is retained on desktop and excluded from the mobile critical rendering path.
- Offscreen homepage sections use rendering containment on mobile.
- Station artwork is lazy-loaded and always rendered with `object-fit: contain`.

## Security and dependency evidence

- No third-party executable script is present.
- Content Security Policy is present on all production pages.
- Strict referrer policy is configured.
- No inline event-handler attributes are used.
- No `javascript:` URLs are used.
- Static audit checks all local `src` and `href` references.

## Bilingual evidence

- The home page supports measured English and Arabic runtime states.
- English Story: `story-of-samt.html`, `lang="en"`, `dir="ltr"`.
- Arabic Story: `story-of-samt-ar.html`, `lang="ar"`, `dir="rtl"`.
- Reciprocal canonical, `hreflang`, alternate-language and sitemap signals are present.
- Arabic lexical claims were corrected and documented in `CONTENT_LINGUISTIC_VALIDATION.md`.

## Residual release controls

The following require human interaction and cannot be honestly represented as completed by automated CI:

1. VoiceOver, NVDA or equivalent screen-reader smoke testing.
2. Keyboard walkthrough in the final browser environment.
3. Real-device visual review at 360, 390 and 430 px.
4. User acceptance of motion timing and visual presentation.
5. Explicit merge approval.
6. Post-merge GitHub Pages verification.

These are acceptance and deployment controls, not missing production code.