import { useTranslation } from 'react-i18next';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const { t } = useTranslation();
  return (
    <div className="text-center text-lg font-semibold text-white mb-2">
      {t('score')}: {score}
    </div>
  );
}
