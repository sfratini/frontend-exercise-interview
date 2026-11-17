import { Widget } from '~/types/widget.types';
import { Button } from '~/shared/components/Button';
import { splitByQuery } from './useWidgetLibraryState';
import {
  Badge,
  BadgeRow,
  ItemContainer,
  ItemContent,
  ItemHeader,
  ItemTitle,
} from './widgetLibrary.styles';

interface WidgetLibraryItemProps {
  widget: Widget;
  query: string;
  isAdded: boolean;
  isAdding: boolean;
  isAddDisabled: boolean;
  onAdd: (widgetId: string) => void;
}

export const WidgetLibraryItem = ({
  widget,
  query,
  isAdded,
  isAdding,
  isAddDisabled,
  onAdd,
}: WidgetLibraryItemProps) => (
  <ItemContainer>
    <ItemHeader>
      <ItemContent>
        <ItemTitle title={widget.title}>
          {splitByQuery(widget.title, query).map((segment, index) =>
            segment.isMatch ? (
              <mark key={index}>{segment.text}</mark>
            ) : (
              <span key={index}>{segment.text}</span>
            ),
          )}
        </ItemTitle>
        <BadgeRow>
          <Badge>{widget.category}</Badge>
          <Badge>{widget.properties.chartType}</Badge>
        </BadgeRow>
      </ItemContent>
      <Button
        size="sm"
        variant={isAdded ? 'secondary' : 'primary'}
        isLoading={isAdding}
        disabled={isAdded || isAddDisabled}
        aria-label={`${isAdded ? 'Added' : 'Add'} ${widget.title}`}
        onClick={() => onAdd(widget.id)}
      >
        {isAdded ? 'Added' : 'Add'}
      </Button>
    </ItemHeader>
  </ItemContainer>
);
