export interface DerivativeQuestion {
  expression: string;
  derivative: string;
  hint: string;
  explanation: string;
  points: number;
  level: number;
}

export interface GameState {
  currentQuestion: number;
  score: number;
  timeRemaining: number;
  isComplete: boolean;
}