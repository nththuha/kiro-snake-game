import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export interface GameOverDialogProps {
  isOpen: boolean
  score: number
  highScore: number
  onRestart: () => void
}

export function GameOverDialog({ isOpen, score, highScore, onRestart }: GameOverDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="animate-dialog-enter border-border bg-card text-card-foreground sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-2xl font-bold text-foreground">
            {t('gameOver')}
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            {t('finalScore')}: <span className="font-semibold text-foreground">{score}</span>
            <br />
            {t('highScore')}: <span className="font-semibold text-foreground">{highScore}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={onRestart}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            {t('restart')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
