import { useTranslation } from 'react-i18next'
import { useSnakeGame } from '@/hooks/useSnakeGame'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { GameBoard } from '@/components/GameBoard'
import { GameOverDialog } from '@/components/GameOverDialog'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HowToPlay } from '@/components/HowToPlay'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BOARD_SIZE } from '@/types'

export function GameCard() {
  const { t } = useTranslation()
  const { snake, food, score, highScore, gameOver, paused, started, direction, restart, togglePause } = useSnakeGame(BOARD_SIZE)

  return (
    <Card className="w-full max-w-[min(32rem,90vw)] bg-card border-border shadow-lg">
      <CardContent className="flex flex-col items-center gap-4 p-4 sm:p-6">
        <div className="flex w-full items-center justify-between">
          <ScoreDisplay score={score} highScore={highScore} />
          <LanguageSwitcher />
        </div>
        <div className="relative w-full">
          <GameBoard snake={snake} food={food} boardSize={BOARD_SIZE} direction={direction} />
          {!started && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
              <span className="text-white text-lg font-bold text-center px-4">{t('pressToStart')}</span>
            </div>
          )}
          {paused && started && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
              <span className="text-white text-2xl font-bold">{t('paused')}</span>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button
            onClick={togglePause}
            disabled={gameOver}
            className="bg-yellow-600 text-white hover:bg-yellow-700 disabled:opacity-50"
          >
            {paused ? t('resume') : t('pause')}
          </Button>
          <Button
            onClick={restart}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            {t('restart')}
          </Button>
        </div>
        <HowToPlay />
        <GameOverDialog isOpen={gameOver} score={score} highScore={highScore} onRestart={restart} />
      </CardContent>
    </Card>
  )
}
