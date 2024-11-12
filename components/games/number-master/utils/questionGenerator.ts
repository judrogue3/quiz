import type { Question } from '../types';

export function generateQuestion(
  level: number,
  mode: 'concrete' | 'pictorial' | 'abstract'
): Question {
  const maxDigits = level + 1;
  const maxNumber = Math.pow(10, maxDigits) - 1;

  switch (mode) {
    case 'concrete': {
      // Generate a random number with the appropriate number of digits
      const minNumber = Math.pow(10, maxDigits - 1);
      const target = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      
      return {
        id: Date.now(),
        prompt: `Build the number ${target} using place value blocks`,
        numbers: [],
        correctAnswer: decomposeNumber(target),
      };
    }
    
    case 'pictorial': {
      const target = Math.floor(Math.random() * maxNumber) + 1;
      return {
        id: Date.now(),
        prompt: `Use the bar model to show ${target}`,
        numbers: [],
        correctAnswer: [target],
      };
    }
    
    case 'abstract': {
      const numbers = Array.from(
        { length: 3 + level },
        () => Math.floor(Math.random() * maxNumber) + 1
      );
      const sortedNumbers = [...numbers].sort((a, b) => a - b);
      
      return {
        id: Date.now(),
        prompt: 'Sort these numbers from smallest to largest',
        numbers,
        correctAnswer: sortedNumbers,
      };
    }
  }
}

// Helper function to decompose a number into its place values
function decomposeNumber(num: number): number[] {
  const result: number[] = [];
  let remaining = num;
  
  // Start with the largest place value
  const placeValues = [100, 10, 1];
  
  for (const place of placeValues) {
    while (remaining >= place) {
      result.push(place);
      remaining -= place;
    }
  }
  
  return result;
}