"use client";

import { useEffect } from "react";

/**
 * The reveal half of the motion engine, on its own.
 *
 * Motion.tsx runs the same observer, but it also carries GSAP, SplitText and
 * Lenis and only mounts on the home page — which is why the journal and the
 * tool sat there completely still. This is the observer and nothing else, so
 * the pages that exist to be read and indexed get the same rise-in as the rest
 * of the site without the ~130KB animation bundle behind it.
 *
 * Contract is identical to Motion's: mark a container `data-inview`, mark the
 * things inside it `ds-fade-up`, order them with `--i`.
 */
export default function Reveal() {
  useEffect(() => {
    /* Same contract Motion has: this effect running is proof the bundle is
       alive, so the bootstrap's un-gate timer is no longer needed. */
    clearTimeout(
      (window as unknown as { __introFailsafe?: number }).__introFailsafe
    );

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-inview]")
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-inview");
          io.unobserve(e.target);
        }),
      /* No negative bottom margin, unlike Motion's copy of this observer. That
         margin shrinks the root by 10%, so an element sitting in the last 10%
         of the page — the journal's own footer, for one — can never reach the
         threshold and stayed invisible at full scroll. */
      { threshold: 0.2 }
    );
    targets.forEach((el) => io.observe(el));

    /* Anything already on screen at mount never crosses the threshold on a
       page short enough not to scroll, so give it the class outright. */
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("is-inview");
        io.unobserve(el);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
