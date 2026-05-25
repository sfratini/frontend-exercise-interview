import { Widget } from '~/types/widget.types';
import { ChartView } from '~/shared/components/ChartView';
import { Button } from '~/shared/components/Button';
import {
  CardBody,
  CardContainer,
  CardFooter,
  CardHeader,
  CardTitle,
  CategoryBadge,
  ChartTypeBadge,
} from './WidgetCard.styled';

interface WidgetCardProps {
  widget: Widget;
  onRemove?: (widgetId: string) => void;
}

export const WidgetCard = ({ widget, onRemove }: WidgetCardProps) => (
  <CardContainer>
    <CardHeader>
      <CardTitle title={widget.title}>{widget.title}</CardTitle>
      <ChartTypeBadge>{widget.properties.chartType}</ChartTypeBadge>
    </CardHeader>

    <CardBody>
      <ChartView widget={widget} height={200} />
    </CardBody>

    <CardFooter>
      <CategoryBadge>{widget.category}</CategoryBadge>
      {onRemove && (
        <Button variant="ghost" size="sm" onClick={() => onRemove(widget.id)}>
          Remove
        </Button>
      )}
    </CardFooter>
  </CardContainer>
);
