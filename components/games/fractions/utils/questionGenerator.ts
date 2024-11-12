import type { Question } from '../types';

const questions: Question[] = [
  {
    id: 1,
    prompt: "Select 1/2 of the pizza",
    totalSlices: 2,
    correctSlices: 1,
    difficulty: 1,
  },
  {
    id: 2,
    prompt: "Select 2/4 of the pizza",
    totalSlices: 4,
    correctSlices: 2,
    difficulty: 1,
  },
  {
    id: 3,
    prompt: "Select 3/6 of the pizza",
    totalSlices: 6,
    correctSlices: 3,
    difficulty: 2,
  },
  {
    id: 4,
    prompt: "Select 4/8 of the pizza",
    totalSlices: 8,
    correctSlices: 4,
    difficulty: 2,
  },
  {
    id: 5,
    prompt: "Select 5/10 of the pizza",
    totalSlices: 10,
    correctSlices: 5,
    difficulty: 3,
  },
];

export function generateQuestion(level: number): Question {
  const levelQuestions = questions.filter(q => q.difficulty === level);
  const randomIndex = Math.floor(Math.random() * levelQuestions.length);
  return levelQuestions[randomIndex];
}