# FirstString Marketing Site — Build Plan

## Project Setup

- Angular 19 (latest stable), standalone components, no SSR
- `HashLocationStrategy` for static hosting compatibility
- `ng build` outputs to `/dist/firststring-site`
- Google Fonts: Barlow + Barlow Condensed
- No external UI libraries — custom CSS with design system variables
- No state management needed (static marketing content)

---

## Routing Plan

| Path       | Component         | Notes                          |
|------------|-------------------|--------------------------------|
| `#/`       | HomeComponent     | Hero + brief feature highlights |
| `#/features` | FeaturesComponent | Full feature breakdown         |
| `#/screenshots` | ScreenshotsComponent | Placeholder image grid    |
| `#/pricing`  | PricingComponent  | Tiers + add-ons + FAQ + table  |

The `app.routes.ts` will define these four routes with `loadComponent()` (lazy-loaded).

---

## Component Breakdown

### Shell
- **AppComponent** — router outlet only, includes nav + footer
- **NavComponent** — top nav bar: logo left, links right, CTA button ("Get Started")
- **FooterComponent** — links (Home, Features, Pricing), copyright, app link

### Pages

#### HomeComponent (`#/`)
- **HeroSectionComponent** — headline, subheadline, primary CTA ("Try FirstString Free"), secondary link ("See Pricing")
- **FeatureHighlightsComponent** — 3–4 icon cards teasing key features, links to `#/features`
- **SocialProofComponent** — placeholder for testimonials / "Built for coaches" blurb

#### FeaturesComponent (`#/features`)
- Feature rows — alternating image/text layout (placeholder images)
- Features to cover:
  - Roster Management
  - Game Scheduling
  - Calendar Integration
  - Automated Messaging
  - Attendance Tracking
  - Call-Up / Guest Player Management

#### ScreenshotsComponent (`#/screenshots`)
- Responsive grid of placeholder screenshot cards (aspect ratio 9:19.5 for mobile app)
- Lightbox-style click-to-expand (pure CSS/Angular, no library)

#### PricingComponent (`#/pricing`)
- **PricingTiersComponent** — 3-column card layout
  - Single Team — $50/yr — "Most Popular" badge
  - Club — $350/yr — up to 10 teams, Fee Tracking included
  - Organization — Custom — "Contact Us" CTA
- **AddOnsGridComponent** — toggleable show/hide grid of 3 add-on cards
  - Tournament Mode — $25/team/yr
  - Fee Tracking — $20/team/yr (note: included in Club+)
  - Call-Up Payments — $30/team/yr + transaction % (Club/Org only, requires Stripe)
- **ComparisonTableComponent** — feature matrix rows vs. tier columns (checkmarks / dash)
- **PricingFAQComponent** — accordion-style FAQ, 4 questions

---

## Design System Tokens (CSS custom properties)

```css
--navy: #1b2f6e;
--navy-dark: #152559;
--surface: #f0f3fa;
--white: #ffffff;
--text-main: #0f1e4a;
--text-sub: #6b7ba4;
--green: #2ecc71;   /* status / positive */
--gold: #f0b429;    /* badges / highlights */
--radius-card: 14px;
--radius-pill: 9999px;
--shadow-card: 0 2px 12px rgba(27,47,110,0.07);
```

Fonts loaded via Google Fonts:
- `Barlow` (400, 500, 600) — body text
- `Barlow Condensed` (600, 700) — headings, numbers, nav

---

## File Structure

```
src/
  app/
    app.component.ts
    app.routes.ts
    components/
      nav/
      footer/
    pages/
      home/
        home.component.ts
        components/
          hero-section/
          feature-highlights/
          social-proof/
      features/
        features.component.ts
      screenshots/
        screenshots.component.ts
      pricing/
        pricing.component.ts
        components/
          pricing-tiers/
          add-ons-grid/
          comparison-table/
          pricing-faq/
  styles/
    _variables.scss   ← design tokens
    _typography.scss
    _utilities.scss
  index.html
  styles.scss
```

---

## Build & Deploy Notes

- `ng build --configuration production` → outputs to `dist/firststring-site/browser/`
- Upload contents of that folder to DreamHost public_html via FTP/SFTP
- No `.htaccess` rewrite rules needed — HashLocationStrategy handles all routing client-side
- `base href="/"` in `index.html` is sufficient

---

## Open Questions (resolve before coding)

1. What is the app's URL? (needed for CTA "Get Started" and nav button links)
2. Is there a contact email for the Organization tier "Contact Us" CTA?
3. Any existing logo/brand assets to use, or should I generate a text-based logo placeholder?
4. Should the "Get Started" CTA go to the app directly, or to a signup/waitlist form?
