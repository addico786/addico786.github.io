import { motion } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { certifications } from '../../data/certifications'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'

export function Certifications() {
  return (
    <Section id="certifications" minScreen={false} className="py-24">
      <SectionHeading eyebrow="04 — Credentials" title="Certifications" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certifications.map((c) => {
          const Icon = c.icon
          return (
            <motion.a
              key={c.title}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="group flex flex-col rounded-xl border border-border bg-surface/60 p-6 transition-colors hover:border-accent/60"
            >
              <div className="mb-4 flex items-center justify-between">
                <Icon size={28} className="text-accent" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {c.provider}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug text-fg">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                View credential <FiExternalLink size={14} />
              </span>
            </motion.a>
          )
        })}
      </motion.div>
    </Section>
  )
}
