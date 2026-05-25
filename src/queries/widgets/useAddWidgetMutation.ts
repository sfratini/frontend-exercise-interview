import { useMutation, useQueryClient } from '~/services/reactQuery';
import * as widgetsApi from '~/services/api/widgets.api';
import { widgetQueryKeys } from './useWidgets';
import { dashboardQueryKeys } from '../dashboards/useDashboards';

export const useAddWidgetMutation = ({ dashboardId }: { dashboardId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (widgetId: string) =>
      widgetsApi.addWidgetToDashboard({ dashboardId, widgetId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: widgetQueryKeys.byDashboard(dashboardId),
      });
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.item(dashboardId),
      });
    },
  });
};
