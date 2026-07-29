/**
 * Header behaviour: desktop mega menus and the mobile drawer.
 *
 * No framework, no dependencies. The mega menu is hover-intent on pointer
 * devices and click everywhere else; the drawer traps focus and is inert when
 * closed. Everything here is straightforward enough to be reproduced with
 * Elementor's own nav widget plus a small custom script.
 */

const OPEN_DELAY = 120;
const CLOSE_DELAY = 240;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const backdrop = document.querySelector<HTMLElement>('[data-nav-backdrop]');
const drawer = document.querySelector<HTMLElement>('[data-mobile-nav]');
const drawerDialog = drawer?.querySelector<HTMLElement>('[data-nav-dialog]');
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
const isDesktop = window.matchMedia('(min-width: 1024px)');

/* ------------------------------------------------------------------ *
 * Desktop mega menus
 * ------------------------------------------------------------------ */

interface MegaItem {
  root: HTMLElement;
  trigger: HTMLButtonElement;
  panel: HTMLElement;
}

const items: MegaItem[] = [...document.querySelectorAll<HTMLElement>('[data-nav-item]')]
  .map((root) => ({
    root,
    trigger: root.querySelector<HTMLButtonElement>('[data-nav-trigger]')!,
    panel: root.querySelector<HTMLElement>('[data-nav-panel]')!,
  }))
  .filter((item) => item.trigger && item.panel);

let openItem: MegaItem | null = null;
let openTimer: number | undefined;
let closeTimer: number | undefined;

function openMega(item: MegaItem) {
  if (openItem === item) return;
  if (openItem) closeMega(openItem, { restoreFocus: false });

  item.panel.hidden = false;
  item.trigger.setAttribute('aria-expanded', 'true');
  backdrop?.removeAttribute('hidden');
  openItem = item;
}

function closeMega(item: MegaItem, { restoreFocus = false } = {}) {
  item.panel.hidden = true;
  item.trigger.setAttribute('aria-expanded', 'false');
  if (openItem === item) openItem = null;

  if (!openItem) backdrop?.setAttribute('hidden', '');

  if (restoreFocus) item.trigger.focus();
}

function closeAllMega() {
  if (openItem) closeMega(openItem);
}

for (const item of items) {
  item.trigger.addEventListener('click', () => {
    if (openItem === item) closeMega(item);
    else openMega(item);
  });

  item.root.addEventListener('pointerenter', (event) => {
    if (!canHover.matches || (event as PointerEvent).pointerType === 'touch') return;
    window.clearTimeout(closeTimer);
    openTimer = window.setTimeout(() => openMega(item), OPEN_DELAY);
  });

  item.root.addEventListener('pointerleave', (event) => {
    if (!canHover.matches || (event as PointerEvent).pointerType === 'touch') return;
    window.clearTimeout(openTimer);
    closeTimer = window.setTimeout(() => closeMega(item), CLOSE_DELAY);
  });

  /* Arrow-key navigation inside an open panel. */
  item.panel.addEventListener('keydown', (event) => {
    const links = [...item.panel.querySelectorAll<HTMLAnchorElement>('a[href]')];
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index === -1) return;

    const move = (next: number) => {
      event.preventDefault();
      links[(next + links.length) % links.length]?.focus();
    };

    if (event.key === 'ArrowDown') move(index + 1);
    else if (event.key === 'ArrowUp') move(index - 1);
    else if (event.key === 'Home') move(0);
    else if (event.key === 'End') move(links.length - 1);
  });

  item.trigger.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    openMega(item);
    item.panel.querySelector<HTMLAnchorElement>('a[href]')?.focus();
  });
}

backdrop?.addEventListener('click', closeAllMega);

document.addEventListener('focusin', (event) => {
  if (!openItem) return;
  if (!openItem.root.contains(event.target as Node)) closeAllMega();
});

/* ------------------------------------------------------------------ *
 * Mobile drawer
 * ------------------------------------------------------------------ */

let lastFocused: HTMLElement | null = null;

function openDrawer() {
  if (!drawer || !toggle) return;
  lastFocused = document.activeElement as HTMLElement;
  drawer.inert = false;
  drawer.setAttribute('data-open', '');
  toggle.setAttribute('aria-expanded', 'true');
  document.body.setAttribute('data-nav-open', '');
  drawerDialog?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
}

function closeDrawer({ restoreFocus = true } = {}) {
  if (!drawer || !toggle) return;
  if (!drawer.hasAttribute('data-open')) return;
  drawer.removeAttribute('data-open');
  drawer.inert = true;
  toggle.setAttribute('aria-expanded', 'false');
  document.body.removeAttribute('data-nav-open');
  if (restoreFocus) (lastFocused ?? toggle).focus();
}

toggle?.addEventListener('click', () => {
  if (drawer?.hasAttribute('data-open')) closeDrawer();
  else openDrawer();
});

for (const close of document.querySelectorAll<HTMLElement>('[data-nav-close]')) {
  close.addEventListener('click', () => closeDrawer());
}

/* Following a link should close the drawer behind it. */
drawerDialog?.addEventListener('click', (event) => {
  const link = (event.target as HTMLElement).closest('a[href]');
  if (link) closeDrawer({ restoreFocus: false });
});

/* Focus trap. */
drawer?.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab' || !drawerDialog) return;
  const focusable = [...drawerDialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => el.offsetParent !== null,
  );
  if (focusable.length === 0) return;

  const first = focusable[0]!;
  const last = focusable[focusable.length - 1]!;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

/* Accordions inside the drawer. */
for (const trigger of document.querySelectorAll<HTMLButtonElement>(
  '[data-acc-trigger]',
)) {
  const panel = document.getElementById(trigger.getAttribute('aria-controls') ?? '');
  if (!panel) continue;

  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!open));
    panel.hidden = open;
  });
}

/* ------------------------------------------------------------------ *
 * Global keys and breakpoint changes
 * ------------------------------------------------------------------ */

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (drawer?.hasAttribute('data-open')) closeDrawer();
  else if (openItem) closeMega(openItem, { restoreFocus: true });
});

isDesktop.addEventListener('change', (event) => {
  if (event.matches) closeDrawer({ restoreFocus: false });
  else closeAllMega();
});
