import { useRef, useCallback, useEffect } from 'react';

// Generate a simple retro-style background loop using Web Audio API
function createBgmOscillators(ctx: AudioContext, gainNode: GainNode) {
  const notes = [261.63, 329.63, 392.0, 329.63, 293.66, 349.23, 392.0, 349.23];
  const noteDuration = 0.25;
  const totalDuration = notes.length * noteDuration;
  let startTime = ctx.currentTime + 0.05;

  function scheduleLoop() {
    for (const note of notes) {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = note;
      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
      noteGain.gain.linearRampToValueAtTime(0.04, startTime + noteDuration * 0.7);
      noteGain.gain.linearRampToValueAtTime(0, startTime + noteDuration);
      osc.connect(noteGain);
      noteGain.connect(gainNode);
      osc.start(startTime);
      osc.stop(startTime + noteDuration);
      startTime += noteDuration;
    }
  }

  // Schedule several loops ahead
  for (let i = 0; i < 60; i++) {
    scheduleLoop();
  }

  return totalDuration * 60;
}

export function useGameAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const playingRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (playingRef.current) return;
    try {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = 0.5;
      gain.connect(ctx.destination);
      ctxRef.current = ctx;
      gainRef.current = gain;
      playingRef.current = true;

      createBgmOscillators(ctx, gain);

      // Re-schedule every 12 seconds to keep it going
      intervalRef.current = setInterval(() => {
        if (ctxRef.current && ctxRef.current.state === 'running' && gainRef.current) {
          createBgmOscillators(ctxRef.current, gainRef.current);
        }
      }, 12000);
    } catch {
      // Web Audio not available
    }
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    gainRef.current = null;
    playingRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { start, stop };
}
