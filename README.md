# Dashboard App — Frontend PR Review Exercise

A small React + TypeScript dashboard application used as a frontend engineering interview exercise.

## Setup

```bash
npm install
npm run dev          # start dev server at http://localhost:3000
npm run type-check   # TypeScript
npm run lint         # ESLint (zero warnings)
npm run test         # Jest
```

## Git setup (one-time)

```bash
git init
git add .
git commit -m "feat: baseline dashboard app"
git checkout -b frontend-review-pr
```

Then apply the PR changes on that branch (see `docs/` for instructions).

## Project structure

```
src/
  types/         — TypeScript interfaces and types
  theme/         — design tokens (colors, spaces, sizes)
  services/
    api/         — axios API functions (one file per domain)
    reactQuery/  — re-export of @tanstack/react-query
  queries/       — React Query hooks (one folder per domain)
  shared/
    components/  — reusable UI components
    utils/       — pure utility functions
  components/    — feature components
  mocks/         — mock data for development
```

## Candidate instructions

See `docs/CANDIDATE_FRONTEND_PR_REVIEW.md`.
