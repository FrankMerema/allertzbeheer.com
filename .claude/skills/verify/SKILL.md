---
name: verify
description: Verify a code change on allertzbeheer.com by running lint, tests, and build in the same order CI uses. Use before considering a change on this repo done, or when asked to check/verify/validate that a change works.
---

# Verify — allertzbeheer.com

CI (`.github/workflows/pr.yml`) runs lint → test → build in that order on
every PR. Match that order locally rather than running checks ad hoc or out
of order.

## Run everything

```bash
pnpm verify
```

This runs `pnpm lint && pnpm test && pnpm build` (see `package.json`). Each
stage must pass before the next runs, matching CI:

1. **lint** — `eslint .` (TS + Angular template rules) followed by an i18n
   key-parity check (`scripts/check-i18n-parity.js`) that fails if a key
   exists in `src/app/core/i18n/nl.ts` but not `en.ts`, or vice versa.
2. **test** — `ng test --watch=false` (Vitest). Spec coverage is currently
   thin (only `app.component` and `contact.component` have specs) — don't
   assume a passing test run means a component was exercised if no spec file
   for it exists.
3. **build** — plain `ng build`, no `--base-href` flag. This intentionally
   does _not_ match the GitHub Pages deploy command
   (`pnpm build --base-href /allertzbeheer.com/`) — the base-href flag is
   only for the actual Pages deploy step, not for local/CI validation.

## Running stages individually

If you only touched templates/styles and want a faster loop, `pnpm lint` and
`pnpm test` alone are usually enough signal — but run the full `pnpm verify`
before calling a change done, since build-time type errors (strict
templates, strict TS) won't surface from lint or test alone.

## This is not visual QA

`pnpm verify` catches type errors, lint violations, i18n key drift, and unit
test regressions — it does not check that a page still matches its Stitch
design reference. For that, use the `run` skill.
