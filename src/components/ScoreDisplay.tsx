import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { Trophy, Zap } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

export function ScoreDisplay({ score, highScore }: ScoreDisplayProps) {
  const { t } = useTranslation();
  const [pop, setPop] = useState(false);
  const prevScore = useRef(score);

  useEffect(() => {
    if (score !== prevScore.current && score > 0) {
      setPop(true);
      const timer = setTimeout(() => setPop(false), 300);
      prevScore.current = score;
      return () => clearTimeout(timer);
    }
    prevScore.current = score;
  }, [score]);

  return (
    <div className="flex w-full gap-2.5">
      <div className="flex-1 flex items-center gap-2.5 rounded-lg px-3 py-2"
        style={{
          background: 'rgba(34, 197, 94, 0.06)',
          border: '1px solid rgba(34, 197, 94, 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Zap className="w-4 h-4 text-neon-green opacity-70" />
        <div className="flex flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
            {t('score')}
          </span>
          <span
            className={`text-lg font-extrabold tabular-nums leading-tight ${pop ? 'animate-score-pop' : ''}`}
            style={{
              background: 'linear-gradient(135deg, #22c55e, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {score}
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center gap-2.5 rounded-lg px-3 py-2"
        style={{
          background: 'rgba(168, 85, 247, 0.06)',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Trophy className="w-4 h-4 text-neon-purple opacity-70" />
        <div className="flex flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
            {t('best')}
          </span>
          <span
            className="text-lg font-extrabold tabular-nums leading-tight"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {highScore}
          </span>
        </div>
      </div>
    </div>
  );
}
