import { useState } from 'react';
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

const ACTIVE_DASHBOARD_ID = 'dash-1';

export const App = () => {
  const [, setWidgetLibraryOpen] = useState(false);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <AppShell>
                <DashboardPage
                  dashboardId={ACTIVE_DASHBOARD_ID}
                  onOpenWidgetLibrary={() => setWidgetLibraryOpen(true)}
                />
              </AppShell>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
