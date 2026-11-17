import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { theme } from '~/theme';
import { Widget } from '~/types/widget.types';

const CHART_COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
];

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: ${theme.spaces.sm};
`;

const CounterValue = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  line-height: 1;
`;

const CounterChange = styled.div<{ $positive: boolean }>`
  font-size: ${theme.fontSize.md};
  font-weight: 500;
  color: ${({ $positive }) =>
    $positive ? theme.colors.status.success : theme.colors.status.error};
`;

const CounterLabel = styled.div`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.muted};
`;

const TableContainer = styled.div`
  overflow: auto;
  height: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${theme.fontSize.sm};
`;

const Th = styled.th`
  text-align: left;
  padding: ${theme.spaces.sm} ${theme.spaces.md};
  border-bottom: 2px solid ${theme.colors.border};
  color: ${theme.colors.text.secondary};
  font-weight: 600;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: ${theme.spaces.sm} ${theme.spaces.md};
  border-bottom: 1px solid ${theme.colors.border};
  color: ${theme.colors.text.primary};
`;

const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
  &:hover ${Td} {
    background: ${theme.colors.surfaceHover};
  }
`;

interface ChartViewProps {
  widget: Widget;
  height?: number;
}

const formatValue = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return String(value);
};

export const ChartView = ({ widget, height = 220 }: ChartViewProps) => {
  const { properties, data = [] } = widget;
  const { chartType, xKey = 'x', yKey = 'y', showLegend } = properties;

  if (chartType === 'counter') {
    const row = data[0] ?? {};
    const value = Number(row.value ?? 0);
    const change = Number(row.change ?? 0);
    const changeLabel = String(row.changeLabel ?? '');
    return (
      <CounterContainer style={{ height }}>
        <CounterValue>{value.toLocaleString()}</CounterValue>
        {change !== 0 && (
          <CounterChange $positive={change > 0}>
            {change > 0 ? '+' : ''}{change}%
          </CounterChange>
        )}
        {changeLabel && <CounterLabel>{changeLabel}</CounterLabel>}
      </CounterContainer>
    );
  }

  if (chartType === 'table') {
    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    return (
      <TableContainer style={{ maxHeight: height }}>
        <Table>
          <thead>
            <tr>
              {columns.map((col) => (
                <Th key={col}>{col}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <Tr key={i}>
                {columns.map((col) => (
                  <Td key={col}>{String(row[col] ?? '')}</Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    );
  }

  if (chartType === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey={yKey}
            nameKey={xKey}
            cx="50%"
            cy="50%"
            outerRadius={height / 2 - 20}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          {showLegend && <Legend />}
          <Tooltip formatter={(v: number) => formatValue(v)} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: theme.colors.text.muted }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: theme.colors.text.muted }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatValue}
            width={45}
          />
          <Tooltip formatter={(v: number) => formatValue(v)} />
          {showLegend && <Legend />}
          <Bar dataKey={yKey} fill={CHART_COLORS[0]} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // line (default)
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: theme.colors.text.muted }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: theme.colors.text.muted }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatValue}
          width={45}
        />
        <Tooltip formatter={(v: number) => formatValue(v)} />
        {showLegend && <Legend />}
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={CHART_COLORS[0]}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
