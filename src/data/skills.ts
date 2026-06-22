import {
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiGithubactions,
  SiAnsible,
  SiLinux,
  SiPython,
  SiGnubash,
  SiGit,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import type { Skill } from '../types'

// Add a skill = append one object. The grid adjusts automatically.
export const skills: Skill[] = [
  { name: 'AWS', icon: FaAws },
  { name: 'GCP', icon: SiGooglecloud },
  { name: 'Docker', icon: SiDocker },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'Terraform', icon: SiTerraform },
  { name: 'Jenkins', icon: SiJenkins },
  { name: 'GitHub Actions', icon: SiGithubactions },
  { name: 'Ansible', icon: SiAnsible },
  { name: 'Linux', icon: SiLinux },
  { name: 'Python', icon: SiPython },
  { name: 'Bash', icon: SiGnubash },
  { name: 'Git', icon: SiGit },
]
