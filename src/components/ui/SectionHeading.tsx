import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motion'

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mb-12"
    >
      <span className="mb-3 block font-mono text-xs uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="mt-4 h-px w-16 bg-accent" />
    </motion.div>
  )
}
