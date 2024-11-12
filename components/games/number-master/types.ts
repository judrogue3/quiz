export interface GameState {
  score: number;
  level: number;
  lives: number;
  streak: number;
  timeRemaining: number;
  mode: 'concrete' | 'pictorial' | 'abstract';
  isComplete: boolean;
}

export interface Question {
  id: number;
  prompt: string;
  numbers: number[];
  correctAnswer: number[];
}