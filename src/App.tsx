import { useEffect } from 'react'
import { GameCard } from '@/components/GameCard'
import { ParticleBackground } from '@/components/ParticleBackground'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="relative h-screen flex items-center justify-center p-3 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 40%, #0f172a 70%, #0a1628 100%)',
      }}
    >
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)', animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)' }} />
      </div>

      <ParticleBackground />

      <div className="relative z-10 w-full flex justify-center">
        <GameCard />
      </div>
    </div>
  )
}

export default App
