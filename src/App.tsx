import { GameCard } from '@/components/GameCard'
import { useTheme } from '@/hooks/useTheme'
import { ThemeToggle } from '@/components/ThemeToggle'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <GameCard />
    </div>
  )
}

export default App
