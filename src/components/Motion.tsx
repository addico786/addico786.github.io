"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/**
 * Every bit of motion on the page, ported from the single boot() in
 * Adnan.dc.html. It stays DOM-driven and selector-based on purpose: the
 * original coordinated the opener, the scroll loop and the nav from one
 * place, and splitting that across components would desynchronise them.
 *
 * Everything registered here is torn down in the cleanup, so React's
 * double-invoked effects in development do not stack timers or listeners.
 */
export default function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-root]");
    if (!root) return;

    const qa = <T extends HTMLElement>(s: string) =>
      Array.from(root.querySelectorAll<T>(s));

    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    const offs: (() => void)[] = [];
    let raf = 0;

    const on = <K extends keyof WindowEventMap>(
      el: Window | Document | HTMLElement,
      ev: K | string,
      fn: EventListenerOrEventListenerObject,
      o?: AddEventListenerOptions
    ) => {
      el.addEventListener(ev as string, fn, o);
      offs.push(() => el.removeEventListener(ev as string, fn, o));
    };

    /* The bootstrap failsafe fires 4s after page start; the intro is timed
       from hydration. On a slow device those clocks diverge and the failsafe
       lands mid-intro, snapping everything visible. This effect running is
       proof the bundle is alive, which is all the failsafe was watching for. */
    clearTimeout((window as unknown as { __introFailsafe?: number }).__introFailsafe);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;

    /* ---- smooth scroll ---- */
    let lenis: Lenis | null = null;
    if (!touch && !reduced) {
      lenis = new Lenis({ lerp: 0.085 });
      let lrf = 0;
      const tick = (t: number) => {
        lenis!.raf(t);
        lrf = requestAnimationFrame(tick);
      };
      lrf = requestAnimationFrame(tick);
      offs.push(() => {
        cancelAnimationFrame(lrf);
        lenis?.destroy();
      });
    }

    /* ---- split every hover-swap link into two char layers ---- */
    const splitChars = (text: string) => {
      const frag = document.createDocumentFragment();
      let i = 0;
      for (const ch of text) {
        if (ch === " ") {
          frag.appendChild(document.createTextNode(" "));
          continue;
        }
        const s = document.createElement("span");
        s.className = "ds-char";
        s.style.setProperty("--i", String(i++));
        s.textContent = ch;
        frag.appendChild(s);
      }
      return frag;
    };

    qa("[data-swap]").forEach((el) => {
      if (el.dataset.swapReady === "1") return; // survive a double-invoked effect
      const main = el.textContent?.trim() ?? "";
      const hover = el.dataset.hover || main;
      el.textContent = "";
      const sr = document.createElement("span");
      sr.className = "ds-sr-only";
      sr.textContent = main;
      const a = document.createElement("span");
      a.className = "ds-swap-layer -main";
      a.setAttribute("aria-hidden", "true");
      a.appendChild(splitChars(main));
      const b = document.createElement("span");
      b.className = "ds-swap-layer -hover";
      b.setAttribute("aria-hidden", "true");
      b.appendChild(splitChars(hover));
      el.append(sr, a, b);
      el.dataset.swapReady = "1";
    });

    /* ---- reveal on scroll ---- */
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("is-inview");
          io.unobserve(el);
        }),
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    qa("[data-inview]").forEach((el) => io.observe(el));

    /* The small-screen marquee is a never-ending CSS animation, so park it
       while the section is off screen rather than keeping a compositor layer
       churning for the whole page. */
    const marqueeEl = root.querySelector<HTMLElement>("[data-marquee]");
    if (marqueeEl) {
      const runIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            marqueeEl.style.animationPlayState = e.isIntersecting ? "" : "paused";
          });
        },
        { rootMargin: "100px 0px" }
      );
      runIo.observe(marqueeEl);
      offs.push(() => runIo.disconnect());
    }
    offs.push(() => io.disconnect());

    /* ---- the opening: word leaves, rules draw, hero words rise ----
       Timed off the source recording: the word holds, its characters animate
       out fast, the panel drops once they are gone, the column rules draw
       downward, then the hero words come in. */
    const opener = root.querySelector<HTMLElement>("[data-opener]");
    const grid = root.querySelector<HTMLElement>("[data-grid]");
    const heroSection = root.querySelector<HTMLElement>("[data-hero]");

    /* The hero words use the same GSAP SplitText the <SplitText> component
       does, but driven from here rather than by a ScrollTrigger: they are
       above the fold, so a scroll-triggered reveal would fire at mount and
       play out of sight behind the opener. Same chars / y / ease / stagger,
       so it reads identically to every other reveal on the page. */
    const splits: { revert: () => void }[] = [];
    const revealHero = () => {
      qa("[data-hero-rise]").forEach((el, i) => {
        const split = new SplitText(el, { type: "chars", charsClass: "split-char" });
        splits.push(split);
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            /* source timing: 0.6s on cubic-bezier(0.215,0.61,0.355,1) */
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05,
            delay: i * 0.09,
            force3D: true,
          }
        );
      });
    };
    offs.push(() => splits.forEach((s) => s.revert()));

    /* If hydration was slow enough that the failsafe already revealed the
       page, do not play the opener over it — settle straight into the end
       state instead. */
    const alreadyRevealed = document.documentElement.classList.contains("intro-failed");

    /* The opener is a full-screen panel over the TOP of the page, so it only
       makes sense when the page starts there. Reloading halfway down restores
       the scroll position, and the intro then played over the footer for three
       seconds before handing back a page nobody was looking at. A hash target
       is the same story. Scroll restoration lands around hydration rather than
       before it, so this is read a frame late — the opener is on screen either
       way, so the deferral costs nothing visually. */
    const startsOffTop = () =>
      window.scrollY > 2 || window.location.hash.length > 1;

    if (reduced || alreadyRevealed || startsOffTop()) {
      if (opener) opener.style.display = "none";
      grid?.classList.add("is-drawn");
      root.classList.add("is-ruled");
      heroSection?.classList.add("is-intro");
      revealHero();
      document.documentElement.classList.remove("intro-failed");
    } else if (opener) {
      lenis?.stop();
      document.body.style.overflow = "hidden";

      /* Second look, one frame on, for the restore that had not landed yet. */
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          if (!startsOffTop()) return;
          timers.forEach(clearTimeout);
          opener.style.display = "none";
          document.body.style.overflow = "";
          lenis?.start();
          grid?.classList.add("is-drawn");
          root.classList.add("is-ruled");
          heroSection?.classList.add("is-intro");
          revealHero();
        });
      });
      offs.push(() => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      });

      /* how long the word sits before it leaves, and the per-character exit */
      const HOLD = 1300;
      const EXIT = 0.45;
      const EXIT_STAGGER = 0.025;

      /* the ground drops, the rules draw, then the hero words come in */
      const settle = () => {
        opener.style.transition = "opacity 0.6s var(--ease-out-cubic)";
        opener.style.opacity = "0";
        document.body.style.overflow = "";
        lenis?.start();
        grid?.classList.add("is-drawn");
        root.classList.add("is-ruled");
        /* hide rather than remove — the node belongs to React */
        timers.push(setTimeout(() => (opener.style.display = "none"), 700));
        timers.push(
          setTimeout(() => {
            heroSection?.classList.add("is-intro");
            revealHero();
          }, 500)
        );
      };

      /* <SplitText> animates the word in; the exit is ours. Fast, per
         character — and nothing may start fading until the last character has
         left, or the page reads as vanishing mid-animation. */
      timers.push(
        setTimeout(() => {
          const chars = opener.querySelectorAll(".split-char");
          /* SplitText only splits once fonts resolve. On a cold load that has
             not happened yet, so fall back to the word itself — otherwise the
             exit is skipped and the word just disappears. */
          const target = chars.length ? chars : opener.querySelector(".opener__word");
          const stagger = chars.length ? EXIT_STAGGER : 0;
          /* derived, not hardcoded: a longer opener word staggers longer, and
             the settle waits for it */
          let exitMs = EXIT * 1000;
          if (target) {
            exitMs = (stagger * Math.max(chars.length - 1, 0) + EXIT) * 1000;
            gsap.to(target, {
              opacity: 0,
              y: -24,
              scaleX: 0.4,
              duration: EXIT,
              ease: "power2.in",
              stagger,
            });
          }
          timers.push(setTimeout(settle, exitMs));
        }, HOLD)
      );
    }

    /* ---- one scroll loop: hero drift + parallax + marquee + menu ---- */
    /* The marquee runs on two channels, because "how far it travels" and "how
       obviously the scroll drives it" are different problems and one rate
       cannot serve both — turn it up and it races, down and it reads as
       drifting on its own clock.
         drift : scroll POSITION, slow, owns the net travel
         kick  : scroll VELOCITY, bounded, springs back to zero — owns the
                 scroll feel and contributes no distance at all */
    const MARQUEE_RATE = 0.015;
    const MARQUEE_KICK = 70;

    const media = root.querySelector<HTMLElement>("[data-hero-media]");
    const heroFade = root.querySelector<HTMLElement>("[data-hero-fade]");
    const marquee = root.querySelector<HTMLElement>("[data-marquee]");
    const menu = root.querySelector<HTMLElement>("[data-menu]");
    const drifters = qa("[data-hero-line]").map((el) => ({
      el,
      dir: Number(el.dataset.drift) || 1,
      rate: Number(el.dataset.rate) || 0,
    }));


    /* The shapes band drifts sideways as it crosses the viewport, each shape at
       its own rate and direction — that is what stops it reading as a static
       diagram. Signed rate on the element, so composition lives in the markup. */
    const shapesBand = root.querySelector<HTMLElement>(".shapes");
    const shapes = qa("[data-shape]").map((el) => ({
      el,
      rate: Number(el.dataset.rate) || 0,
    }));

    let cur = 0;
    let lastY = 0;
    let mini = false;
    /* marquee state: mq is the slow positional drift, kick the bounded
       velocity lunge that carries the scroll feel */
    let mq = 0;
    let kick = 0;

    /* ---- horizontal drag on the stacked (narrow) hero ---- */
    const hero = root.querySelector<HTMLElement>("[data-hero]");
    let dragging = false;
    let dragStart = 0;
    let dragTarget = 0;
    let dragCur = 0;

    if (hero) {
      on(hero, "pointerdown", (e) => {
        const pe = e as PointerEvent;
        if (!window.matchMedia("(max-width: 820px)").matches) return;
        dragging = true;
        dragStart = pe.clientX;
      });
      on(hero, "pointermove", (e) => {
        if (!dragging) return;
        /* clamped so a long swipe cannot fling the words off screen */
        dragTarget = Math.max(-160, Math.min(160, (e as PointerEvent).clientX - dragStart));
      });
      const endDrag = () => {
        dragging = false;
        dragTarget = 0;
      };
      on(hero, "pointerup", endDrag);
      on(hero, "pointercancel", endDrag);
      on(hero, "pointerleave", endDrag);
    }

    const loop = () => {
      const target = window.scrollY;
      cur += (target - cur) * 0.1;
      const vh = window.innerHeight || 1;
      const p = Math.min(cur / vh, 1);

      const vertical = window.matchMedia("(max-width: 820px)").matches;
      dragCur += (dragTarget - dragCur) * 0.12;
      drifters.forEach(({ el, dir, rate }, i) => {
        const amt = p * dir * (vertical ? 0 : 26 + i * 12);
        /* Stacked layout: every column travels the same way — up — but the
           top-right word leads and each one to its left lags, which is what
           opens the staircase as the hero is left. Mirrors the source. */
        const lift = vertical ? -p * (120 + rate * 70) : 0;
        /* each column answers the drag at its own rate, so they separate */
        const pull = vertical ? dragCur * (0.45 + i * 0.22) * dir : 0;
        const shift = lift + pull;
        el.style.transform = `translate3d(${amt.toFixed(2)}%,${shift.toFixed(2)}px,0)`;
      });

      const dy = target - lastY;

      /* Fade the hero's contents, never the section: the section is the opaque
         card that keeps the sticky footer from bleeding through. */
      const fade = String(1 - p * 0.55);
      if (heroFade) heroFade.style.opacity = fade;
      if (media) {
        media.style.opacity = fade;
        media.style.transform = `translate3d(0,${(p * 14).toFixed(2)}%,0) scale(${(
          1 + p * 0.08
        ).toFixed(3)})`;
      }
      if (marquee) {
        if (vertical) {
          /* Small screens have no scroll coupling at all — a CSS keyframe loop
             runs the strip on its own clock. Leave the inline transform off so
             the animation owns the element. */
          if (marquee.style.transform) marquee.style.transform = "";
        } else {
          /* Phase 0 holds until the strip is properly in frame, not merely
             peeking over the bottom edge — otherwise it has already travelled
             past the start of the phrase by the time it is worth reading. It
             sits parked on "Selected work" and begins moving from there.
             MARQUEE_RATE is % of the strip's own width per pixel scrolled. */
          const since = Math.max(0, vh * 0.5 - marquee.getBoundingClientRect().top);
          mq += (since * MARQUEE_RATE - mq) * 0.14;
          /* the lunge tracks scroll speed, is clamped so a fast flick cannot
             throw it, and eases back to rest the moment the scroll stops */
          const want = Math.max(-MARQUEE_KICK, Math.min(MARQUEE_KICK, dy * 2.2));
          kick += (want - kick) * 0.12;
          marquee.style.transform =
            `translate3d(calc(${(-(mq % 50)).toFixed(2)}% - ${kick.toFixed(1)}px),0,0)`;
        }
      }

      if (shapesBand && shapes.length) {
        /* -1 when the band sits a screen below, +1 a screen above */
        const bandP = (vh - shapesBand.getBoundingClientRect().top) / vh - 1;
        if (bandP > -1.4 && bandP < 1.4) {
          shapes.forEach(({ el, rate }) => {
            el.style.transform = `translate3d(${(bandP * rate * 9).toFixed(2)}%,0,0)`;
          });
        }
      }
      if (menu) {
        /* The hero owns the full screen: the bar only rides in once the body
           has been reached, then hides again on the way back up into it.
           Two thresholds, not one — a single boundary meant any scroll that
           oscillated across it toggled the bar every crossing, and with a
           0.6s transition it never finished sliding. Nothing changes inside
           the band. */
        if (!mini && target > vh * 0.8) {
          mini = true;
          menu.style.transform = "translateY(0)";
        } else if (mini && target < vh * 0.55) {
          mini = false;
          menu.style.transform = "translateY(-110%)";
        }
      }
      lastY = target;
      raf = requestAnimationFrame(loop);
    };
    if (!reduced) loop();
    offs.push(() => cancelAnimationFrame(raf));

    /* ---- rotator ---- */
    const rotator = root.querySelector<HTMLElement>("[data-rotator]");
    const items = qa("[data-rotator] .ds-rotator-item");
    const sizeRotator = () => {
      if (!rotator || !items.length) return;
      rotator.style.minHeight = "";
      rotator.style.minHeight = `${Math.ceil(
        items.reduce((h, el) => Math.max(h, el.getBoundingClientRect().height), 0)
      )}px`;
    };
    sizeRotator();
    let rz: ReturnType<typeof setTimeout>;
    on(window, "resize", () => {
      clearTimeout(rz);
      rz = setTimeout(sizeRotator, 150);
    });
    if (items.length > 1) {
      let c = 0;
      const rot = setInterval(() => {
        const n = (c + 1) % items.length;
        items[c].classList.remove("is-active");
        items[c].classList.add("is-leaving");
        items[n].classList.remove("is-leaving");
        items[n].classList.add("is-active");
        const d = c;
        timers.push(setTimeout(() => items[d].classList.remove("is-leaving"), 1000));
        c = n;
      }, 2600);
      intervals.push(rot);
    }

    /* ---- work rows: hover shift, click to expand ---- */
    qa("[data-work-item]").forEach((item) => {
      const row = item.querySelector<HTMLElement>("[data-work-row]");
      const title = item.querySelector<HTMLElement>("[data-work-title]");
      const panel = item.querySelector<HTMLElement>("[data-work-panel]");
      const inner = panel?.firstElementChild as HTMLElement | null;
      if (!row || !title || !panel || !inner) return;

      /* hover, the title shift and the arrow all live in CSS now — only the
         click-to-expand needs JS, because the height has to be measured */
      on(row, "click", () => {
        const open = panel.dataset.open === "1";
        qa("[data-work-panel]").forEach((p) => {
          if (p !== panel && p.dataset.open === "1") {
            p.dataset.open = "0";
            p.style.height = "0px";
            p.closest("[data-work-item]")?.classList.remove("is-open");
          }
        });
        panel.dataset.open = open ? "0" : "1";
        item.classList.toggle("is-open", !open);
        panel.style.height = open
          ? "0px"
          : `${inner.getBoundingClientRect().height}px`;
      });
    });

    /* ---- overlay nav ---- */
    /* MenuOverlay owns the panel and its open/close on every page. Only the
       Lenis pause belongs here, because Lenis only exists on this one. */
    on(window, "menu:open", () => lenis?.stop());
    on(window, "menu:close", () => lenis?.start());

    /* ---- in-page anchors ---- */
    qa<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
      on(a, "click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(t as HTMLElement, { offset: -20 });
        else
          window.scrollTo({
            top: t.getBoundingClientRect().top + window.scrollY - 20,
            behavior: "smooth",
          });
      })
    );

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      offs.forEach((f) => f());
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
