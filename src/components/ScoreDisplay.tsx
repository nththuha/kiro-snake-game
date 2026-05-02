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
          background: 'var(--surface-green-subtle)',
          border: '1px solid var(--surface-green-medium)',
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
              background: 'var(--gradient-green-cyan)',
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
          background: 'var(--surface-purple-subtle)',
          border: '1px solid var(--surface-purple-medium)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Trophy className="w-4 h-4 text-neon-purple opacity-70" />
        <div className="flex flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-500">
            {t('bestScore')}
          </span>
          <span
            className="text-lg font-extrabold tabular-nums leading-tight"
            style={{
              background: 'var(--gradient-purple-pink)',
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
