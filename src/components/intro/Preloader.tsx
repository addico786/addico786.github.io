import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const LINES = [
  '> initializing adnankhan.tech ...',
  '> terraform init        [ ok ]',
  '> terraform apply       [ provisioning ]',
  '> docker build .        [ ok ]',
  '> kubectl rollout       [ 12/12 pods ready ]',
  '> ci/cd pipeline        [ green ]',
  '> deploy complete ✓',
]

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const seen = useRef(
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('booted') === '1',
  )
  const [show, setShow] = useState(!seen.current && !reduced)
  const [visibleLines, setVisibleLines] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
    try {
      sessionStorage.setItem('booted', '1')
    } catch {
      /* ignore */
    }

    const lineTimer = setInterval(() => {
      setVisibleLines((n) => {
        if (n >= LINES.length) {
          clearInterval(lineTimer)
          return n
        }
        return n + 1
      })
    }, 320)

    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 12 + 4))
    }, 160)

    const done = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setShow(false), 500)
    }, LINES.length * 320 + 400)

    return () => {
      clearInterval(lineTimer)
      clearInterval(progTimer)
      clearTimeout(done)
    }
  }, [show, onDone])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06070a] px-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* subtle CRT scanlines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 3px)',
            }}
          />
          <div className="w-full max-w-lg font-mono text-sm">
            <div className="mb-6 flex items-center gap-2 text-[#3b82f6]">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#3b82f6]" />
              <span className="tracking-widest text-[#9ea0aa]">SYSTEM BOOT</span>
            </div>
            <div className="space-y-1.5">
              {LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={line.includes('✓') ? 'text-[#3b82f6]' : 'text-[#cfd2dc]'}
                >
                  {line}
                </div>
              ))}
              {visibleLines < LINES.length && (
                <span className="inline-block h-4 w-2 animate-blink bg-[#3b82f6] align-middle" />
              )}
            </div>
            <div className="mt-8">
              <div className="mb-1 flex justify-between text-xs text-[#6b6e78]">
                <span>loading assets</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#3b82f6] transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
