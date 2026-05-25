import { Dashboard } from '~/types/widget.types';
import { MOCK_DASHBOARDS } from '~/mocks/widgets.mock';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getDashboard = async (dashboardId: string): Promise<Dashboard> => {
  await delay(200);
  const dashboard = MOCK_DASHBOARDS.find((d) => d.id === dashboardId);
  if (!dashboard) throw new Error(`Dashboard ${dashboardId} not found`);
  return dashboard;
};

