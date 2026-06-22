import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from root on the custom domain (adnankhan.tech) via Cloudflare Pages.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
