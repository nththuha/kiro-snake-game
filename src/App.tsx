import { useEffect } from 'react'
import { GameCard } from '@/components/GameCard'
import { ParticleBackground } from '@/components/ParticleBackground'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center p-3 overflow-hidden"
      style={{ background: 'var(--gradient-bg)' }}
    >
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{ background: 'var(--orb-green)' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{ background: 'var(--orb-purple)', animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'var(--orb-cyan)' }} />
      </div>

      <ParticleBackground />

      <div className="relative z-10 w-full flex justify-center">
        <GameCard />
      </div>
    </div>
  )
}

export default App
