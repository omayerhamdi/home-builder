/**
 * Entrance animation and the dimension-line draw.
 *
 * One IntersectionObserver for the whole page. Everything is `once: true` —
 * nothing re-animates on the way back up — and the whole module short-circuits
 * under `prefers-reduced-motion: reduce`.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

function markAllDone() {
  for (const el of document.querySelectorAll('[data-reveal]')) el.classList.add('is-in');
  for (const el of document.querySelectorAll('[data-dimension-line]'))
    el.classList.add('is-drawn');
}

if (reduced.matches) {
  markAllDone();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;

        if (el.hasAttribute('data-dimension-line')) el.classList.add('is-drawn');
        else el.classList.add('is-in');

        observer.unobserve(el);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
  );

  /* Stagger within a group, capped at six items so a long grid never turns
     into a slow cascade. */
  for (const group of document.querySelectorAll<HTMLElement>('[data-reveal-group]')) {
    const children = [...group.querySelectorAll<HTMLElement>('[data-reveal]')];
    children.forEach((child, i) => {
      child.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 60}ms`);
    });
  }

  for (const el of document.querySelectorAll('[data-reveal], [data-dimension-line]')) {
    observer.observe(el);
  }
}
