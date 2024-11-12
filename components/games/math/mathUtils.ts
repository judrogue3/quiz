export const generateQuestion = () => {
  const numbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 1);
  const targetSum = numbers.slice(0, Math.floor(Math.random() * 3) + 2)
    .reduce((a, b) => a + b, 0);
  
  return {
    numbers,
    target: targetSum,
  };
};