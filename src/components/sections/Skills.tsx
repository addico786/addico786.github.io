import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { skills } from '../../data/skills'
import { scaleIn, stagger, viewportOnce } from '../../lib/motion'

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="02 — Stack" title="Technical Skills" />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {skills.map((skill) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              variants={scaleIn}
              className="group flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-4 transition-colors hover:border-accent/60"
            >
              <Icon
                size={26}
                className="shrink-0 text-muted transition-colors group-hover:text-accent"
              />
              <span className="font-medium text-fg">{skill.name}</span>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
