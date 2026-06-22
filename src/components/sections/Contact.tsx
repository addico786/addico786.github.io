import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiMail, FiMapPin } from 'react-icons/fi'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { site } from '../../data/site'
import { socials } from '../../data/socials'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('submitting')
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" minScreen={false} className="py-24">
      <SectionHeading eyebrow="05 — Contact" title="Get In Touch" />
      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-5"
        >
          <motion.a
            variants={fadeUp}
            href={`mailto:${site.email}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-accent/60"
          >
            <FiMail className="text-accent" size={22} />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Email</p>
              <p className="text-fg">{site.email}</p>
            </div>
          </motion.a>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-4"
          >
            <FiMapPin className="text-accent" size={22} />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Location</p>
              <p className="text-fg">{site.location}</p>
            </div>
          </motion.div>

          <motion.a
            variants={fadeUp}
            href={site.resumeUrl}
            download
            className="flex items-center gap-4 rounded-xl border border-border bg-surface/60 p-4 transition-colors hover:border-accent/60"
          >
            <FiDownload className="text-accent" size={22} />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Resume</p>
              <p className="text-fg">Download PDF</p>
            </div>
          </motion.a>

          <motion.div variants={fadeUp} className="flex gap-3 pt-2">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-border bg-surface/60 p-6"
        >
          {(['name', 'subject'] as const).map((field) => (
            <div key={field}>
              <label htmlFor={field} className="mb-1.5 block text-sm font-medium text-fg">
                {field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type="text"
                required
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-fg outline-none transition-colors focus:border-accent"
              />
            </div>
          ))}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-fg">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-fg outline-none transition-colors focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-fg">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full resize-none rounded-lg border border-border bg-bg px-4 py-2.5 text-fg outline-none transition-colors focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p role="status" className="text-center text-sm text-accent">
              Thanks! Your message has been sent.
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-center text-sm text-red-500">
              Something went wrong. Please email me directly.
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  )
}
