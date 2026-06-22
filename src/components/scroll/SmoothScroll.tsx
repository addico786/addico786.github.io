import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { setLenis } from '../../lib/lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initializes Lenis smooth scroll and drives both Lenis + GSAP ScrollTrigger
 * from a single rAF loop. This is what makes desktop and mobile feel identical.
 * Disabled when the user prefers reduced motion (native scroll instead).
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenis.on('scroll', ScrollTrigger.update)
    setLenis(lenis)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  return null
}
