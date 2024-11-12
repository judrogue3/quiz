"use client";

import { useCallback } from 'react';
import { SoundType } from '../types';

const soundFiles = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  drop: '/sounds/drop.mp3',
};

export const useSound = (isMuted: boolean) => {
  const playSound = useCallback((type: SoundType) => {
    if (isMuted) return;
    
    const audio = new Audio(soundFiles[type]);
    audio.volume = 0.5;
    
    audio.play().catch((error) => {
      console.warn(`Sound playback failed: ${error.message}`);
    });
  }, [isMuted]);

  return playSound;
};