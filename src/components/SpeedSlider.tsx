import { useTranslation } from 'react-i18next';
import { Gauge } from 'lucide-react';

interface SpeedSliderProps {
  speed: number;
  onChange: (speed: number) => void;
}

export function SpeedSlider({ speed, onChange }: SpeedSliderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2"
      style={{
        background: 'rgba(30, 41, 59, 0.3)',
        border: '1px solid rgba(148, 163, 184, 0.08)',
      }}
    >
      <Gauge className="w-3.5 h-3.5 text-neon-cyan opacity-60 shrink-0" />
      <label htmlFor="speed-slider" className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
        {t('speed')}
      </label>
      <input
        id="speed-slider"
        type="range"
        min={1}
        max={10}
        step={1}
        value={speed}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer"
      />
      <span className="text-xs font-bold tabular-nums min-w-[1rem] text-center"
        style={{
          background: 'linear-gradient(135deg, #22c55e, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {speed}
      </span>
    </div>
  );
}
