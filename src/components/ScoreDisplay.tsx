import { useTranslation } from 'react-i18next';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

export function ScoreDisplay({ score, highScore }: ScoreDisplayProps) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full justify-between text-lg font-semibold text-white mb-2 px-1">
      <span>{t('score')}: {score}</span>
      <span className="text-yellow-400">{t('best')}: {highScore}</span>
    </div>
  );
}
