export interface GameState {
  score: number;
  level: number;
  lives: number;
  currentStreak: number;
  timeRemaining: number;
  isComplete: boolean;
}

export interface Question {
  id: number;
  prompt: string;
  totalSlices: number;
  correctSlices: number;
  difficulty: number;
}