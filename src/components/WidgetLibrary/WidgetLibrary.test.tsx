import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '~/services/reactQuery';
import { useDashboardWidgets } from '~/queries/widgets/useWidgets';
import { widgetQueryKeys } from '~/queries/widgets/useWidgets';
import * as widgetsApi from '~/services/api/widgets.api';
import { MOCK_WIDGETS } from '~/mocks/widgets.mock';
import { WidgetLibraryPanel } from './WidgetLibraryPanel';
import { filterAndGroupWidgets, splitByQuery } from './useWidgetLibraryState';

jest.mock('~/services/api/widgets.api');
const api = widgetsApi as jest.Mocked<typeof widgetsApi>;

const renderPanel = (onClose = jest.fn(), onDashboard = [MOCK_WIDGETS[0]]) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <WidgetLibraryPanel dashboardId="dash-1" widgetsOnDashboard={onDashboard} onClose={onClose} />
    </QueryClientProvider>,
  );
  return { onClose };
};

beforeEach(() => {
  jest.resetAllMocks();
  api.getWidgets.mockResolvedValue(MOCK_WIDGETS);
  api.addWidgetToDashboard.mockResolvedValue();
});

describe('filterAndGroupWidgets', () => {
  it('groups by category, sorted', () => {
    const groups = filterAndGroupWidgets(MOCK_WIDGETS, '');
    const names = groups.map((g) => g.category);
    expect(names).toEqual([...names].sort());
    expect(groups.flatMap((g) => g.widgets)).toHaveLength(MOCK_WIDGETS.length);
  });

  it('matches title or category case-insensitively', () => {
    const category = MOCK_WIDGETS[0].category;
    const groups = filterAndGroupWidgets(MOCK_WIDGETS, `  ${category.toUpperCase()} `);
    expect(groups).toHaveLength(1);
    expect(groups[0].category).toBe(category);
  });

  it('returns nothing when no match', () => {
    expect(filterAndGroupWidgets(MOCK_WIDGETS, 'zzzz-nope')).toEqual([]);
  });
});

describe('splitByQuery', () => {
  it('highlights matches case-insensitively', () => {
    expect(splitByQuery('Daily Users', 'user')).toEqual([
      { text: 'Daily ', isMatch: false },
      { text: 'User', isMatch: true },
      { text: 's', isMatch: false },
    ]);
  });

  it('treats regex characters literally', () => {
    expect(() => splitByQuery('a (b) c', '(')).not.toThrow();
    expect(splitByQuery('a (b) c', '(')[1]).toEqual({ text: '(', isMatch: true });
    expect(splitByQuery('abc', '.*')).toEqual([{ text: 'abc', isMatch: false }]);
  });
});

