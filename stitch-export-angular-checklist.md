# Angular conversion checklist for `stitch-export`

## Goal

Convert the exported pages in:

```text
stitch-export/allertz-beheer-digital-platform/
```

into Angular route components in:

```text
src/app/
```

---

## Current repo audit — 2026-05-11

### Completed in the repo

- Angular standalone routing is in place for `/`, `/diensten`, `/expertise`, and `/contact`.
- Tailwind + PostCSS are configured locally, including Stitch-style tokens in `tailwind.config.js`.
- Global fonts/icons are loaded in `src/index.html` and base styles are set in `src/styles.css`.
- Shared shell components exist for the header and footer.
- All 4 pages exist as standalone route components.
- Several reusable UI blocks have already been extracted:
  - `page-hero`
  - `section-heading`
  - `stat-card`
  - `cta-panel`
  - `contact-info-item`
- Router polish is partly done:
  - active nav highlighting works
  - page titles are set per route
  - scroll restoration and anchor scrolling are now enabled in `src/app/app.config.ts`
- Automated project checks passed on 2026-05-11:
  - `pnpm lint`
  - `pnpm build`
  - `pnpm test`

### Still incomplete or needing validation

- The checklist itself has not yet been fully checked off phase-by-phase.
- Visual comparison against all 4 Stitch screenshots is still pending.
- Some content is still placeholder or provisional:
  - LinkedIn URL
  - contact phone/address details should be confirmed as final
  - privacy/brochure destinations are not fully defined
- Asset localization is mostly done for the logo, and the contact map placeholder is now local, but the repo still needs a final pass to confirm all intended external assets are either localized or explicitly accepted.
- Accessibility and responsive QA still need a deliberate review rather than code-only inspection.
- The contact form is still a static first pass and has not been converted to a reactive form.

### Best next improvements

1. Do a visual QA pass against the 4 exported screenshots and adjust spacing/typography where needed.
2. Replace placeholder business data and external links with final content.
3. Decide whether the contact form stays static or becomes a real reactive form.
4. Finish the asset audit and keep only intentional external dependencies.
5. Update this checklist phase-by-phase with verified `[x]` items after manual QA.

# Phase 0 — Prep

## 0.1 Review source pages

- [ ] Confirm the 4 pages to migrate:
  - [ ] `01-home-allertz-beheer-b-v`
  - [ ] `02-diensten-allertz-beheer-b-v`
  - [ ] `03-expertise-allertz-beheer-b-v`
  - [ ] `04-contact-allertz-beheer-b-v`
- [ ] Review each `code.html`
- [ ] Review each `screenshot.png`
- [ ] Note repeated layout pieces:
  - [ ] top nav
  - [ ] footer
  - [ ] hero section pattern
  - [ ] repeated logo/image
  - [ ] shared colors/spacing/font tokens

## 0.2 Decide migration rules

- [ ] Use **Angular standalone components**
- [ ] Add **Angular Router**
- [ ] Use **local Tailwind setup**, not CDN Tailwind
- [ ] Keep markup close to Stitch output first
- [ ] Extract shared components only after first working pass

---

# Phase 1 — Set up Angular foundations

## 1.1 Add routing

- [ ] Create `src/app/app.routes.ts`
- [ ] Define routes for:
  - [ ] `/`
  - [ ] `/diensten`
  - [ ] `/expertise`
  - [ ] `/contact`
- [ ] Register router in `src/app/app.config.ts`
- [ ] Replace starter `app.component.html` with `<router-outlet />`
- [ ] Import `RouterOutlet` in `app.component.ts`

## 1.2 Install and configure Tailwind

- [ ] Add Tailwind + PostCSS if not already present as project deps
- [ ] Create Tailwind config file
- [ ] Create PostCSS config if needed
- [ ] Configure Tailwind content paths for:
  - [ ] `src/**/*.html`
  - [ ] `src/**/*.ts`

## 1.3 Move Stitch theme tokens into Tailwind config

From the exported inline `tailwind.config`, move these into local config:

- [ ] colors
- [ ] borderRadius
- [ ] spacing
- [ ] fontFamily
- [ ] fontSize

### Important token checks

Make sure these classes will exist:

- [ ] `bg-background`
- [ ] `text-on-surface`
- [ ] `text-on-surface-variant`
- [ ] `bg-primary`
- [ ] `bg-primary-fixed`
- [ ] `border-outline-variant`
- [ ] `px-margin-desktop`
- [ ] `text-headline-xl`
- [ ] `text-headline-lg`
- [ ] `font-headline-xl`
- [ ] `font-body-md`

## 1.4 Add global font/icon loading

In `src/index.html`:

