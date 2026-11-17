import { Widget } from '~/types/widget.types';
import { Button } from '~/shared/components/Button';
import { HighlightedText } from './HighlightedText';
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
          <HighlightedText text={widget.title} query={query} />
        </ItemTitle>
        <BadgeRow>
          <Badge>
            <HighlightedText text={widget.category} query={query} />
          </Badge>
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
