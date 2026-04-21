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

interface GameOverDialogProps {
  isOpen: boolean
  score: number
  onRestart: () => void
}

export function GameOverDialog({ isOpen, score, onRestart }: GameOverDialogProps) {
  const { t } = useTranslation()

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="animate-dialog-enter border-gray-700 bg-gray-900 text-gray-100 sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-2xl font-bold text-white">
            {t('gameOver')}
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-300">
            {t('finalScore')}: <span className="font-semibold text-white">{score}</span>
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
