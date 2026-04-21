import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSnakeGame } from '@/hooks/useSnakeGame'
import { useGameAudio } from '@/hooks/useGameAudio'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { GameBoard } from '@/components/GameBoard'
import { GameOverDialog } from '@/components/GameOverDialog'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HowToPlay } from '@/components/HowToPlay'
import { SpeedSlider } from '@/components/SpeedSlider'
import { SoundToggle } from '@/components/SoundToggle'
import { BOARD_SIZE } from '@/types'
import { Play, Pause, RotateCcw } from 'lucide-react'

export function GameCard() {
  const { t } = useTranslation()
  const {
    snake, food, score, highScore, gameOver,
    paused, started, direction, speed, setSpeed,
    restart, togglePause,
  } = useSnakeGame(BOARD_SIZE)

  const audio = useGameAudio()
  const [muted, setMuted] = useState(true)

  const handleSoundToggle = useCallback(() => {
    if (muted) {
      audio.start()
    } else {
      audio.stop()
    }
    setMuted(!muted)
  }, [muted, audio])

  return (
    <div className="w-full max-w-[min(34rem,92vw)] flex flex-col items-center gap-2.5">
      {/* Header row */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-extrabold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #22c55e, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🐍 SNAKE
        </h1>
        <div className="flex items-center gap-2">
          <SoundToggle muted={muted} onToggle={handleSoundToggle} />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Score panel */}
      <ScoreDisplay score={score} highScore={highScore} />

      {/* Game board */}
      <div className="relative w-full rounded-xl overflow-hidden"
        style={{
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.1), 0 0 60px rgba(34, 211, 238, 0.05), 0 8px 32px rgba(0,0,0,0.4)',
          border: '1px solid rgba(34, 197, 94, 0.15)',
        }}
      >
        <GameBoard snake={snake} food={food} boardSize={BOARD_SIZE} direction={direction} />

        {!started && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl"
            style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)' }}
          >
            <div className="text-3xl animate-float">🎮</div>
            <span className="text-sm font-semibold text-slate-300 text-center px-6">
              {t('pressToStart')}
            </span>
            <div className="flex gap-1 mt-0.5">
              {['↑', '↓', '←', '→'].map((k) => (
                <kbd key={k} className="w-7 h-7 flex items-center justify-center rounded text-[10px] font-bold text-slate-300"
                  style={{ background: 'rgba(148, 163, 184, 0.15)', border: '1px solid rgba(148, 163, 184, 0.2)' }}
                >{k}</kbd>
              ))}
            </div>
          </div>
        )}

        {paused && started && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl"
            style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)' }}
          >
            <Pause className="w-8 h-8 text-neon-cyan opacity-80" />
            <span className="text-lg font-bold text-slate-200 tracking-widest">{t('paused')}</span>
          </div>
        )}
      </div>

      {/* Controls + Speed in one row */}
      <div className="flex w-full items-center gap-2">
        <button
          onClick={togglePause}
          disabled={gameOver || !started}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
          style={{
            background: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.25)',
            color: '#22d3ee',
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.background = 'rgba(34, 211, 238, 0.2)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.2)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          {paused ? t('resume') : t('pause')}
        </button>

        <button
          onClick={restart}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shrink-0"
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            color: '#22c55e',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.2)'
            e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t('restart')}
        </button>

        <div className="flex-1">
          <SpeedSlider speed={speed} onChange={setSpeed} />
        </div>
      </div>

      {/* Guide hints */}
      <HowToPlay />

      <GameOverDialog isOpen={gameOver} score={score} highScore={highScore} onRestart={restart} />
    </div>
  )
}
