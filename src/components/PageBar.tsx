import Link from "next/link";
import { site } from "@/data/site";

/**
 * The bar for every page that is not the home page.
 *
 * The home page's overlay nav lives in Motion.tsx and needs GSAP; these routes
 * deliberately ship no motion bundle, so the small-screen sheet is a checkbox
 * and sibling selectors. No JavaScript, and it still opens from the keyboard
 * because the control really is a checkbox behind its label.
 *
 * The sheet is a SIBLING of <header>, never a child. `.bar` carries a
 * backdrop-filter, and a filtered element becomes the containing block for
 * `position: fixed` descendants — nested, the sheet's `inset: 0` resolved to
 * the 50px bar instead of the viewport and the panel rendered transparent.
 */
export default function PageBar() {
  const links = (
    <>
      {site.pages.map((p) => (
        <Link key={p.href} href={p.href}>
          {p.label}
        </Link>
      ))}
      <a href={`mailto:${site.email}`}>Say hello</a>
    </>
  );

  return (
    <div className="barwrap">
      {/* the state for everything below */}
      <input type="checkbox" id="bar-menu" className="bar__toggle" />

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

        <label className="bar__burger" htmlFor="bar-menu">
          <span className="ds-sr-only">Menu</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </label>
      </header>

      <div className="bar__sheet">
        <nav className="bar__sheetlinks" aria-label="Pages">
          {links}
        </nav>
        <span className="bar__sheetfoot u-mono">{site.email}</span>
      </div>
    </div>
  );
}
