import type { Project } from '../types'
import project2 from '../assets/project-2.png'
import project3 from '../assets/project-3.jpeg'
import project5 from '../assets/project-5.jpg'

// Add a project = append one object. The folder + page-slide animation adapts automatically.
export const projects: Project[] = [
  {
    title: 'Website Automated CI/CD',
    description:
      'Infrastructure built using Terraform to automate website deployment with a CI/CD pipeline.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1170&q=80',
    tags: ['Terraform', 'CI/CD', 'AWS', 'Jenkins'],
    repoUrl: 'https://github.com/addico786/website-automated-cicd.git',
  },
  {
    title: 'AWS EC2 Custom VPC',
    description:
      'Terraform project to create a custom VPC with EC2 instances and networking components.',
    image: project2,
    tags: ['Terraform', 'AWS', 'EC2'],
    repoUrl: 'https://github.com/addico786/aws-ec2-custom_vpc-terraform.git',
  },
  {
    title: 'Multi-Environment Terraform Module',
    description:
      'Reusable Terraform module for deploying infrastructure across multiple environments.',
    image: project3,
    tags: ['Terraform', 'Modules', 'DevOps'],
    repoUrl: 'https://github.com/addico786/multi-environment-module-TF.git',
  },
  {
    title: 'EC2 with S3 using Terraform',
    description:
      'Terraform configuration to deploy EC2 instances with S3 bucket integration.',
    image:
      'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?auto=format&fit=crop&w=1170&q=80',
    tags: ['Terraform', 'AWS', 'EC2', 'S3'],
    repoUrl: 'https://github.com/addico786/ec2-s3-made-with-TF.git',
  },
  {
    title: '2-Tier Application Deployed',
    description:
      'Provisioned infrastructure with Terraform and deployed the application across three servers using Ansible.',
    image: project5,
    tags: ['Terraform', 'AWS', 'EC2', 'S3', 'Ansible'],
    repoUrl: 'https://github.com/addico786/2_tier_app_deployed_remotly.git',
  },
]
