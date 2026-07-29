/**
 * Homepage filtering: the frontage chips on the designs section and the
 * region tabs on the house-and-land section.
 *
 * Both work the same way — the full set is already in the DOM and matching is
 * a pure predicate over data attributes, so the same logic ports directly to a
 * WordPress Loop Grid with a taxonomy filter.
 */

interface FilterConfig {
  /** Container carrying the buttons. */
  controls: string;
  /** Container carrying the filterable cards. */
  items: string;
  /** Data attribute the buttons and cards agree on. */
  key: string;
  /** Cards shown at once. The rest stay in the DOM for the full listing page. */
  limit?: number;
  /** Optional live region announcing the result count. */
  status?: string;
  statusLabel?: (shown: number, total: number, value: string) => string;
}

function applyFilter(config: FilterConfig, value: string) {
  const container = document.querySelector<HTMLElement>(config.items);
  if (!container) return;

  const cards = [...container.querySelectorAll<HTMLElement>('[data-filter-item]')];
  let shown = 0;

  for (const card of cards) {
    const cardValue = card.dataset[config.key];
    const matches = value === 'all' || cardValue === value;
    const withinLimit = !config.limit || shown < config.limit;

    if (matches && withinLimit) {
      card.hidden = false;
      shown += 1;
    } else {
      card.hidden = true;
    }
  }

  const total = cards.filter(
    (card) => value === 'all' || card.dataset[config.key] === value,
  ).length;

  if (config.status && config.statusLabel) {
    const status = document.querySelector<HTMLElement>(config.status);
    if (status) status.textContent = config.statusLabel(shown, total, value);
  }
}

function wire(config: FilterConfig) {
  const controls = document.querySelector<HTMLElement>(config.controls);
  if (!controls) return;

  const buttons = [
    ...controls.querySelectorAll<HTMLButtonElement>('[data-filter-value]'),
  ];
  if (buttons.length === 0) return;

  const select = (button: HTMLButtonElement) => {
    for (const other of buttons)
      other.setAttribute('aria-pressed', String(other === button));
    applyFilter(config, button.dataset.filterValue ?? 'all');
  };

  for (const button of buttons) {
    button.addEventListener('click', () => select(button));
  }

  /* Left/right arrows move between chips, as a tab set would. */
  controls.addEventListener('keydown', (event) => {
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index === -1) return;
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
    else if (event.key === 'ArrowLeft')
      next = (index - 1 + buttons.length) % buttons.length;
    else return;
    event.preventDefault();
    buttons[next]?.focus();
    select(buttons[next]!);
  });

  const initial =
    buttons.find((b) => b.getAttribute('aria-pressed') === 'true') ?? buttons[0]!;
  select(initial);
}

wire({
  controls: '[data-designs-filter]',
  items: '[data-designs-grid]',
  key: 'frontage',
  limit: 6,
  status: '[data-designs-status]',
  statusLabel: (shown, total, value) =>
    value === 'all'
      ? `Showing ${shown} of ${total} designs`
      : `Showing ${shown} of ${total} designs on a ${value}m frontage`,
});

wire({
  controls: '[data-estates-filter]',
  items: '[data-packages-grid]',
  key: 'estate',
  limit: 3,
  status: '[data-packages-status]',
  statusLabel: (shown, total, value) => {
    const name =
      document.querySelector<HTMLElement>(`[data-filter-value="${value}"]`)?.dataset
        .filterLabel ?? 'this estate';
    return `Showing ${shown} of ${total} packages at ${name}`;
  },
});

/* The hero package finder is a real form that hands its selections to the
   listing page as query parameters — the same parameters the filter engine
   reads there. Nothing is calculated here. */
const finder = document.querySelector<HTMLFormElement>('[data-package-finder]');
finder?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(finder);
  const params = new URLSearchParams();
  for (const [key, value] of data.entries()) {
    if (typeof value === 'string' && value) params.set(key, value);
  }
  window.location.href = `/house-and-land/${params.size ? `?${params}` : ''}`;
});
