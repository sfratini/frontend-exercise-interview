import { useDashboard } from '~/queries/dashboards/useDashboards';
import { useDashboardWidgets } from '~/queries/widgets/useWidgets';
import { WidgetCard } from '~/components/WidgetCard';
import { EmptyState } from '~/shared/components/EmptyState';
import { LoadingSpinner } from '~/shared/components/LoadingSpinner';
import { FlexMiddle } from '~/shared/components/Flex';
import { Button } from '~/shared/components/Button';
import {
  HeaderLeft,
  PageContainer,
  PageDescription,
  PageHeader,
  PageTitle,
  PageWrapper,
  SectionHeader,
  SectionTitle,
  WidgetCount,
  WidgetGrid,
} from './DashboardPage.styled';

interface DashboardPageProps {
  dashboardId: string;
  onOpenWidgetLibrary: () => void;
}

export const DashboardPage = ({
  dashboardId,
  onOpenWidgetLibrary,
}: DashboardPageProps) => {
  const dashboardQuery = useDashboard({ dashboardId });
  const widgetsQuery = useDashboardWidgets({ dashboardId });

  if (dashboardQuery.isLoading) {
    return (
      <PageWrapper>
        <FlexMiddle style={{ padding: '96px' }}>
          <LoadingSpinner size={32} />
        </FlexMiddle>
      </PageWrapper>
    );
  }

  if (dashboardQuery.isError || !dashboardQuery.data) {
    return (
      <PageWrapper>
        <EmptyState
          title="Dashboard not found"
          description="This dashboard may have been deleted or you don't have access to it."
        />
      </PageWrapper>
    );
  }

  const dashboard = dashboardQuery.data;
  const widgets = widgetsQuery.data ?? [];

  return (
    <PageWrapper>
      <PageContainer>
        <PageHeader>
          <HeaderLeft>
            <PageTitle>{dashboard.name}</PageTitle>
            {dashboard.description && (
              <PageDescription>{dashboard.description}</PageDescription>
            )}
          </HeaderLeft>
          {dashboard.isOwner && (
            <Button onClick={onOpenWidgetLibrary}>+ Add Widget</Button>
          )}
        </PageHeader>

        <div>
          <SectionHeader>
            <SectionTitle>Widgets</SectionTitle>
            <WidgetCount>
              {widgets.length} chart{widgets.length !== 1 ? 's' : ''}
            </WidgetCount>
          </SectionHeader>
        </div>

        {widgetsQuery.isLoading ? (
          <FlexMiddle style={{ padding: '64px' }}>
            <LoadingSpinner />
          </FlexMiddle>
        ) : widgets.length === 0 ? (
          <EmptyState
            title="No widgets yet"
            description="Add widgets from the library to start building your dashboard."
            action={
              dashboard.isOwner ? (
                <Button onClick={onOpenWidgetLibrary}>Browse Widget Library</Button>
              ) : undefined
            }
          />
        ) : (
          <WidgetGrid>
            {widgets.map((widget) => (
              <WidgetCard key={widget.id} widget={widget} />
            ))}
          </WidgetGrid>
        )}
      </PageContainer>
    </PageWrapper>
  );
};
