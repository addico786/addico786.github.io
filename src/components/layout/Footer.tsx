import { socials } from '../../data/socials'
import { scrollToId } from '../../lib/lenis'

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <button
          onClick={() => scrollToId('hero')}
          className="font-mono text-base font-bold text-fg"
        >
          adnan<span className="text-accent">.</span>
        </button>

        <div className="flex items-center gap-3">
          {socials.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={18} />
              </a>
            )
          })}
        </div>

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Adnan Khan
        </p>
      </div>
    </footer>
  )
}
