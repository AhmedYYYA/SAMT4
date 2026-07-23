# SAMT Phase 4 — Release Evidence

## Release candidate

- Repository: `AhmedYYYA/SAMT4`
- Branch: `phase4-world-class-enhancement`
- Pull request: `#3`
- Evidence commit: `fe70a803374db37786bcc90e7ac6ad5ebd25df12`
- GitHub Actions run: `30041520899`

## Automated gate results

| Gate | Result |
|---|---|
| JavaScript syntax validation | Passed |
| Phase 4 deterministic static audit | Passed |
| Mobile Lighthouse quality gate | Passed |
| Desktop Lighthouse quality gate | Passed |
| Accessibility assertions | Passed |
| SEO assertions | Passed |
| Best-practice assertions | Passed |
| LCP budget | Passed |
| CLS budget | Passed |
| Total Blocking Time budget | Passed |

## Lighthouse results

### Mobile

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `index.html` | 100 | 100 | 100 | 100 | 1,420 ms | 0.000 | 0 ms |
| `story-of-samt.html` | 100 | 100 | 100 | 100 | 1,417 ms | 0.000 | 0 ms |
| `story-of-samt-ar.html` | 100 | 100 | 100 | 100 | 1,421 ms | 0.000 | 0 ms |

### Desktop

Two runs were collected for each page.

| Page | Performance | Accessibility | Best Practices | SEO | LCP range | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `index.html` | 99 | 100 | 100 | 100 | 714–719 ms | 0.006 | 0 ms |
| `story-of-samt.html` | 99 | 100 | 100 | 100 | 709 ms | 0.009 | 0 ms |
| `story-of-samt-ar.html` | 99 | 100 | 100 | 100 | 752–755 ms | 0.003 | 0 ms |

## Retained workflow artifacts

- `phase4-lighthouse-mobile`
  - Artifact ID: `8577421912`
  - Digest: `sha256:4122eb7439b51bc82bcd592c99bc9cf108095c65c7265ca39ccf2104f249c502`
- `phase4-lighthouse-desktop`
  - Artifact ID: `8577436008`
  - Digest: `sha256:7690c7703dfbd60362fa248c16f4964d2611690afc591ade45f81c6b3cae9b6c`

Artifacts are retained by GitHub Actions for 14 days from the evidence run.

## Visual evidence reviewed

Final Lighthouse screenshots were reviewed for:

- desktop home page;
- mobile home page;
- desktop English Story opening;
- mobile English Story opening;
- desktop Arabic Story opening;
- mobile Arabic Story opening.

The reviewed frames confirm:

- premium deep-navy and champagne-gold presentation;
- correctly positioned live identity panel;
- legible mobile headline and CTAs;
- correct Arabic RTL composition;
- distinct English and Arabic Story openings;
- no first-viewport clipping or unintended horizontal overflow in the audited frames.

## Security and dependency evidence

- Production JavaScript is self-hosted and dependency-free.
- No GSAP or ScrollTrigger scripts are loaded by Phase 4 pages.
- No third-party executable script is present.
- Content Security Policy is present on all three production pages.
- No inline event-handler attributes are used.
- No `javascript:` URLs are used.
- Static audit checks all local `src` and `href` references.

## Bilingual evidence

- Home page supports dynamic English and Arabic language state.
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
5. Post-merge GitHub Pages verification.

These are acceptance and deployment controls, not missing production code.
