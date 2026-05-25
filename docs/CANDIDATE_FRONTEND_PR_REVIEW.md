# Frontend PR Review Exercise

Welcome. This exercise is a simulated PR review.

You have been given a React + TypeScript application and a feature branch that adds a new Widget Library panel to an existing dashboard.

**Your job is to review the PR — not to fully fix it.**

---

## The PR

Branch: `frontend-review-pr`

To inspect the changes:

```bash
git diff main..frontend-review-pr
# or file by file:
git diff main..frontend-review-pr -- src/components/WidgetLibrary/
```

The PR description (as written by the author):

> **Add Widget Library panel to dashboard**
>
> Adds a slide-in panel that lets users browse available widgets and add them to the
> current dashboard. The panel supports keyword search across widget title and category,
> groups results by category, and highlights matching text.
>
> New files:
> - `src/components/WidgetLibrary/WidgetLibraryPanel.tsx`
> - `src/components/WidgetLibrary/WidgetLibraryItem.tsx`
> - `src/components/WidgetLibrary/useWidgetLibraryState.ts`
> - `src/components/WidgetLibrary/widgetLibrary.constants.ts`
>
> Modified:
> - `src/App.tsx` — wires up the panel

---

## What we are looking for

We are evaluating your ability to:

- **Prioritize** — which issues would block a merge vs. which are improvements
- **Reason about React** — data flow, hooks, state ownership, render behavior
- **Reason about TypeScript** — type safety, modeling, consistency
- **Think about maintainability** — conventions, extraction, duplication
- **Communicate clearly** — explain *why* something matters, not just *what* it is
- **Use AI effectively** — you are welcome and encouraged to use AI tools (Cursor, Claude, ChatGPT, etc.)

---

## Format

Deliver your review as written feedback — structured however makes sense to you.

A good review includes:

- **Merge blockers** — things that must be fixed before this ships
- **Important concerns** — real issues that matter but aren't urgent
- **Minor / nit** — style, naming, conventions

For each issue you raise, explain *why it matters* — not just that it exists.

---

## Time

Target: **35–45 minutes**.

You do not need to find every issue. Prioritization and judgment matter more than exhaustiveness.

---

## AI usage

AI tools are **fully allowed and encouraged**. We are interested in how you collaborate with them — what you prompt, how you evaluate the output, and where you rely on your own judgment vs. deferring to the tool.

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm run test         # Jest
```

---

## What to avoid

- Do not rewrite the entire feature.
- Do not get lost in nits — a review that lists 20 small style issues and misses a correctness bug is a weak review.
- Do not focus on things that are missing from the codebase entirely (e.g., "there's no authentication") — stay focused on what is in the PR.
