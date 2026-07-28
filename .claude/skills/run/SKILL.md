---
name: run
description: Launch the allertzbeheer.com Angular dev server and view a route, including visual QA against the original Stitch export screenshots. Use when asked to run, start, preview, or visually verify a page on this site.
---

# Run — allertzbeheer.com

This is a hash-routed Angular 21 static site (`withHashLocation()`), so dev
server URLs need a `#` before the route path — a plain `/diensten` will not
resolve.

## Start the app

```bash
pnpm start
```

Serves at `http://localhost:4200/` by default (`ng serve`). Wait for the
"Application bundle generation complete" / "Local: http://localhost:4200/"
line before navigating — don't poll, the command prints when it's ready.

## Route URLs

| Route     | URL                                 |
| --------- | ----------------------------------- |
| Home      | `http://localhost:4200/#/`          |
| Diensten  | `http://localhost:4200/#/diensten`  |
| Expertise | `http://localhost:4200/#/expertise` |
| Contact   | `http://localhost:4200/#/contact`   |

Any unmatched path redirects to `/` (see `src/app/app.routes.ts`).

## Language

The active language (`nl` | `en`) is a signal seeded from `localStorage` key
`allertzbeheer-language`, defaulting to `nl` if unset. To preview the English
copy, set that key before navigating (e.g. via devtools console:
`localStorage.setItem('allertzbeheer-language', 'en')`) and reload — there is
no `?lang=` query param.

## Visual QA against the Stitch export

Each route has an original design reference under
`stitch-export/allertz-beheer-digital-platform/<page>/`:

- `01-home-allertz-beheer-b-v/screenshot.png` → `/`
- `02-diensten-allertz-beheer-b-v/screenshot.png` → `/diensten`
- `03-expertise-allertz-beheer-b-v/screenshot.png` → `/expertise`
- `04-contact-allertz-beheer-b-v/screenshot.png` → `/contact`

Each folder also has a `code.html` with the original exported markup — use it
to check copy, structure, and spacing when the rendered page and the
screenshot disagree, or when a Tailwind token choice in the migrated
component is unclear.

To QA a page: start the dev server, navigate to the route, take a screenshot
of the rendered page, and compare it side-by-side against that page's
`screenshot.png`. Check the migration status in
`stitch-export-angular-checklist.md` first — it tracks which pages still need
this pass.
