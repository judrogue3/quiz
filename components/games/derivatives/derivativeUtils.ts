"use client";

import { DerivativeQuestion } from './types';

const questions: DerivativeQuestion[] = [
  // Level 1: Basic Power Rule
  {
    expression: "x^2",
    derivative: "2x",
    hint: "Use the power rule: The derivative of x^n is nx^{n-1}",
    explanation: "For x^2, we multiply by the power (2) and reduce the exponent by 1",
    points: 10,
    level: 1
  },
  {
    expression: "3x^3",
    derivative: "9x^2",
    hint: "Apply the power rule and don't forget the coefficient",
    explanation: "For 3x^3, we multiply 3 by the power (3) and reduce the exponent by 1",
    points: 15,
    level: 1
  },
  {
    expression: "5x^4",
    derivative: "20x^3",
    hint: "Remember to multiply by the power and reduce the exponent",
    explanation: "For 5x^4, we multiply 5 by 4 and reduce the exponent to 3",
    points: 20,
    level: 1
  },
  // Level 2: Trigonometric Functions
  {
    expression: "\\sin(x)",
    derivative: "\\cos(x)",
    hint: "The derivative of sin(x) is cos(x)",
    explanation: "This is a fundamental derivative rule for trigonometric functions",
    points: 25,
    level: 2
  },
  {
    expression: "\\cos(x)",
    derivative: "-\\sin(x)",
    hint: "The derivative of cos(x) is -sin(x)",
    explanation: "Notice the negative sign when differentiating cosine",
    points: 25,
    level: 2
  },
  {
    expression: "2\\sin(x)",
    derivative: "2\\cos(x)",
    hint: "Use the constant multiple rule with the sin(x) derivative",
    explanation: "The constant 2 stays in front while we take the derivative of sin(x)",
    points: 30,
    level: 2
  },
  // Level 3: Exponential and Logarithmic
  {
    expression: "e^x",
    derivative: "e^x",
    hint: "e^x is its own derivative!",
    explanation: "The exponential function e^x is unique because it's its own derivative",
    points: 35,
    level: 3
  },
  {
    expression: "\\ln(x)",
    derivative: "\\frac{1}{x}",
    hint: "The derivative of ln(x) is 1/x",
    explanation: "This is a fundamental derivative rule for the natural logarithm",
    points: 35,
    level: 3
  },
  {
    expression: "2e^x",
    derivative: "2e^x",
    hint: "Use the constant multiple rule with e^x",
    explanation: "The constant 2 stays in front while e^x remains e^x",
    points: 40,
    level: 3
  },
  // Level 4: Combined Functions
  {
    expression: "x^2 + \\sin(x)",
    derivative: "2x + \\cos(x)",
    hint: "Use the sum rule and handle each term separately",
    explanation: "We take the derivative of each term: x^2 becomes 2x, and sin(x) becomes cos(x)",
    points: 45,
    level: 4
  }
];

// Keep track of recently used questions to avoid repetition
let recentQuestions: string[] = [];

export function getNextQuestion(currentLevel: number): DerivativeQuestion {
  // Filter questions by level and exclude recently used ones
  const availableQuestions = questions.filter(q => 
    q.level <= currentLevel && !recentQuestions.includes(q.expression)
  );

  // If no questions available, reset recent questions
  if (availableQuestions.length === 0) {
    recentQuestions = [];
    return getNextQuestion(currentLevel);
  }

  // Get random question from available ones
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const selectedQuestion = availableQuestions[randomIndex];

  // Add to recent questions and maintain max length of 5
  recentQuestions.push(selectedQuestion.expression);
  if (recentQuestions.length > 5) {
    recentQuestions.shift();
  }

  return selectedQuestion;
}

export function generateAnswerOptions(correctAnswer: string): string[] {
  const answers = [correctAnswer];
  
  // Generate wrong answers based on the correct answer type
  const variations = [
    // Power rule variations
    "x",
    "2x",
    "3x^2",
    "4x^3",
    // Trigonometric variations
    "\\sin(x)",
    "\\cos(x)",
    "-\\sin(x)",
    "-\\cos(x)",
    // Exponential and logarithmic variations
    "e^x",
    "\\frac{1}{x}",
    "\\ln(x)",
    // Combined variations
    "2x + \\sin(x)",
    "x^2 + \\cos(x)",
    "\\frac{1}{x^2}"
  ];

  // Add three unique wrong answers
  while (answers.length < 4) {
    const randomVariation = variations[Math.floor(Math.random() * variations.length)];
    if (!answers.includes(randomVariation)) {
      answers.push(randomVariation);
    }
  }

  // Shuffle the answers
  return answers.sort(() => Math.random() - 0.5);
}