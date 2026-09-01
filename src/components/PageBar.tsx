import Link from "next/link";
import MenuOverlay from "@/components/MenuOverlay";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

/**
 * The bar on every page that is not home. Home has its own [data-menu], which
 * hides until you are past the hero; this one is always there, because an
 * inner page has no hero to hide behind.
 *
 * The burger and the panel it opens are the same ones home uses — same markup,
 * same stylesheet, same links — so the menu does not change shape depending on
 * which page you opened it from.
 *
 * Reveal rides along here because every page that has this bar also wants the
 * rise-in that Motion only ever gave the home page.
 */
export default function PageBar() {
  return (
    <>
      <header className="bar">
        <Link href="/" className="bar__mark">
          {site.name}
        </Link>

        <nav className="bar__links u-mono" aria-label="Pages">
          {site.pages.map((p) => (
            <Link key={p.href} href={p.href}>
              {p.short ?? p.label}
            </Link>
          ))}
          <a href={`mailto:${site.email}`}>Say hello</a>
        </nav>

        <button data-burger type="button" aria-label="Menu">
          <span />
          <span />
        </button>
      </header>

      <MenuOverlay />
      <Reveal />
    </>
  );
}
