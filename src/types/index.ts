import type { IconType } from 'react-icons'

export interface Skill {
  name: string
  icon: IconType
}

export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  repoUrl: string
  liveUrl?: string
}

export interface Certification {
  title: string
  provider: string
  blurb: string
  url: string
  icon: IconType
}

export interface SocialLink {
  label: string
  href: string
  icon: IconType
}
