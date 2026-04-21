import { useTranslation } from 'react-i18next';

interface SpeedSliderProps {
  speed: number;
  onChange: (speed: number) => void;
}

export function SpeedSlider({ speed, onChange }: SpeedSliderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center gap-3 px-1">
      <label htmlFor="speed-slider" className="text-sm font-medium text-white whitespace-nowrap">
        {t('speed')}: {speed}
      </label>
      <input
        id="speed-slider"
        type="range"
        min={1}
        max={10}
        step={1}
        value={speed}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-500 bg-[#2a2a4a]"
      />
    </div>
  );
}
