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
        background: 'var(--surface-muted)',
        border: '1px solid var(--surface-subtle-border-dim)',
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
          background: 'var(--gradient-green-cyan)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {speed}
      </span>
    </div>
  );
}
