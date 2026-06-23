# FirstString Site — Refactor Backlog

Audit performed 2026-04-17.

---

## Security

- [ ] **#1** Remove real Firebase API key from `src/environments/environment.ts` — load from env var at build time, never commit to git
- [ ] **#2** Remove hardcoded admin email from both environment files (`environment.ts` line 12, `environment.prod.ts` line 11)
- [ ] **#3** Move direct `addDoc()` Firestore write in `admin-signups.component.ts` (~line 78) into a service method with input validation
- [ ] **#4** Move hardcoded Brevo form action URL out of `early-access-section.component.html` (~line 31) and into config
- [ ] **#5** Replace `document.getElementById()` in nav, hero, early-access, and features components with Angular `@ViewChild`

---

## Code Duplication

- [ ] **#6** Extract pagination logic (`search`, `page`, `limit`, `prevPage`, `nextPage`, `totalPages`, `onSearch`, `onFilter`) duplicated across users/teams/payments/signups admin components into a shared `PaginationManager`
- [ ] **#7** Extract the loading/error/data signal + subscribe pattern duplicated across all 5 admin page components into a shared `AsyncState` helper
- [ ] **#8** Consolidate duplicate `formatCurrency()` method in dashboard and payments components into a shared utility
- [ ] **#9** Consolidate duplicate `formatDay()` method in dashboard and signups components into a shared utility
- [ ] **#10** Move pagination range display math (`(page - 1) * limit + 1` etc.) out of 3 templates and into a shared computed property

---

## Missing Abstractions

- [ ] **#11** Create reusable `<app-admin-table>` component — all 4 admin list pages share the same search + filter + table + pagination + empty-state layout
- [ ] **#12** Create reusable `<app-bar-chart>` component — bar height/percentage logic is duplicated between dashboard (2 charts) and signups
- [ ] **#13** Create `<app-icon [name]="...">` component or adopt icon library — admin shell has 6 inline SVGs in a `@switch`, dashboard repeats 4 identical arrow SVGs

---

## Service Architecture

- [ ] **#14** Split `AdminApiService` (~415 lines) into domain-specific services: `AdminUsersService`, `AdminTeamsService`, `AdminPaymentsService`, `AdminSignupsService`, `AdminStatsService`, plus a shared formatter/utility module
- [ ] **#15** Fix `loadBaseData()` over-fetching in `AdminApiService` — currently loads all users/teams/members even when only one domain is needed

---

## Type Safety

- [ ] **#16** Replace 20+ `(d['field'] as string)` type assertions in `admin-api.service.ts` with a typed document converter or schema validator (e.g. Zod)
- [ ] **#17** Define a named `PaginationParams` interface to replace repeated inline `{ search?: string; page?: number; limit?: number }` object types

---

## Observable/Subscription Hygiene

- [ ] **#18** Add `takeUntilDestroyed()` to all `.subscribe()` calls across the 5 admin page components (dashboard, users, teams, payments, signups)

---

## Environment / Config

- [ ] **#19** Move hardcoded `'https://firststringapp.com'` and Facebook share URL in `early-access-section.component.ts` (lines 3, 31) into `environment.ts`
- [ ] **#20** Fix hardcoded copyright year `2025` in `footer.component.ts` line 12 — use `new Date().getFullYear()`
- [ ] **#21** Remove or wire up placeholder `'https://forms.google.com/placeholder'` in `src/app/shared/constants.ts`

---

## Dead Code / Misc

- [ ] **#22** Fix or remove broken `app.spec.ts` — tests for a `<h1>` element that doesn't exist in the app
- [ ] **#23** Move template-side function calls used in style bindings (e.g. `getBarHeight`, `getRevenueTrendMax`) into pre-computed signals or component properties
