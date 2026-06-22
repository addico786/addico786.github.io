import { useState } from 'react'
import { Preloader } from './components/intro/Preloader'
import { SmoothScroll } from './components/scroll/SmoothScroll'
import { VideoBackdrop } from './components/scroll/VideoBackdrop'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Certifications } from './components/sections/Certifications'
import { Contact } from './components/sections/Contact'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      <Preloader onDone={() => setBooted(true)} />
      <SmoothScroll />
      <VideoBackdrop />

      <Navbar />
      <main className={booted ? 'opacity-100 transition-opacity duration-700' : 'opacity-0'}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
