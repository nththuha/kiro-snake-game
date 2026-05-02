import { useTranslation } from 'react-i18next'
import { RotateCcw, Trophy, Zap, Crown } from 'lucide-react'

export interface GameOverDialogProps {
  isOpen: boolean
  score: number
  highScore: number
  onRestart: () => void
}

export function GameOverDialog({ isOpen, score, highScore, onRestart }: GameOverDialogProps) {
  const { t } = useTranslation()
  const isNewHigh = score > 0 && score >= highScore

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'var(--surface-dialog)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="animate-dialog-enter flex flex-col items-center gap-5 w-full max-w-sm px-6 py-8 rounded-2xl"
        style={{
          background: 'var(--gradient-dialog)',
          border: '1px solid var(--surface-subtle-border-dim)',
          boxShadow: 'var(--shadow-dialog)',
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl">{isNewHigh ? '🏆' : '💀'}</div>
          <h2
            className="text-2xl font-extrabold tracking-tight"
            style={{
              background: 'var(--gradient-red-pink)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('gameOver')}
          </h2>
          {isNewHigh && (
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold animate-glow-pulse"
              style={{
                background: 'var(--surface-yellow-light)',
                border: '1px solid var(--surface-yellow-border)',
                color: 'var(--neon-yellow)',
              }}
            >
              <Crown className="w-3.5 h-3.5" />
              {t('newHighScore')}
            </div>
          )}
        </div>

        {/* Score Cards */}
        <div className="flex w-full gap-3">
          {/* Final Score Card */}
          <div
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl relative overflow-hidden"
            style={{
              background: 'var(--surface-green-faint)',
              border: '1px solid var(--surface-green-medium)',
            }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: 'var(--radial-green)' }}
            />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--surface-green-light)',
                border: '1px solid var(--surface-green-strong)',
              }}
            >
              <Zap className="w-5 h-5 text-neon-green" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {t('finalScore')}
            </span>
            <span
              className="text-3xl font-black tabular-nums leading-none"
              style={{
                background: 'var(--gradient-green-cyan)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {score}
            </span>
          </div>

          {/* Best Score Card */}
          <div
            className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl relative overflow-hidden"
            style={{
              background: isNewHigh ? 'var(--surface-yellow-light)' : 'var(--surface-purple-faint)',
              border: isNewHigh
                ? '1px solid var(--surface-yellow-border)'
                : '1px solid var(--surface-purple-medium)',
              boxShadow: isNewHigh ? '0 0 20px var(--surface-yellow-glow)' : 'none',
            }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: isNewHigh ? 'var(--radial-yellow)' : 'var(--radial-purple)',
              }}
            />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: isNewHigh ? 'var(--surface-yellow-light)' : 'var(--surface-purple-light)',
                border: isNewHigh
                  ? '1px solid var(--surface-yellow-border-light)'
                  : '1px solid var(--surface-purple-strong)',
              }}
            >
              <Trophy className={`w-5 h-5 ${isNewHigh ? 'text-yellow-500' : 'text-neon-purple'}`} />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {t('bestScore')}
            </span>
            <span
              className="text-3xl font-black tabular-nums leading-none"
              style={{
                background: isNewHigh ? 'var(--gradient-yellow)' : 'var(--gradient-purple-pink)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {highScore}
            </span>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer"
          style={{
            background: 'var(--gradient-green-cyan-surface)',
            border: '1px solid var(--surface-green-hover)',
            color: 'var(--neon-green)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--gradient-green-cyan-surface-hover)'
            e.currentTarget.style.boxShadow = '0 0 30px var(--surface-green-strong)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--gradient-green-cyan-surface)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <RotateCcw className="w-4 h-4" />
          {t('restart')}
        </button>
      </div>
    </div>
  )
}
