import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useTranslation } from 'react-i18next'
import { RotateCcw, Trophy } from 'lucide-react'

export interface GameOverDialogProps {
  isOpen: boolean
  score: number
  highScore: number
  onRestart: () => void
}

export function GameOverDialog({ isOpen, score, highScore, onRestart }: GameOverDialogProps) {
  const { t } = useTranslation()
  const isNewHigh = score > 0 && score >= highScore

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="animate-dialog-enter sm:max-w-md"
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.1), 0 0 80px rgba(34, 211, 238, 0.05), 0 25px 50px rgba(0,0,0,0.5)',
        }}
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center items-center gap-3">
          <div className="text-5xl mb-1">{isNewHigh ? '🏆' : '💀'}</div>
          <DialogTitle className="text-2xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ef4444, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('gameOver')}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col items-center gap-3 mt-2">
              {isNewHigh && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(234, 179, 8, 0.1)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    color: '#eab308',
                  }}
                >
                  <Trophy className="w-3.5 h-3.5" />
                  {t('newHighScore')}
                </div>
              )}
              <div className="flex gap-4 mt-1 w-full">
                <div className="flex flex-1 flex-col items-center px-5 py-3 rounded-xl min-w-0"
                  style={{
                    background: 'rgba(34, 197, 94, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                  }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {t('finalScore')}
                  </span>
                  <span className="text-2xl font-extrabold"
                    style={{
                      background: 'linear-gradient(135deg, #22c55e, #22d3ee)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >{score}</span>
                </div>
                <div className="flex flex-1 flex-col items-center px-5 py-3 rounded-xl min-w-0"
                  style={{
                    background: 'rgba(168, 85, 247, 0.06)',
                    border: '1px solid rgba(168, 85, 247, 0.15)',
                  }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    {t('best')}
                  </span>
                  <span className="text-2xl font-extrabold"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >{highScore}</span>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center mt-2">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 211, 238, 0.2))',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              color: '#22c55e',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(34, 211, 238, 0.3))'
              e.currentTarget.style.boxShadow = '0 0 25px rgba(34, 197, 94, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 211, 238, 0.2))'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <RotateCcw className="w-4 h-4" />
            {t('restart')}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
