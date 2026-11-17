import { useState } from 'react';
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
