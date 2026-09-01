"use client";

import { useEffect } from "react";
import { site } from "@/data/site";

/**
 * The one mobile menu. Home used to have this panel and the inner pages had a
 * separate CSS-checkbox sheet, which looked and behaved differently — same
 * site, two menus. Both now render this component, so there is one markup, one
 * stylesheet and one set of links.
 *
 * `home` only changes the hrefs: on the home page the links have to stay bare
 * hashes so Motion's smooth-scroll handler picks them up, while everywhere else
 * they need the leading slash to navigate home first.
 */
export default function MenuOverlay({ home = false }: { home?: boolean }) {
  useEffect(() => {
    const overlay = document.querySelector<HTMLElement>("[data-overlay]");
    if (!overlay) return;

    /* Lenis lives in Motion and only on the home page. The events let this
       component stay the sole owner of the panel without importing it. */
    const open = () => {
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("menu:open"));
    };
    const close = () => {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("menu:close"));
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    };

    const burger = document.querySelector<HTMLElement>("[data-burger]");
    const closeBtn = overlay.querySelector<HTMLElement>("[data-overlay-close]");
    const links = Array.from(
      overlay.querySelectorAll<HTMLElement>("[data-overlay-link]")
    );
    /* 40ms, so the panel starts closing after the anchor has been handled
       rather than yanking the target out from under it. */
    const onLink = () => setTimeout(close, 40);

    burger?.addEventListener("click", open);
    closeBtn?.addEventListener("click", close);
    links.forEach((a) => a.addEventListener("click", onLink));
    document.addEventListener("keydown", onKey);

    return () => {
      burger?.removeEventListener("click", open);
      closeBtn?.removeEventListener("click", close);
      links.forEach((a) => a.removeEventListener("click", onLink));
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const links = [
    ...site.pages.map((p) => ({
      label: p.label,
      href: home && p.href.startsWith("/#") ? p.href.slice(1) : p.href,
    })),
    { label: "Say hello", href: home ? "#contact" : "/#contact" },
  ];

  return (
    <div data-overlay>
      <div className="overlay__head">
        <span className="overlay__mark">{site.name}</span>
        <button data-overlay-close type="button" aria-label="Close menu">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M4 4 L20 20 M20 4 L4 20" />
          </svg>
        </button>
      </div>

      <div className="overlay__gap" aria-hidden="true" />

      <div className="overlay__links">
        {links.map((n, i) => (
          <a
            key={n.href}
            href={n.href}
            data-overlay-link
            style={{ ["--i" as string]: i }}
          >
            <span>{n.label}</span>
          </a>
        ))}
      </div>

      <div className="overlay__filler" aria-hidden="true" />

      <div className="overlay__foot">
        {/* 3, not 6: the foot rows start drawing while the last nav link is
            still coming in, which is the cadence the panel was built with.
            Running them after it put the last social link almost a second and
            a half after the tap, long enough to read as missing. */}
        <a href={`mailto:${site.email}`} style={{ ["--i" as string]: 3 }}>
          <span>{site.email}</span>
        </a>
        {site.socials.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ["--i" as string]: 4 + i }}
          >
            <span>{s.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
