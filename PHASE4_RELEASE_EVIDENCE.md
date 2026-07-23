# SAMT Phase 4 — Release Evidence

## Release candidate

- Repository: `AhmedYYYA/SAMT4`
- Branch: `phase4-world-class-enhancement`
- Pull request: `#3`
- Tested code commit: `95c12eb8512dbd55323c028938120025dec21a5e`
- GitHub Actions run: `30043805215`

## Automated gate results

| Gate | Result |
|---|---|
| JavaScript syntax validation | Passed |
| Phase 4 deterministic static audit | Passed |
| Mobile Lighthouse quality gate | Passed |
| Desktop Lighthouse quality gate | Passed |
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

### Mobile

| Page/state | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| English home — `index.html` | 100 | 100 | 100 | 100 | 1,383 ms | 0.000 | 0 ms |
| Arabic home — `index.html?lang=ar` | 100 | 100 | 100 | 100 | 1,381 ms | 0.000 | 0 ms |
| English Story — `story-of-samt.html` | 100 | 100 | 100 | 100 | 1,380 ms | 0.000 | 0 ms |
| Arabic Story — `story-of-samt-ar.html` | 100 | 100 | 100 | 100 | 1,384 ms | 0.000 | 0 ms |

### Desktop

Two runs were collected for each page/state.

| Page/state | Performance | Accessibility | Best Practices | SEO | LCP range | CLS | TBT range |
|---|---:|---:|---:|---:|---:|---:|---:|
| English home — `index.html` | 99 | 100 | 100 | 100 | 703–710 ms | 0.007 | 0–36 ms |
| Arabic home — `index.html?lang=ar` | 99 | 100 | 100 | 100 | 779–781 ms | 0.000 | 0 ms |
| English Story — `story-of-samt.html` | 99–100 | 100 | 100 | 100 | 693–697 ms | 0.009 | 0 ms |
| Arabic Story — `story-of-samt-ar.html` | 99 | 100 | 100 | 100 | 737–746 ms | 0.003 | 0 ms |

## Retained workflow artifacts

- `phase4-lighthouse-mobile`
  - Artifact ID: `8578308585`
  - Digest: `sha256:ca7aa1c7ddac5fefc419d878f4d4f8f7c803856d10491fe7592f0ed0d404c520`
- `phase4-lighthouse-desktop`
  - Artifact ID: `8578340530`
  - Digest: `sha256:d8bf2a315374ddc1ef44dec52a677fa87532cf039cd4d7f982b7dce7312c0dd4`

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
- The progress indicator uses a CSS scroll timeline rather than forcing full-document measurement.
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