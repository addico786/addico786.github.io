import type Lenis from 'lenis'

let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}

export const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
