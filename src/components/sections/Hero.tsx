import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import { site } from '../../data/site'
import { scrollToId } from '../../lib/lenis'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // text shrinks + fades as you scroll into the experience
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.78])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    // tall section → gives the data-center flythrough room to scrub
    <section id="hero" ref={ref} className="relative h-[200dvh]">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center px-6">
        <motion.div
          style={{ scale, opacity, y }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-5 inline-block rounded-full border border-border bg-surface/50 px-4 py-1.5 font-mono text-xs tracking-widest text-accent"
          >
            {site.role.toUpperCase()}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-balance text-5xl font-extrabold tracking-tight text-fg sm:text-7xl md:text-8xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mx-auto mt-6 max-w-xl text-balance font-mono text-sm text-muted sm:text-base"
          >
            “{site.tagline}”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => scrollToId('projects')}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToId('contact')}
              className="rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-surface"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
        >
          <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
          <FiArrowDown className="animate-bounce" size={16} />
        </motion.div>
      </div>
    </section>
  )
}
