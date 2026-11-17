# Hire a closed-permit developer in Quebec

A short, bilingual guide (English and Québec French) for Quebec employers who want to hire a software
developer who already lives and works in Quebec on an employer-specific ("closed") work permit, through
the **Global Talent Stream** (Category B).

- **Live:** <https://brunogutierre.github.io/hire-gts-quebec/> · <https://brunogutierre.github.io/hire-gts-quebec/fr/>
- **Content:** why hire someone in this situation, the five steps from offer to first day with their
  durations, who does what and who pays what, the author's own case, an FAQ and the official sources.

> General information written by a worker, not legal advice. Every figure links to its official source
> (ESDC, MIFI, IRCC) and the page shows the date it was last verified.

## Goals

- Show employers that hiring a closed-permit developer is quick and predictable: about 4 to 6 weeks from
  the LMIA submission to the first day, of which the worker's part is about 2 weeks.
- Make each party's responsibilities explicit, in plain language, in both of Quebec's working languages.
- Be a small, polished example of a static Angular site: prerendered, accessible, tested and deployed
  by CI.

## Stack

| Area          | Choice                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------- |
| Framework     | Angular 22, zoneless, standalone OnPush components                                              |
| Rendering     | `outputMode: "static"`: one prerendered HTML file per language, hydrated in the browser         |
| Languages     | `@angular/localize` builds for `en` (at `/`) and `fr-CA` (at `/fr/`)                            |
| Styles        | SCSS, the "Canopy" design tokens of the author's personal site, `light-dark()` colours          |
| Fonts         | Bricolage Grotesque, Inter, JetBrains Mono, self-hosted (Fontsource, SIL OFL 1.1), latin subset |
| Unit tests    | Vitest through `ng test`, 80% coverage threshold                                                |
| Build checks  | `scripts/check-dist.mjs`, dependency-free, tested with `node:test`                              |
| Browser tests | Playwright + axe (WCAG 2.2 AA), Chromium desktop and phone, Firefox and WebKit smoke tests      |
| Hosting       | GitHub Pages (project site), deployed by GitHub Actions                                         |

## Architecture

```
src/
├── content/              All the text, typed: Localized<T> = { en: T; 'fr-CA': T }
│   ├── intro.ts          hero + why hire
│   ├── steps.ts          the five steps and the typical total
│   ├── roles.ts          employer / worker responsibilities, who pays what
│   ├── my-case.ts        the author's situation and contact
│   ├── faq.ts, sources.ts, seo.ts, site.ts
│   └── content.spec.ts   both languages have the same shape, no empty strings, French typography
├── app/
│   ├── core/i18n/        LOCALES, CURRENT_LOCALE (from LOCALE_ID), localeUrl()
│   ├── core/seo/         SeoService: title, description, canonical, hreflang, Open Graph
│   ├── layout/           header (section links), language links, footer
│   ├── sections/         one component per section of the page
│   └── home-page.ts      the page: hero + six labelled regions
public/                   fonts, favicon, photo, link preview images, 404.html
scripts/                  check-dist.mjs (build guard), serve-dist.mjs (Pages emulation for e2e)
e2e/                      Playwright + axe tests
```

Build and deploy flow: `ng build` prerenders `/hire-gts-quebec/` and `/hire-gts-quebec/fr/` →
`check-dist` validates the output → the artifact is uploaded to GitHub Pages → a curl check verifies both
live URLs.

## Design decisions

- **Text in typed `Localized<T>` constants, not `i18n` attributes.** The site is mostly long prose. Keeping
  English and French side by side in one file makes the French easy to review, and a missing translation
  is a compile error. `@angular/localize` is still used, only for the per-language builds, `LOCALE_ID`
  and `<html lang>`. _Rejected:_ `i18n` attributes with JSON translations, because the ids end up spread
  across templates and long paragraphs are hard to review.
- **One route, one page, plain anchors.** The page URL equals its `<base href>`, so `#steps` works in both
  builds without router features. _Rejected:_ one route per section, which would add navigation for a
  page people read top to bottom.
- **A project site on a shared origin.** `brunogutierre.github.io` also serves the author's personal site,
  so:
  - every URL stays under `/hire-gts-quebec/`, and `check-dist` fails the build otherwise (the personal
    home page is the only allowed exception);
  - there is no service worker, `localStorage`, sitemap or `robots.txt`, all of which would act on the
    whole origin;
  - fonts use absolute URLs under the project path, so both languages share one cached copy.
- **No theme toggle.** Colours follow `prefers-color-scheme`, so nothing needs to be stored.
- **Native `<details>` for the FAQ.** Keyboard and screen-reader support with no JavaScript and no state.
- **No HTML in the content.** Lists and tables come from arrays, so nothing is ever bound with `innerHTML`.
- **No FAQPage or other JSON-LD.** Google restricted FAQ rich results to authoritative sites in 2023, so the
  markup would add test surface for no benefit.
- **Static link preview images.** They were rendered once from a small HTML card and committed. _Rejected:_
  a render pipeline, which would be maintenance for two images.
- **An honest timeline.** IRCC's 2-week work-permit standard applies only to applications from outside
  Canada, so the page does not promise it. The fast path is the public policy that lets the worker start
  once IRCC emails an authorization, which IRCC says takes about 10 to 15 days.

## Run and test

Requires Node 24.

```bash
npm ci
npm start            # English at http://localhost:4200/hire-gts-quebec/
npm run start:fr     # French
npm run lint && npm run format:check
npm run test:ci      # unit tests with coverage
npm run test:scripts # tests of the build checks
npm run build && npm run check:dist
npm run e2e          # Playwright + axe on the built site (after npm run build)
```

`npx playwright install --with-deps` installs the browsers the first time.

## CI and deployment

- `ci.yml` runs on every pull request and on `main`: lint, format, unit tests, script tests, build,
  `check:dist`, then the end-to-end and accessibility tests.
- `deploy.yml` runs on `main`: build → `check:dist` → GitHub Pages → live check of both languages.
- `main` is protected: changes land through pull requests only.

## Updating the facts

Fees, wage thresholds and processing times change. To update them:

1. Check each page listed in `src/content/sources.ts`.
2. Edit the figures in `src/content/*.ts`, in both languages.
3. Set `LAST_VERIFIED` to the date of the check.

## License

Code: [MIT](LICENSE). The author's photo is not covered by the license; all rights are reserved.
