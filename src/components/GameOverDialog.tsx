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
      style={{ background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="animate-dialog-enter flex flex-col items-center gap-5 w-full max-w-sm px-6 py-8 rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.97) 0%, rgba(10, 15, 30, 0.99) 100%)',
          border: '1px solid rgba(148, 163, 184, 0.08)',
          boxShadow:
            '0 0 60px rgba(168, 85, 247, 0.08), 0 0 120px rgba(34, 211, 238, 0.04), 0 32px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl">{isNewHigh ? '🏆' : '💀'}</div>
          <h2
            className="text-2xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ef4444, #ec4899)',
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
                background: 'rgba(234, 179, 8, 0.1)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                color: '#eab308',
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
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.15)',
            }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.15), transparent 70%)',
              }}
            />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
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
                background: 'linear-gradient(135deg, #22c55e, #22d3ee)',
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
              background: 'rgba(168, 85, 247, 0.05)',
              border: isNewHigh
                ? '1px solid rgba(234, 179, 8, 0.3)'
                : '1px solid rgba(168, 85, 247, 0.15)',
              boxShadow: isNewHigh ? '0 0 20px rgba(234, 179, 8, 0.08)' : 'none',
            }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: isNewHigh
                  ? 'radial-gradient(circle at 50% 0%, rgba(234, 179, 8, 0.15), transparent 70%)'
                  : 'radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.15), transparent 70%)',
              }}
            />
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: isNewHigh ? 'rgba(234, 179, 8, 0.1)' : 'rgba(168, 85, 247, 0.1)',
                border: isNewHigh
                  ? '1px solid rgba(234, 179, 8, 0.25)'
                  : '1px solid rgba(168, 85, 247, 0.2)',
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
                background: isNewHigh
                  ? 'linear-gradient(135deg, #eab308, #f59e0b)'
                  : 'linear-gradient(135deg, #a855f7, #ec4899)',
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
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 211, 238, 0.15))',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            color: '#22c55e',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              'linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(34, 211, 238, 0.25))'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.2)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 211, 238, 0.15))'
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
