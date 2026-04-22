import { useEffect, useRef, useCallback } from 'react';
import type { Direction } from '@/types';
import { Direction as Dir } from '@/types';

const MIN_SWIPE_DISTANCE = 30;

interface SwipeControlsOptions {
  /** Element to attach touch listeners to. Defaults to window. */
  targetRef?: React.RefObject<HTMLElement | null>;
  /** Called when a valid swipe direction is detected */
  onSwipe: (direction: Direction) => void;
  /** Whether controls are active */
  enabled?: boolean;
}

/**
 * Detects swipe gestures on touch devices and maps them to game directions.
 * Uses touchstart + touchend with a minimum distance threshold to avoid accidental triggers.
 */
export function useSwipeControls({ targetRef, onSwipe, enabled = true }: SwipeControlsOptions) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Must exceed minimum distance
      if (Math.max(absDx, absDy) < MIN_SWIPE_DISTANCE) return;

      // Determine dominant axis
      let direction: Direction;
      if (absDx > absDy) {
        direction = dx > 0 ? Dir.RIGHT : Dir.LEFT;
      } else {
        direction = dy > 0 ? Dir.DOWN : Dir.UP;
      }

      onSwipe(direction);
    },
    [onSwipe],
  );

  useEffect(() => {
    if (!enabled) return;

    const target = targetRef?.current ?? window;
    const opts: AddEventListenerOptions = { passive: true };

    target.addEventListener('touchstart', handleTouchStart as EventListener, opts);
    target.addEventListener('touchend', handleTouchEnd as EventListener, opts);

    return () => {
      target.removeEventListener('touchstart', handleTouchStart as EventListener);
      target.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [enabled, targetRef, handleTouchStart, handleTouchEnd]);
}
