import { SiTerraform, SiKubernetes, SiGooglecloud } from 'react-icons/si'
import { FiServer, FiWifi, FiCloud } from 'react-icons/fi'
import type { Certification } from '../types'

// Add a certification = append one object. The grid adjusts automatically.
export const certifications: Certification[] = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
    provider: 'Oracle',
    blurb: 'Validated foundational cloud skills.',
    icon: FiCloud,
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=960D1C4F0E96B6A3766BA9E926FDF68FB8239FA8B6E9383AF558E74EE48B7C15',
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Multicloud Architect Professional',
    provider: 'Oracle',
    blurb: 'Professional knowledge of multicloud strategies.',
    icon: FiCloud,
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=F5933E3121C0FEB672C9D55CCE3364D2EB7C83D3D0A3D8981FEF55A5805BA336',
  },
  {
    title: 'Build Infrastructure with Terraform on Google Cloud',
    provider: 'Terraform',
    blurb: 'Validated foundational Terraform skills.',
    icon: SiTerraform,
    url: 'https://www.credly.com/badges/4ffa5afa-fd63-485d-813d-4cd931f075d3/',
  },
  {
    title: 'Deploy Kubernetes Applications on Google Cloud',
    provider: 'Containerization',
    blurb: 'Demonstrated ability with Docker and Kubernetes.',
    icon: SiKubernetes,
    url: 'https://www.credly.com/badges/ba026063-805a-4284-8721-09085441965f/',
  },
  {
    title: 'Implement DevOps Workflows in Google Cloud',
    provider: 'CI/CD',
    blurb: 'Proven CI/CD and automation fundamentals.',
    icon: SiGooglecloud,
    url: 'https://www.credly.com/badges/32743d87-3f19-48c4-b91c-1ce56fb497ee/',
  },
  {
    title: 'Monitoring in Google Cloud',
    provider: 'Observability',
    blurb: 'Cloud monitoring and web server fundamentals.',
    icon: FiServer,
    url: 'https://www.credly.com/badges/c4a2f1ad-5634-4189-befe-09b920ee7071/',
  },
  {
    title: 'Networking Fundamentals on Google Cloud',
    provider: 'Networking',
    blurb: 'Understanding of Google Cloud networks.',
    icon: FiWifi,
    url: 'https://www.credly.com/badges/7846de66-ba8c-4bc5-a180-f534103fc9e7/',
  },
]
