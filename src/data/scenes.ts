// Maps each section to its scroll-scrub background video (served from /public/videos).
// A section with `video: null` falls back to an animated gradient backdrop.
// Drop the remaining clips into public/videos and fill in the paths below.

export interface Scene {
  id: string
  video: string | null
}

export const scenes: Scene[] = [
  { id: 'hero', video: '/videos/01-hero-datacenter.mp4' },
  { id: 'about', video: '/videos/02-about-network.mp4' },
  { id: 'skills', video: '/videos/03-skills-controlroom.mp4' },
  { id: 'projects', video: null /* '/videos/04-projects-blueprint.mp4' */ },
  { id: 'certifications', video: null /* '/videos/05-certs-vault.mp4' */ },
  { id: 'contact', video: null /* '/videos/06-contact-horizon.mp4' */ },
]

export const sceneById = (id: string) => scenes.find((s) => s.id === id)