- [ ] Add Google Fonts for `Manrope`
- [ ] Add Google Fonts for `Inter`
- [ ] Add Material Symbols stylesheet

## 1.5 Add minimal global styles

In `src/styles.css`:

- [ ] remove starter dark gradient styles
- [ ] include Tailwind layers/utilities setup
- [ ] add global `box-sizing`
- [ ] set base body font/background/text defaults
- [ ] add `.material-symbols-outlined` font variation settings

---

# Phase 2 — Create app structure

## 2.1 Create folders

- [ ] `src/app/core/layout/site-header`
- [ ] `src/app/core/layout/site-footer`
- [ ] `src/app/pages/home`
- [ ] `src/app/pages/diensten`
- [ ] `src/app/pages/expertise`
- [ ] `src/app/pages/contact`
- [ ] optional: `src/app/shared/components`
- [ ] optional: `src/app/core/data`

## 2.2 Create page components

- [ ] `HomeComponent`
- [ ] `DienstenComponent`
- [ ] `ExpertiseComponent`
- [ ] `ContactComponent`

## 2.3 Create layout components

- [ ] `SiteHeaderComponent`
- [ ] `SiteFooterComponent`

---

# Phase 3 — Build the shared site shell

## 3.1 Convert the header

Use the repeated `<nav>` from the Stitch pages.

### Tasks

- [ ] create Angular header template from exported nav
- [ ] replace `href="#"` with real route links
- [ ] use `routerLink` for internal navigation
- [ ] add active link styling with router-aware logic
- [ ] keep logo/title area consistent
- [ ] decide what CTA button should do

### Header route mapping

- [ ] `Services` → `/diensten`
- [ ] `About Us` → `/expertise` or future `/over-ons`
- [ ] `Contact` → `/contact`

## 3.2 Convert the footer

Use the repeated footer structure.

### Tasks

- [ ] create footer component
- [ ] centralize copyright text
- [ ] replace placeholder links
- [ ] decide whether privacy/terms links are real routes or placeholders

## 3.3 Add shell to app

- [ ] render header in app shell
- [ ] render footer in app shell
- [ ] keep `<router-outlet />` between them

---

# Phase 4 — Convert the Home page

## Source

- [ ] `stitch-export/allertz-beheer-digital-platform/01-home-allertz-beheer-b-v/code.html`

## 4.1 Extract page body only

- [ ] remove `<!DOCTYPE html>`
- [ ] remove `<html>`
- [ ] remove `<head>`
- [ ] remove CDN Tailwind script
- [ ] remove inline Tailwind config
- [ ] remove font links
- [ ] remove body wrapper
- [ ] remove duplicated nav/footer

## 4.2 Add content to `HomeComponent`

- [ ] hero section
- [ ] expertise cards section
- [ ] about teaser section
- [ ] stats cards
- [ ] direct contact teaser block

## 4.3 Fix Angular-specific items

- [ ] replace `href="#"` with `routerLink` or real links
- [ ] change CTA buttons into anchors/buttons with real destinations
- [ ] ensure no invalid HTML remains

## 4.4 Verify styling

- [ ] compare against `screenshot.png`
- [ ] check spacing
- [ ] check typography
- [ ] check button appearance
- [ ] check icon rendering

---

# Phase 5 — Convert the Diensten page

## Source

- [ ] `stitch-export/allertz-beheer-digital-platform/02-diensten-allertz-beheer-b-v/code.html`

## 5.1 Extract page content

- [ ] remove document/head/body/CDN parts
- [ ] remove duplicated nav/footer

## 5.2 Add content to `DienstenComponent`

- [ ] hero section
- [ ] services bento grid
- [ ] sectors section
- [ ] CTA section

## 5.3 Convert links/actions

- [ ] replace placeholder links
- [ ] wire CTA buttons to:
  - [ ] contact page
  - [ ] relevant internal sections if needed

## 5.4 Verify styling

- [ ] compare with screenshot
- [ ] validate bento grid layout
- [ ] confirm responsive stacking

---

# Phase 6 — Convert the Expertise page

## Source

- [ ] `stitch-export/allertz-beheer-digital-platform/03-expertise-allertz-beheer-b-v/code.html`

## 6.1 Extract page content

- [ ] remove document/head/body/CDN parts
- [ ] remove duplicated nav/footer

## 6.2 Add content to `ExpertiseComponent`

- [ ] hero section
- [ ] expertise grid
- [ ] methodology section
- [ ] step cards
- [ ] CTA section

## 6.3 Fix links/actions

- [ ] replace placeholder links
- [ ] point CTA to contact page

## 6.4 Verify styling

- [ ] compare with screenshot
- [ ] check icon alignment
- [ ] check methodology card layout

---

# Phase 7 — Convert the Contact page

