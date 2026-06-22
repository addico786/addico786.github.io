import type { ReactNode } from 'react'

/**
 * A full-height section that sits over the video backdrop.
 * `id` doubles as the scene id used by VideoBackdrop.
 */
export function Section({
  id,
  children,
  className = '',
  minScreen = true,
}: {
  id: string
  children: ReactNode
  className?: string
  minScreen?: boolean
}) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 py-24 sm:px-8 ${
        minScreen ? 'flex min-h-[100dvh] flex-col justify-center' : ''
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}
