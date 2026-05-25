import { useQuery } from '~/services/reactQuery';
import * as widgetsApi from '~/services/api/widgets.api';

export const widgetQueryKeys = {
  all: ['widgets'] as const,
  list: () => [...widgetQueryKeys.all, 'list'] as const,
  byDashboard: (dashboardId: string) =>
    [...widgetQueryKeys.all, 'dashboard', dashboardId] as const,
};

export const useWidgets = () =>
  useQuery({
    queryKey: widgetQueryKeys.list(),
    queryFn: widgetsApi.getWidgets,
    staleTime: 5 * 60 * 1000,
  });

export const useDashboardWidgets = ({ dashboardId }: { dashboardId: string }) =>
  useQuery({
    queryKey: widgetQueryKeys.byDashboard(dashboardId),
    queryFn: () => widgetsApi.getDashboardWidgets(dashboardId),
    enabled: !!dashboardId,
  });
