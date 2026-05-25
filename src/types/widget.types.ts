export type ChartType = 'bar' | 'line' | 'pie' | 'table' | 'counter';

export type DatabaseType = 'primary' | 'warehouse';

export interface WidgetProperties {
  chartType: ChartType;
  colors?: string[];
  showLegend?: boolean;
  timeColumn?: string;
  xKey?: string;
  yKey?: string;
  xLabel?: string;
  yLabel?: string;
}

export interface Widget {
  id: string;
  title: string;
  description?: string;
  sql: string;
  databaseType: DatabaseType;
  properties: WidgetProperties;
  category: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  // pre-computed mock query result rows
  data?: Record<string, string | number>[];
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  widgetIds: string[];
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  isOwner: boolean;
}

export interface DashboardWidget extends Widget {
  dashboardId: string;
  position: { x: number; y: number; w: number; h: number };
}
