import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiGithub, FiFolder } from 'react-icons/fi'
import { projects } from '../../data/projects'
import { Tag } from '../ui/Tag'
import { SectionHeading } from '../ui/SectionHeading'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function ProjectCard({ p, index }: { p: (typeof projects)[number]; index: number }) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/70 shadow-2xl backdrop-blur">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-md bg-black/60 px-2 py-1 font-mono text-xs text-white">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-fg">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <a
          href={p.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
        >
          <FiGithub size={16} /> View Code
        </a>
      </div>
    </article>
  )
}

export function Projects() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const folderRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getShift = () => track.scrollWidth - window.innerWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + (getShift() + window.innerHeight),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1) folder opens
      tl.from(folderRef.current, {
        rotateX: -80,
        opacity: 0,
        transformOrigin: 'top center',
        ease: 'power2.out',
        duration: 0.6,
      })
      // 2) pages slide one by one
      tl.to(track, { x: () => -getShift(), ease: 'none', duration: projects.length }, '>')
    }, section)

    return () => ctx.revert()
  }, [reduced])

  if (reduced) {
    return (
      <section id="projects" className="relative w-full px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="03 — Work" title="Featured Projects" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" ref={sectionRef} className="relative w-full overflow-hidden">
      <div className="flex h-[100dvh] flex-col justify-center">
        <div ref={folderRef} className="mx-auto mb-8 w-full max-w-6xl px-6">
          <span className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <FiFolder /> 03 — Portfolio
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-2 font-mono text-xs text-muted">
            keep scrolling — flipping through {projects.length} pages →
          </p>
        </div>

        <div ref={trackRef} className="flex w-max items-stretch gap-6 px-6 sm:px-[8vw]">
          {projects.map((p, i) => (
            <div key={p.title} className="w-[84vw] max-w-[440px] shrink-0">
              <ProjectCard p={p} index={i} />
            </div>
          ))}
          <div className="flex w-[60vw] max-w-[360px] shrink-0 items-center">
            <a
              href="https://github.com/addico786"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Explore More on GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
