import { useQuery } from '~/services/reactQuery';
import * as dashboardsApi from '~/services/api/dashboards.api';

export const dashboardQueryKeys = {
  all: ['dashboards'] as const,
  list: () => [...dashboardQueryKeys.all, 'list'] as const,
  item: (id: string) => [...dashboardQueryKeys.all, 'item', id] as const,
};

export const useDashboard = ({ dashboardId }: { dashboardId: string }) =>
  useQuery({
    queryKey: dashboardQueryKeys.item(dashboardId),
    queryFn: () => dashboardsApi.getDashboard(dashboardId),
    enabled: !!dashboardId,
  });
