import { Widget } from '~/types/widget.types';
import { MOCK_WIDGETS, MOCK_DASHBOARD } from '~/mocks/widgets.mock';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getWidgets = async (): Promise<Widget[]> => {
  await delay(400);
  return MOCK_WIDGETS;
};

export const getDashboardWidgets = async (dashboardId: string): Promise<Widget[]> => {
  await delay(300);
  const dashboard = dashboardId === MOCK_DASHBOARD.id ? MOCK_DASHBOARD : null;
  if (!dashboard) return [];
  return MOCK_WIDGETS.filter((w) => dashboard.widgetIds.includes(w.id));
};

export const addWidgetToDashboard = async ({
  widgetId,
}: {
  dashboardId: string;
  widgetId: string;
}): Promise<void> => {
  await delay(500);
  if (!MOCK_DASHBOARD.widgetIds.includes(widgetId)) {
    MOCK_DASHBOARD.widgetIds.push(widgetId);
  }
};
