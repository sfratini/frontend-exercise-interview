import { useMutation, useQueryClient } from '~/services/reactQuery';
import * as widgetsApi from '~/services/api/widgets.api';
import { widgetQueryKeys } from './useWidgets';
import { dashboardQueryKeys } from '../dashboards/useDashboards';

export const useAddWidgetMutation = ({ dashboardId }: { dashboardId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (widgetId: string) =>
      widgetsApi.addWidgetToDashboard({ dashboardId, widgetId }),
    // Returning the promise keeps the mutation pending until the refetches finish,
    // so callers can't re-submit before the dashboard data reflects the add.
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: widgetQueryKeys.byDashboard(dashboardId),
        }),
        queryClient.invalidateQueries({
          queryKey: dashboardQueryKeys.item(dashboardId),
        }),
      ]),
  });
};