describe('WidgetLibraryPanel', () => {
  it('lists widgets grouped by category', async () => {
    renderPanel();
    expect(await screen.findByText(MOCK_WIDGETS[0].title)).toBeTruthy();
    expect(screen.getAllByText(MOCK_WIDGETS[0].category).length).toBeGreaterThan(0);
  });

  it('filters by search and shows empty state', async () => {
    renderPanel();
    await screen.findByText(MOCK_WIDGETS[0].title);
    await userEvent.type(screen.getByLabelText('Search widgets'), 'zzzz-nope');
    expect(screen.getByText('No widgets found')).toBeTruthy();
  });

  it('disables widgets already on the dashboard', async () => {
    renderPanel();
    const added = await screen.findByLabelText(`Added ${MOCK_WIDGETS[0].title}`);
    expect((added as HTMLButtonElement).disabled).toBe(true);
  });

  it('adds a widget and disables buttons while pending', async () => {
    let resolve!: () => void;
    api.addWidgetToDashboard.mockReturnValue(new Promise<void>((r) => (resolve = r)));
    renderPanel();
    const target = MOCK_WIDGETS[1];
    await userEvent.click(await screen.findByLabelText(`Add ${target.title}`));
    await waitFor(() =>
      expect(api.addWidgetToDashboard).toHaveBeenCalledWith({
        dashboardId: 'dash-1',
        widgetId: target.id,
      }),
    );
    const other = screen.getByLabelText(`Add ${MOCK_WIDGETS[2].title}`) as HTMLButtonElement;
    expect(other.disabled).toBe(true);
    resolve();
    await waitFor(() => expect(other.disabled).toBe(false));
  });

  it('shows an error when add fails', async () => {
    api.addWidgetToDashboard.mockRejectedValue(new Error('boom'));
    renderPanel();
    await userEvent.click(await screen.findByLabelText(`Add ${MOCK_WIDGETS[1].title}`));
    expect((await screen.findByRole('alert')).textContent).toContain('Failed to add widget');
  });

  it('shows an error when loading fails', async () => {
    api.getWidgets.mockRejectedValue(new Error('boom'));
    renderPanel();
    const alert = await screen.findByRole('alert');
    expect(within(alert).getByText('Retry')).toBeTruthy();
  });

  it('closes on Escape and on the close button', async () => {
    const { onClose } = renderPanel();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByLabelText('Close widget library'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('exposes a labelled dialog', () => {
    renderPanel();
    expect(screen.getByRole('dialog', { name: 'Widget Library' })).toBeTruthy();
  });
});

describe('review follow-ups', () => {
  const newClient = () =>
    new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });

  it('keeps the Add button disabled from click until the widget shows as Added', async () => {
    const onDashboard = [MOCK_WIDGETS[0].id];
    api.getDashboardWidgets.mockImplementation(async () => {
      await new Promise((r) => setTimeout(r, 60));
      return MOCK_WIDGETS.filter((w) => onDashboard.includes(w.id));
    });
    api.addWidgetToDashboard.mockImplementation(async ({ widgetId }) => {
      onDashboard.push(widgetId);
    });

    // Mirrors App: the panel receives widgets from useDashboardWidgets.
    const Harness = () => {
      const { data = [] } = useDashboardWidgets({ dashboardId: 'dash-1' });
      return <WidgetLibraryPanel dashboardId="dash-1" widgetsOnDashboard={data} onClose={jest.fn()} />;
    };
    render(
      <QueryClientProvider client={newClient()}>
        <Harness />
      </QueryClientProvider>,
    );

    const target = MOCK_WIDGETS[1];
    const addButton = await screen.findByLabelText(`Add ${target.title}`);
    const enabledAddSamples: boolean[] = [];
    await userEvent.click(addButton);
    const timer = setInterval(() => {
      const btn = screen.queryByLabelText(`Add ${target.title}`) as HTMLButtonElement | null;
      if (btn && !btn.disabled) enabledAddSamples.push(true);
    }, 5);

    await screen.findByLabelText(`Added ${target.title}`);
    clearInterval(timer);
    expect(enabledAddSamples).toEqual([]);
    expect(api.addWidgetToDashboard).toHaveBeenCalledTimes(1);
  });

  it('does not close when a drag starts in the panel and ends on the overlay', async () => {
    const { onClose } = renderPanel();
    const input = await screen.findByLabelText('Search widgets');
    const overlay = screen.getByRole('dialog').parentElement as HTMLElement;

    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: input },
      { target: overlay },
      { keys: '[/MouseLeft]', target: overlay },
    ]);
    expect(onClose).not.toHaveBeenCalled();

    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not claim to be modal without a focus trap', () => {
    renderPanel();
    expect(screen.getByRole('dialog').getAttribute('aria-modal')).toBeNull();
  });

  it('keeps the loaded list and shows a banner when a background refetch fails', async () => {
    const client = newClient();
    render(
      <QueryClientProvider client={client}>
        <WidgetLibraryPanel dashboardId="dash-1" widgetsOnDashboard={[]} onClose={jest.fn()} />
      </QueryClientProvider>,
    );
    await screen.findByText(MOCK_WIDGETS[0].title);

    api.getWidgets.mockRejectedValue(new Error('boom'));
    await act(async () => {
      await client.refetchQueries({ queryKey: widgetQueryKeys.list() });
    });

    expect((await screen.findByRole('alert')).textContent).toContain('Could not refresh');
    expect(screen.getByText(MOCK_WIDGETS[0].title)).toBeTruthy();
    expect(screen.queryByText('Retry')).toBeNull();
  });

  it('highlights category matches in the group label and badge', async () => {
    renderPanel();
    await screen.findByText(MOCK_WIDGETS[0].title);
    const category = MOCK_WIDGETS[0].category;
    await userEvent.type(screen.getByLabelText('Search widgets'), category.slice(0, 3));

    const marks = Array.from(document.querySelectorAll('mark')).map((m) => m.textContent);
    expect(marks.length).toBeGreaterThan(0);
    const badges = within(screen.getByRole('dialog')).getAllByText(category.slice(0, 3), {
      selector: 'mark',
      ignore: 'p mark',
    });
    expect(badges.length).toBeGreaterThan(0);
  });
});
