import { useEffect, useRef } from 'react'
import { scenes } from '../../data/scenes'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))

/**
 * Fixed, full-screen backdrop behind all content.
 * For each section it cross-fades to that section's video and scrubs the
 * video's currentTime in sync with how far the section has scrolled.
 * Sections without a video show an animated cobalt gradient instead.
 */
export function VideoBackdrop() {
  const reduced = usePrefersReducedMotion()
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const layerRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (reduced) return
    let raf = 0

    const tick = () => {
      const vh = window.innerHeight
      for (const scene of scenes) {
        const section = document.getElementById(scene.id)
        const layer = layerRefs.current[scene.id]
        if (!section || !layer) continue

        const rect = section.getBoundingClientRect()

        // Opacity = how much of the viewport this section currently covers.
        // Works for any section height (the hero is 200dvh tall) and gives a
        // natural cross-fade between the section leaving and the one entering.
        const overlap = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
        const opacity = clamp(overlap / vh)
        layer.style.opacity = String(opacity)

        const video = videoRefs.current[scene.id]
        // readyState >= 1 (HAVE_METADATA) means duration is known and we can seek
        if (video && video.readyState >= 1 && video.duration && opacity > 0.02) {
          // Scrub across the section's own scroll range. For tall sections
          // (range > 0) map -rect.top → range; for ~viewport sections fall
          // back to an entry-based progress so it still advances.
          const range = rect.height - vh
          const progress =
            range > 1 ? clamp(-rect.top / range) : clamp((vh - rect.top) / (vh + rect.height))
          const target = progress * video.duration
          const current = video.currentTime
          const next = current + (target - current) * 0.2
          // skip redundant micro-seeks (avoids seek spam once settled)
          if (Math.abs(next - current) > 0.01) video.currentTime = next
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  return (
    <div className="fixed inset-0 -z-10 bg-bg" aria-hidden="true">
      {scenes.map((scene, i) => (
        <div
          key={scene.id}
          ref={(el) => (layerRefs.current[scene.id] = el)}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
        >
          {scene.video && !reduced ? (
            <video
              ref={(el) => (videoRefs.current[scene.id] = el)}
              src={scene.video}
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-bg via-bg to-accent/20" />
          )}
          {/* scrim for text legibility over any frame */}
          <div className="absolute inset-0 bg-bg/55 dark:bg-bg/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/80" />
        </div>
      ))}
    </div>
  )
}
