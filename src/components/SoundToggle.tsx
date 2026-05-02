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
        background: muted ? 'var(--surface-muted-strong)' : 'var(--surface-cyan-light)',
        border: `1px solid ${muted ? 'var(--surface-subtle-border-light)' : 'var(--surface-cyan-hover)'}`,
        boxShadow: muted ? 'none' : '0 0 10px var(--surface-cyan-medium)',
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
