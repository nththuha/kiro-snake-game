import { useSnakeGame } from '@/hooks/useSnakeGame'
import { ScoreDisplay } from '@/components/ScoreDisplay'
import { GameBoard } from '@/components/GameBoard'
import { GameOverDialog } from '@/components/GameOverDialog'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BOARD_SIZE } from '@/types'

export function GameCard() {
  const { snake, food, score, gameOver, restart } = useSnakeGame(BOARD_SIZE)

  return (
    <Card className="w-full max-w-[min(32rem,90vw)] bg-gray-900 border-gray-700 shadow-lg">
      <CardContent className="flex flex-col items-center gap-4 p-4 sm:p-6">
        <ScoreDisplay score={score} />
        <GameBoard snake={snake} food={food} boardSize={BOARD_SIZE} />
        <Button
          onClick={restart}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Restart
        </Button>
        <GameOverDialog isOpen={gameOver} score={score} onRestart={restart} />
      </CardContent>
    </Card>
  )
}