## Source

- [ ] `stitch-export/allertz-beheer-digital-platform/04-contact-allertz-beheer-b-v/code.html`

## 7.1 Extract page content

- [ ] remove document/head/body/CDN parts
- [ ] remove duplicated nav/footer

## 7.2 Add content to `ContactComponent`

- [ ] hero section
- [ ] direct contact info card
- [ ] LinkedIn card
- [ ] contact form
- [ ] map section

## 7.3 Convert the form to Angular-friendly markup

First pass:

- [ ] keep as static form markup
- [ ] ensure labels are tied to fields
- [ ] add `name` attributes
- [ ] ensure button types are correct

Second pass optional:

- [ ] add `ReactiveFormsModule`
- [ ] build a reactive form
- [ ] add validation
- [ ] add submit handler
- [ ] show validation errors

## 7.4 Verify contact actions

- [ ] `mailto:` link works
- [ ] `tel:` link works
- [ ] LinkedIn link is real or intentionally placeholder
- [ ] map image loads correctly

---

# Phase 8 — Move assets out of remote URLs

## 8.1 Identify remote assets

- [ ] logo image
- [ ] repeated hero/logo image
- [ ] contact map image
- [ ] any other external images

## 8.2 Download and store locally

Suggested location:

- [ ] `public/images/logo/...`
- [ ] `public/images/contact/...`

## 8.3 Replace references

- [ ] update all `src="https://..."` to local asset paths
- [ ] verify build still works

---

# Phase 9 — Improve Angular structure

## 9.1 Extract repeated UI blocks

After all 4 pages work:

Potential shared components:

- [ ] hero component
- [ ] CTA section
- [ ] stat card
- [ ] icon card
- [ ] section heading block

## 9.2 Optional: move repeated content into TS data

Good candidates:

- [ ] services arrays
- [ ] stats arrays
- [ ] methodology steps
- [ ] contact items
- [ ] nav links

---

# Phase 10 — Navigation and UX polish

## 10.1 Router polish

- [x] active nav highlighting works on all pages
- [x] page titles can be set per route/component
- [x] scroll restoration behaves properly

## 10.2 Accessibility pass

- [ ] one `h1` per page
- [ ] buttons vs links used correctly
- [ ] form labels present
- [ ] alt text present for images
- [ ] color contrast acceptable
- [ ] keyboard focus visible

## 10.3 Responsive pass

Check:

- [ ] mobile
- [ ] tablet
- [ ] desktop

Specifically verify:

- [ ] header layout
- [ ] hero stacking
- [ ] grid wrapping
- [ ] form layout
- [ ] footer layout

---

# Phase 11 — Cleanup

## 11.1 Remove starter app leftovers

- [ ] remove starter title/summary logic from `app.component.ts`
- [ ] remove unused starter CSS
- [ ] remove unused spec content if needed
- [ ] remove dead imports

## 11.2 Clean up temporary placeholders

- [ ] replace all `#` links
- [ ] remove any leftover export-only comments
- [ ] remove duplicated styles

## 11.3 Optional content improvements

- [ ] rename English nav labels to Dutch if desired
- [ ] add real company details
- [ ] add real CTA destinations

---

# Phase 12 — Validation

## 12.1 Run project checks

- [x] `pnpm lint`
- [x] `pnpm build`
- [x] `pnpm test`

## 12.2 Manual QA

- [ ] home route loads
- [ ] diensten route loads
- [ ] expertise route loads
- [ ] contact route loads
- [ ] no console errors
- [ ] no missing asset/font issues

## 12.3 Visual QA

Compare each route with:

- [ ] `01-home.../screenshot.png`
- [ ] `02-diensten.../screenshot.png`
- [ ] `03-expertise.../screenshot.png`
- [ ] `04-contact.../screenshot.png`

---

# Suggested order of execution

## Best working order

- [ ] 1. Add router
- [ ] 2. Add local Tailwind
- [ ] 3. Move Stitch tokens into Tailwind config
- [ ] 4. Add fonts/icons globally
- [ ] 5. Build shared header/footer
- [ ] 6. Convert Home page
- [ ] 7. Convert Diensten page
- [ ] 8. Convert Expertise page
- [ ] 9. Convert Contact page
- [ ] 10. Move remote assets local
- [ ] 11. Extract reusable components
- [ ] 12. QA and cleanup

---

# Definition of done

You’re done when:

- [ ] all 4 Stitch exports exist as Angular route components
- [ ] header/footer are shared
- [ ] no page depends on CDN Tailwind
- [ ] design tokens live in project config
- [ ] assets are local or intentionally external
- [ ] all internal links use Angular routing
- [ ] app builds and lints cleanly
- [ ] pages visually match the exports closely
