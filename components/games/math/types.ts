export interface GameState {
  score: number;
  lives: number;
  time: number;
  isMuted: boolean;
  selectedNumbers: number[];
  isAnimating: boolean;
}

export interface Question {
  numbers: number[];
  target: number;
}

export type SoundType = 'correct' | 'wrong' | 'drop';