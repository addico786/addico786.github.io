import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'

const profile = '/adnan.png'
const stack = ['AWS', 'Docker', 'Terraform', 'Jenkins', 'Ansible', 'Linux']

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="01 — About" title="About Me" />
      <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto w-full max-w-xs"
        >
          <div className="absolute -inset-3 rounded-2xl border border-accent/30" />
          <img
            src={profile}
            alt="Adnan Khan"
            loading="lazy"
            className="relative w-full rounded-2xl border border-border object-cover"
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-fg">
            I'm a passionate DevOps Engineer with 2+ years of experience building
            expertise in cloud infrastructure and automation.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 leading-relaxed text-muted">
            Through hands-on projects I've gained practical experience with Terraform,
            Jenkins, Ansible, Docker and other DevOps tools. This portfolio showcases my
            skills to recruiters and potential collaborators.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
