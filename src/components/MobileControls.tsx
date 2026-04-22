import React, { useCallback } from 'react';
import { Direction } from '@/types';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileControlsProps {
  onDirection: (direction: Direction) => void;
}

const btnBase =
  'flex items-center justify-center w-14 h-14 rounded-xl active:scale-90 transition-transform duration-100 select-none touch-manipulation';

const btnStyle: React.CSSProperties = {
  background: 'rgba(34, 211, 238, 0.08)',
  border: '1px solid rgba(34, 211, 238, 0.2)',
  color: '#22d3ee',
  WebkitTapHighlightColor: 'transparent',
};

function MobileControlsInner({ onDirection }: MobileControlsProps) {
  const up = useCallback(() => onDirection(Direction.UP), [onDirection]);
  const down = useCallback(() => onDirection(Direction.DOWN), [onDirection]);
  const left = useCallback(() => onDirection(Direction.LEFT), [onDirection]);
  const right = useCallback(() => onDirection(Direction.RIGHT), [onDirection]);

  return (
    <div className="flex flex-col items-center gap-1 sm:hidden" aria-label="Directional controls">
      {/* Up */}
      <button className={btnBase} style={btnStyle} onPointerDown={up} aria-label="Move up">
        <ChevronUp className="w-7 h-7" />
      </button>

      {/* Left / Down / Right */}
      <div className="flex items-center gap-1">
        <button className={btnBase} style={btnStyle} onPointerDown={left} aria-label="Move left">
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button className={btnBase} style={btnStyle} onPointerDown={down} aria-label="Move down">
          <ChevronDown className="w-7 h-7" />
        </button>
        <button className={btnBase} style={btnStyle} onPointerDown={right} aria-label="Move right">
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

export const MobileControls = React.memo(MobileControlsInner);
