"use client";

import { useCallback } from 'react';

const soundFiles = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  start: '/sounds/start.mp3',
  gameover: '/sounds/gameover.mp3',
};

export function useSound() {
  const playSound = useCallback((type: keyof typeof soundFiles) => {
    const audio = new Audio(soundFiles[type]);
    audio.volume = 0.5;
    audio.play().catch(error => {
      console.warn(`Sound playback failed: ${error.message}`);
    });
  }, []);

  return playSound;
}