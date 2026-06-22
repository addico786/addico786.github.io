import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { SiWhatsapp, SiHashnode } from 'react-icons/si'
import type { SocialLink } from '../types'

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/addico786', icon: FiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adnan-khan-afridi-46595129a/', icon: FiLinkedin },
  { label: 'WhatsApp', href: 'https://wa.me/919810878071', icon: SiWhatsapp },
  { label: 'Hashnode', href: 'https://hashnode.com/@adnan-khan', icon: SiHashnode },
]
