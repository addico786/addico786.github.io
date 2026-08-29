"use client";

/**
 * Route-level boundary. Without one, a render error in the motion layer takes
 * the whole page to blank — on a page whose job is to get someone to email.
 * Keeps the address reachable no matter what broke.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (typeof console !== "undefined") console.error("Page render failed:", error);

  return (
    <main className="u-shell u-section u-gutter">
      <h1 className="about__lead">Something went wrong on this page.</h1>
      <p className="contact__line">
        The site failed to load properly. Reload, or email me directly and I
        will get straight back to you.
      </p>
      <p>
        <a className="contact__mail" href="mailto:hello@adnankhan.tech">
          hello@adnankhan.tech
        </a>
      </p>
      <p style={{ marginTop: "2rem" }}>
        <button type="button" className="svc__cta" onClick={reset}>
          Try again
        </button>
      </p>
    </main>
  );
}
