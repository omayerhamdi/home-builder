/**
 * Header behaviour: scroll state, desktop mega menus, mobile drawer.
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

const header = document.querySelector<HTMLElement>('[data-header]');
const backdrop = document.querySelector<HTMLElement>('[data-nav-backdrop]');
const drawer = document.querySelector<HTMLElement>('[data-mobile-nav]');
const drawerDialog = drawer?.querySelector<HTMLElement>('[data-nav-dialog]');
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
const isDesktop = window.matchMedia('(min-width: 1024px)');

/* ------------------------------------------------------------------ *
 * Header: solid once the page has scrolled past the hero's top edge.
 * ------------------------------------------------------------------ */

if (header?.hasAttribute('data-over-hero')) {
  /* A sentinel as tall as the header: while any part of it is still in view
     the page is effectively at the top and the bar stays transparent. */
  const sentinel = document.createElement('div');
  sentinel.style.cssText =
    'position:absolute;top:0;left:0;height:72px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);

  new IntersectionObserver(([entry]) => {
    if (entry && !entry.isIntersecting) header.setAttribute('data-solid', '');
    else if (!header.querySelector('[data-nav-panel]:not([hidden])'))
      header.removeAttribute('data-solid');
  }).observe(sentinel);
}

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
  header?.setAttribute('data-solid', '');
  openItem = item;
}

function closeMega(item: MegaItem, { restoreFocus = false } = {}) {
  item.panel.hidden = true;
  item.trigger.setAttribute('aria-expanded', 'false');
  if (openItem === item) openItem = null;

  if (!openItem) {
    backdrop?.setAttribute('hidden', '');
    if (header?.hasAttribute('data-over-hero') && window.scrollY < 8) {
      header.removeAttribute('data-solid');
    }
  }

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
