# allertzbeheer.com

Standalone Angular application for `allertzbeheer.com`, built with pnpm and deployed to GitHub Pages.

## Stack

- Angular 21 standalone application
- Plain CSS styling
- pnpm for package management
- ESLint + Prettier for code quality
- Husky + lint-staged for local pre-commit enforcement
- GitHub Actions for PR validation and `main` deployment

## Local development

```bash
pnpm install
pnpm start
```

## Quality gates

```bash
pnpm lint
pnpm test
pnpm build
pnpm format:check
```

## Branch protection

Branch protection applies to `main` only. Pull requests into `main` must pass the required PR workflow checks before merge.

## Deployment

Production deployment runs automatically from `main` through the GitHub Pages artifact flow. The site is published with base path `/` and custom domain `allertzbeheer.com` via `CNAME`.
