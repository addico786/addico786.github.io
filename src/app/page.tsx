import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import MenuOverlay from "@/components/MenuOverlay";
import Motion from "@/components/Motion";
import SplitText from "@/components/SplitText";
import { site, projectNumber, marqueeText } from "@/data/site";

export default function Home() {
  return (
    <div data-root>
      <div data-grid aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} data-grid-col style={{ ["--i" as string]: i }} />
        ))}
      </div>

      <div data-opener>
        <SplitText
          tag="span"
          className="opener__word"
          text={site.openerWord}
          textAlign="center"
          delay={30}
          duration={0.6}

          ease="power2.out"
        />
      </div>

      <div data-menu>
        <a href="#top" className="menu__mark">
          {site.name}
        </a>
        <div data-menu-links>
          {site.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-swap
              data-hover={n.hover}
              className="ds-swap ds-split"
            >
              {n.label}
            </a>
          ))}
        </div>
        <button data-burger type="button" aria-label="Menu">
          <span />
          <span />
        </button>
      </div>

      <MenuOverlay home />

      <div data-scroller>
        {/* The hero sticks within this stage, not the whole scroller — that is
            what lets the footer below be revealed instead of staying pinned
            under it forever. */}
        <div data-stage>
        <section id="top" data-invert data-hero>
          <div data-hero-media>
            <ImageSlot
              id="hero-bg"
              placeholder="Hero photograph — full bleed"
              alt="Adnan Khan, freelance web developer and SEO consultant based in Delhi, India"
            />
          </div>
          <div className="hero__scrim" aria-hidden="true" />

          <div data-hero-fade>
            {/* The page had no h1 at all. The visible hero is four stylised
                fragments; the heading states the same thing readably for
                search and screen readers, and matches the title tag. */}
            <h1 className="hero__h1">
              <span className="ds-sr-only">
                {site.name} — {site.tagline}
              </span>
              <span data-hero-stack aria-hidden="true">
              {site.heroLines.map((l, i) => (
                <div
                  key={l.word}
                  data-hero-band
                  className={l.align === "right" ? "-right" : undefined}
                  style={{ ["--i" as string]: i }}
                >
                  <span data-hero-cap className="u-mono">
                    {l.cap}
                  </span>
                  {/* the line carries the scroll drift, the inner span carries
                      the intro rise — one transform each, so they never fight */}
                  <span data-hero-line data-drift={l.drift} data-rate={i}>
                    <span data-hero-rise style={{ ["--i" as string]: i }}>
                      {l.word}
                    </span>
                  </span>
                </div>
              ))}
              </span>
            </h1>
            <div className="hero__foot u-mono">
              <span>{site.strapline}</span>
              <span data-scroll-cue><i />Scroll</span>
            </div>
          </div>
        </section>

        <div className="page__body">
          <section id="about" className="u-shell u-section u-gutter" data-inview>
            <SplitText
              tag="p"
              className="about__kicker u-mono"
              text="About"
              textAlign="left"
              delay={30}
              duration={0.6}

              ease="power2.out"
            />
            <div className="about__paras">
              <SplitText
                tag="h2"
                className="about__lead"
                text={site.about.lead}
                textAlign="left"
                delay={10}
              duration={0.6}
              ease="power2.out"
            />
              {site.about.paras.map((para) => (
                <SplitText
                  key={para}
                  tag="p"
                  className="about__para"
                  text={para}
                  textAlign="left"
                  /* long strings need a small stagger or a char reveal runs
                     for several seconds before the sentence is readable */
                  delay={9}
                  duration={0.6}

                  ease="power2.out"
                />
              ))}
            </div>
          </section>

          {/* Geometric band, from the source: cream shapes on a two-column
              hairline grid. Decorative only — no content, no data. */}
          <section id="services" className="u-shell u-section u-gutter" data-inview>
            <p className="svc__kicker u-mono ds-fade-up">What I do</p>
            <ul className="svc__list">
              {site.services.map((sv, i) => (
                <li key={sv.title} className="svc">
                  {/* same treatment as About: chars on the display line,
                      words on the copy — a sentence revealed letter by letter
                      trickles in for seconds and reads as a bug */}
                  <SplitText
                    tag="h3"
                    className="svc__title"
                    text={sv.title}
                    textAlign="left"
                    delay={26}
                    duration={0.6}
                    ease="power2.out"
                  />
                  <SplitText
                    tag="p"
                    className="svc__line"
                    text={sv.line}
                    textAlign="left"
                    splitType="words"
                    delay={22}
                    duration={0.5}
                    ease="power2.out"
                  />
                  <ul className="svc__tags ds-fade-up" style={{ ["--i" as string]: i }}>
                    {sv.tags.map((t) => (
                      <li key={t} className="u-mono">{t}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <p className="svc__certs u-mono ds-fade-up">
              {site.certifications.length} cloud certifications — Oracle Cloud
              Infrastructure and Google Cloud
            </p>

            {/* The action is the resting label, not the hover one. ds-swap
                needs :hover, which a phone never has — so on mobile the page's
                primary call to action used to read "Available for work", a
                status with no verb in it. The status still shows on hover, and
                it is stated plainly in About and in llms.txt either way. The
                accessible name follows the resting text, so this reads as an
                action to a screen reader too. */}
            <a
              className="svc__cta ds-swap ds-split"
              href="#contact"
              data-swap
              data-hover="Available for work"
            >
              Start a project
            </a>
          </section>


          <section data-invert className="shapes-band u-section u-gutter" aria-hidden="true">
            <div className="u-shell shapes ds-fade-up" data-inview>
              <div className="shapes__cell">
                <i className="shape" data-shape data-rate="3" style={{ left: "6%", width: "84%", top: "60%", height: "28%" }} />
              </div>
              <div className="shapes__cell">
                <i className="shape" data-shape data-rate="-5" style={{ left: "9%", width: "45%", top: "29%", height: "30%" }} />
                <i className="shape" data-shape data-rate="7" style={{ left: "49%", width: "43%", top: "59%", height: "31%" }} />
              </div>
              <div className="shapes__cell">
                <i className="shape -round" data-shape data-rate="-4" style={{ left: "6%", width: "40%", bottom: "10%" }} />
                <i className="shape -round" data-shape data-rate="-6" style={{ left: "50%", width: "40%", bottom: "10%" }} />
              </div>
              <div className="shapes__cell">
                <i className="shape" data-shape data-rate="5" style={{ left: "8%", width: "84%", top: "31%", height: "31%" }} />
              </div>
            </div>
          </section>

          <section className="build u-section u-gutter" data-inview>
            <h2 className="u-shell">
              <SplitText tag="span" text="I build" textAlign="left" delay={30} duration={0.6}
              ease="power2.out"
            />
              <span data-rotator className="ds-rotator">
                {site.rotator.map((r, i) => (
                  <span
                    key={r}
                    className={`ds-rotator-item${i === 0 ? " is-active" : ""}`}
                    style={{ ["--i" as string]: 0 }}
                  >
                    <span className="ds-line ds-mask">
                      <span className="ds-line-inner">{r}</span>
                    </span>
                  </span>
                ))}
              </span>
            </h2>
          </section>

          <section id="work" data-invert className="u-section">
            <div data-marquee>
              <span>{marqueeText()}</span>
              <span aria-hidden="true">{marqueeText()}</span>
            </div>
            <div className="u-shell u-gutter work__list">
              {site.projects.map((p, i) => (
                <div key={p.slot} data-work-item className="ds-fade-up" data-inview>
                  <div data-work-head>
                    <div data-work-media aria-hidden="true">
                      <ImageSlot id={p.slot} src={p.image} placeholder={p.placeholder} alt={p.alt} />
                    </div>
                    <button data-work-row type="button">
                      <span className="work__num">{projectNumber(i)}</span>
                      {/* the wrapper keeps the hover shift, so SplitText's
                          own overflow:hidden never clips the slide */}
                      <span data-work-title>
                        <SplitText
                          tag="span"
                          text={p.title}
                          textAlign="left"
                          delay={25}
                          duration={0.6}

                          ease="power2.out"
                        />
                      </span>
                      <span data-work-meta>{p.discipline}</span>
                      <span data-work-year>{p.year}</span>
                      <span data-work-arrow aria-hidden="true">↓</span>
                    </button>
                  </div>
                  <div data-work-panel>
                    <div className="work__panelInner">
                      <div className="work__shot">
                        <ImageSlot id={p.slot} src={p.image} placeholder={p.placeholder} alt={p.alt} />
                      </div>
                      <div className="work__aside">
                        <p className="work__rowmeta">
                          <span>{p.discipline}</span>
                          <span>{p.year}</span>
                        </p>
                        <p className="work__blurb">{p.blurb}</p>
                        <a
                          className="work__link ds-swap ds-split"
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-swap
                          data-hover="Open"
                        >
                          {p.linkLabel}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <span className="work__end" />
            </div>
          </section>

          <section id="contact" className="u-shell u-section u-gutter" data-inview>
            <SplitText
              tag="p"
              className="contact__kicker u-mono"
              text="Contact"
              textAlign="left"
              delay={30}
              duration={0.6}

              ease="power2.out"
            />
            <SplitText
              tag="h2"
              className="contact__big"
              text="Say hello"
              textAlign="left"
              delay={40}
            duration={0.6}
              ease="power2.out"
            />
            <p className="contact__line ds-fade-up">{site.contact.line}</p>
            <a
              className="contact__mail ds-swap ds-split"
              href={`mailto:${site.email}`}
              data-swap
              data-hover="Write to me"
            >
              {site.email}
            </a>
          </section>
        </div>
        </div>

        <footer data-footer data-inview>
          <div className="u-shell foot__grid">
            <section className="foot__item">
              <h3 className="foot__head ds-fade-up" style={{ ["--i" as string]: 3 }}>Contacts</h3>
              <ul className="foot__list">
                <li className="ds-fade-up" style={{ ["--i" as string]: 4 }}>
                  <a className="u-label" href={`mailto:${site.email}`}>
                    {site.email}<i aria-hidden="true">↗</i>
                  </a>
                </li>
                {site.socials.map((s, i) => (
                  <li key={s.label} className="ds-fade-up" style={{ ["--i" as string]: 5 + i }}>
                    <a className="u-label" href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}<i aria-hidden="true">↗</i>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="foot__item">
              <h3 className="foot__head ds-fade-up" style={{ ["--i" as string]: 4 }}>Credits</h3>
              <ul className="foot__list foot__credits">
                {site.footer.credits.map(([who, what], i) => (
                  <li key={who} className="ds-fade-up" style={{ ["--i" as string]: 5 + i }}>
                    <span className="u-label">{who}</span>
                    <span className="u-label">{what}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* The source left this column empty. It now carries the pages that
                are not reachable from the hero nav, which is how anyone finds
                the journal or the free tool from the bottom of the page. */}
            <section className="foot__item">
              <h3 className="foot__head ds-fade-up" style={{ ["--i" as string]: 5 }}>Elsewhere</h3>
              <ul className="foot__list">
                {site.pages.map((pg, i) => (
                  <li key={pg.href} className="ds-fade-up" style={{ ["--i" as string]: 6 + i }}>
                    <Link className="u-label" href={pg.href}>
                      {pg.label}<i aria-hidden="true">↗</i>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="foot__item">
              <h3 className="foot__signoff" data-inview>
                {site.footer.signoff.split(" ").map((w, i, arr) => (
                  <span key={`${w}-${i}`} className="word-wrap" style={{ ["--i" as string]: i }}>
                    {/* nbsp, not a plain space: a trailing space inside an
                        inline-block collapses and the words run together */}
                    {w}
                    {i < arr.length - 1 ? "\u00A0" : ""}
                  </span>
                ))}
              </h3>
            </section>
          </div>

          <div className="u-shell foot__secondary">
            <p className="u-label">{site.footer.colophon}</p>
          </div>

          <div className="foot__wordmark">
            <span>{site.name}</span>
          </div>
        </footer>
      </div>

      <Motion />
    </div>
  );
}
