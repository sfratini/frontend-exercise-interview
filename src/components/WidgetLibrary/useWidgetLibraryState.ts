import { useMemo, useState } from 'react';
import { Widget } from '~/types/widget.types';

export interface WidgetGroup {
  category: string;
  widgets: Widget[];
}

export interface TextSegment {
  text: string;
  isMatch: boolean;
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const filterAndGroupWidgets = (widgets: Widget[], query: string): WidgetGroup[] => {
  const needle = query.trim().toLowerCase();
  const groups = new Map<string, Widget[]>();

  widgets
    .filter(
      (w) =>
        !needle ||
        w.title.toLowerCase().includes(needle) ||
        w.category.toLowerCase().includes(needle),
    )
    .forEach((w) => {
      groups.set(w.category, [...(groups.get(w.category) ?? []), w]);
    });

  return Array.from(groups, ([category, items]) => ({ category, widgets: items })).sort((a, b) =>
    a.category.localeCompare(b.category),
  );
};

export const splitByQuery = (text: string, query: string): TextSegment[] => {
  const needle = query.trim();
  if (!needle) return [{ text, isMatch: false }];

  const parts = text.split(new RegExp(`(${escapeRegExp(needle)})`, 'i'));
  return parts
    .filter((part) => part !== '')
    .map((part) => ({ text: part, isMatch: part.toLowerCase() === needle.toLowerCase() }));
};

export const useWidgetLibraryState = ({
  widgets,
  widgetsOnDashboard,
}: {
  widgets: Widget[];
  widgetsOnDashboard: Widget[];
}) => {
  const [query, setQuery] = useState('');

  const groups = useMemo(() => filterAndGroupWidgets(widgets, query), [widgets, query]);
  const addedIds = useMemo(
    () => new Set(widgetsOnDashboard.map((w) => w.id)),
    [widgetsOnDashboard],
  );

  return { query, setQuery, groups, addedIds };
};
