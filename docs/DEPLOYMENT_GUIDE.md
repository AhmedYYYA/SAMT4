# Phase 3 Deployment Guide

1. Back up the current `SAMT4` repository.
2. Upload every file and folder from the Phase 3 package to the repository root.
3. Confirm that GitHub Pages publishes from the `main` branch and `/root`.
4. Wait for the Pages workflow to complete successfully.
5. Open `https://ahmedyyya.github.io/SAMT4/` in a private browser window.
6. Hard-refresh once to clear cached CSS and JavaScript.

## Required paths

```text
assets/brand/samt-symbol.svg
assets/brand/samt-arabic-wordmark.svg
assets/icons/samt-icons.svg
assets/stations/uae-animated.svg
assets/stations/uk-animated.svg
assets/stations/france-animated.svg
assets/stations/usa-animated.svg
```

GitHub Pages is case-sensitive. Do not change capitalization or add `(1)` to filenames.

## Cache troubleshooting

If an older version appears, use a hard refresh or append a temporary query string such as `?v=3`.
