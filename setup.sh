#!/usr/bin/env bash
# Run this once from the repo root to set up git branches and install dependencies.
set -e

echo "==> Installing dependencies..."
npm install --legacy-peer-deps

echo "==> Initializing git..."
git init
git checkout -b main

# Baseline commit — excludes the PR-only files
git add \
  package.json \
  tsconfig.json \
  tsconfig.test.json \
  vite.config.ts \
  jest.config.ts \
  .eslintrc.cjs \
  .prettierrc \
  .gitignore \
  index.html \
  README.md \
  AGENTS.md \
  docs/ \
  src/main.tsx \
  src/App.tsx \
  src/theme/ \
  src/types/ \
  src/services/ \
  src/queries/ \
  src/mocks/ \
  src/shared/ \
  src/components/DashboardPage/ \
  src/components/WidgetCard/ \
  src/__mocks__/

# Rewrite App.tsx for the baseline (no WidgetLibrary import)
cat > src/App.tsx << 'BASELINE_APP'
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from '~/theme';
import { DashboardPage } from '~/components/DashboardPage';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: ${theme.colors.background};
    color: ${theme.colors.text.primary};
  }
`;

const AppShell = styled.div`
  min-height: 100vh;
`;

export const App = () => {
  const [widgetLibraryOpen, setWidgetLibraryOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      <AppShell>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <DashboardPage
                  dashboardId="dash-1"
                  onOpenWidgetLibrary={() => setWidgetLibraryOpen(true)}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </AppShell>
    </>
  );
};
BASELINE_APP

git add src/App.tsx

git commit -m "feat: baseline dashboard app

React 18 + TypeScript + Vite + styled-components dashboard app.
Includes theme system, shared components, React Query data layer,
DashboardPage, and WidgetCard."

echo "==> Creating PR branch..."
git checkout -b frontend-review-pr

# Restore the full App.tsx with WidgetLibrary wiring
cat > src/App.tsx << 'PR_APP'
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from '~/theme';
import { DashboardPage } from '~/components/DashboardPage';
import { WidgetLibraryPanel } from '~/components/WidgetLibrary';
import { useDashboardWidgets } from '~/queries/widgets/useWidgets';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: ${theme.colors.background};
    color: ${theme.colors.text.primary};
  }
`;

const AppShell = styled.div`
  min-height: 100vh;
`;

const ACTIVE_DASHBOARD_ID = 'dash-1';

const AppContent = () => {
  const [widgetLibraryOpen, setWidgetLibraryOpen] = useState(false);
  const { data: widgetsOnDashboard = [] } = useDashboardWidgets({
    dashboardId: ACTIVE_DASHBOARD_ID,
  });

  return (
    <AppShell>
      <DashboardPage
        dashboardId={ACTIVE_DASHBOARD_ID}
        onOpenWidgetLibrary={() => setWidgetLibraryOpen(true)}
      />
      {widgetLibraryOpen && (
        <WidgetLibraryPanel
          dashboardId={ACTIVE_DASHBOARD_ID}
          widgetsOnDashboard={widgetsOnDashboard}
          onClose={() => setWidgetLibraryOpen(false)}
        />
      )}
    </AppShell>
  );
};

export const App = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  </>
);
PR_APP

git add \
  src/App.tsx \
  src/components/WidgetLibrary/

git commit -m "feat: add widget library panel to dashboard

Adds a slide-in Widget Library panel that lets users browse available
widgets and add them to the current dashboard. The panel supports
keyword search across widget title and category, groups results by
category, and highlights matching text.

New files:
- src/components/WidgetLibrary/WidgetLibraryPanel.tsx
- src/components/WidgetLibrary/WidgetLibraryItem.tsx
- src/components/WidgetLibrary/useWidgetLibraryState.ts
- src/components/WidgetLibrary/widgetLibrary.constants.ts

Modified:
- src/App.tsx — wires up the panel with open/close state"

echo "==> Switching back to main..."
git checkout main

echo ""
echo "✓ Repository ready."
echo ""
echo "  Baseline branch : main"
echo "  PR branch       : frontend-review-pr"
echo ""
echo "  Inspect PR diff : git diff main..frontend-review-pr"
echo "  Start app       : npm run dev"
echo "  Type check      : npm run type-check"
echo "  Lint            : npm run lint"
echo "  Tests           : npm run test"
echo ""
echo "  Candidate docs  : docs/CANDIDATE_FRONTEND_PR_REVIEW.md"
echo "  Interviewer kit : interviewer-private/"
