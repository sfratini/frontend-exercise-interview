import { useEffect } from 'react';
import { Widget } from '~/types/widget.types';
import { useWidgets } from '~/queries/widgets/useWidgets';
import { useAddWidgetMutation } from '~/queries/widgets/useAddWidgetMutation';
import { EmptyState } from '~/shared/components/EmptyState';
import { LoadingSpinner } from '~/shared/components/LoadingSpinner';
import { Button } from '~/shared/components/Button';
import { WidgetLibraryItem } from './WidgetLibraryItem';
import { useWidgetLibraryState } from './useWidgetLibraryState';
import {
  ADD_ERROR_MESSAGE,
  LOAD_ERROR_MESSAGE,
  NO_RESULTS_DESCRIPTION,
  NO_RESULTS_TITLE,
  PANEL_TITLE,
  SEARCH_PLACEHOLDER,
} from './widgetLibrary.constants';
import {
  CategoryLabel,
  ErrorMessage,
  Overlay,
  Panel,
  PanelBody,
  PanelHeader,
  PanelTitle,
  SearchInput,
  SearchWrapper,
} from './widgetLibrary.styles';

interface WidgetLibraryPanelProps {
  dashboardId: string;
  widgetsOnDashboard: Widget[];
  onClose: () => void;
}

export const WidgetLibraryPanel = ({
  dashboardId,
  widgetsOnDashboard,
  onClose,
}: WidgetLibraryPanelProps) => {
  const widgetsQuery = useWidgets();
  const addWidget = useAddWidgetMutation({ dashboardId });
  const { query, setQuery, groups, addedIds } = useWidgetLibraryState({
    widgets: widgetsQuery.data ?? [],
    widgetsOnDashboard,
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const renderBody = () => {
    if (widgetsQuery.isPending) {
      return <LoadingSpinner />;
    }
    if (widgetsQuery.isError) {
      return (
        <ErrorMessage role="alert">
          {LOAD_ERROR_MESSAGE}{' '}
          <Button size="sm" variant="secondary" onClick={() => widgetsQuery.refetch()}>
            Retry
          </Button>
        </ErrorMessage>
      );
    }
    if (groups.length === 0) {
      return <EmptyState title={NO_RESULTS_TITLE} description={NO_RESULTS_DESCRIPTION} />;
    }
    return groups.map((group) => (
      <section key={group.category}>
        <CategoryLabel>{group.category}</CategoryLabel>
        {group.widgets.map((widget) => (
          <WidgetLibraryItem
            key={widget.id}
            widget={widget}
            query={query}
            isAdded={addedIds.has(widget.id)}
            isAdding={addWidget.isPending && addWidget.variables === widget.id}
            isAddDisabled={addWidget.isPending}
            onAdd={(widgetId) => addWidget.mutate(widgetId)}
          />
        ))}
      </section>
    ));
  };

  return (
    <Overlay
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Panel role="dialog" aria-modal="true" aria-label={PANEL_TITLE}>
        <PanelHeader>
          <PanelTitle>{PANEL_TITLE}</PanelTitle>
          <Button variant="ghost" size="sm" aria-label="Close widget library" onClick={onClose}>
            ✕
          </Button>
        </PanelHeader>
        <SearchWrapper>
          <SearchInput
            type="search"
            aria-label="Search widgets"
            placeholder={SEARCH_PLACEHOLDER}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
        </SearchWrapper>
        <PanelBody>
          {addWidget.isError && <ErrorMessage role="alert">{ADD_ERROR_MESSAGE}</ErrorMessage>}
          {renderBody()}
        </PanelBody>
      </Panel>
    </Overlay>
  );
};
