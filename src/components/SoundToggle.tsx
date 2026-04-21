import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  muted: boolean;
  onToggle: () => void;
}

export function SoundToggle({ muted, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200"
      style={{
        background: muted ? 'rgba(30, 41, 59, 0.5)' : 'rgba(34, 211, 238, 0.1)',
        border: `1px solid ${muted ? 'rgba(148, 163, 184, 0.1)' : 'rgba(34, 211, 238, 0.25)'}`,
        boxShadow: muted ? 'none' : '0 0 10px rgba(34, 211, 238, 0.15)',
      }}
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
    >
      {muted
        ? <VolumeX className="w-3.5 h-3.5 text-slate-500" />
        : <Volume2 className="w-3.5 h-3.5 text-neon-cyan" />
      }
    </button>
  );
}
