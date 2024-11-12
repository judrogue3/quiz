"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { GameHeader } from './components/GameHeader';
import { CityScape } from './components/CityScape';
import { BlockBuilder } from './components/BlockBuilder';
import { BarModel } from './components/BarModel';
import { NumberSorter } from './components/NumberSorter';
import { generateQuestion } from './utils/questionGenerator';
import { useSound } from './hooks/useSound';
import type { GameState, Question } from './types';

const initialState: GameState = {
  score: 0,
  level: 1,
  lives: 3,
  streak: 0,
  timeRemaining: 60,
  mode: 'concrete',
  isComplete: false,
};

export default function NumberMasterGame() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [question, setQuestion] = useState<Question>(generateQuestion(1, 'concrete'));
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const { toast } = useToast();
  const playSound = useSound();

  useEffect(() => {
    if (gameState.timeRemaining > 0 && !gameState.isComplete) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
      return () => clearInterval(timer);
    } else if (gameState.timeRemaining === 0) {
      endGame();
    }
  }, [gameState.timeRemaining, gameState.isComplete]);

  const handleAnswer = (answer: number[]) => {
    const isCorrect = compareArrays(answer, question.correctAnswer);
    
    if (isCorrect) {
      playSound('correct');
      const pointsGained = Math.ceil(gameState.timeRemaining / 5);
      setGameState(prev => ({
        ...prev,
        score: prev.score + pointsGained,
        streak: prev.streak + 1,
        timeRemaining: 60
      }));

      toast({
        title: "Excellent! 🌟",
        description: `+${pointsGained} points`,
      });

      if (gameState.streak === 3) {
        handleProgressionChange();
      } else {
        setQuestion(generateQuestion(gameState.level, gameState.mode));
      }
    } else {
      playSound('wrong');
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0,
        timeRemaining: 60
      }));

      toast({
        title: "Try Again",
        description: "Keep practicing!",
        variant: "destructive",
      });

      if (gameState.lives <= 1) {
        endGame();
      }
    }
    setSelectedBlocks([]);
  };

  // Helper function to compare arrays regardless of order
  const compareArrays = (arr1: number[], arr2: number[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    const sum1 = arr1.reduce((a, b) => a + b, 0);
    const sum2 = arr2.reduce((a, b) => a + b, 0);
    return sum1 === sum2;
  };

  const handleProgressionChange = () => {
    const modes: GameState['mode'][] = ['concrete', 'pictorial', 'abstract'];
    const currentModeIndex = modes.indexOf(gameState.mode);
    
    if (currentModeIndex === modes.length - 1) {
      // Progress to next level
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        mode: 'concrete',
        streak: 0,
      }));
      
      toast({
        title: "Level Up! 🎉",
        description: `You've reached level ${gameState.level + 1}!`,
      });
    } else {
      // Progress to next mode
      setGameState(prev => ({
        ...prev,
        mode: modes[currentModeIndex + 1],
        streak: 0,
      }));
      
      toast({
        title: "New Mode! 🚀",
        description: `Moving to ${modes[currentModeIndex + 1]} representation`,
      });
    }
    
    setQuestion(generateQuestion(
      gameState.level,
      currentModeIndex === modes.length - 1 ? 'concrete' : modes[currentModeIndex + 1]
    ));
  };

  const endGame = () => {
    playSound('gameover');
    setGameState(prev => ({
      ...prev,
      isComplete: true
    }));

    toast({
      title: "Game Over!",
      description: `Final Score: ${gameState.score}`,
    });
  };

  const resetGame = () => {
    setGameState(initialState);
    setQuestion(generateQuestion(1, 'concrete'));
    setSelectedBlocks([]);
    playSound('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto p-6 space-y-8">
        <GameHeader
          score={gameState.score}
          level={gameState.level}
          lives={gameState.lives}
          timeRemaining={gameState.timeRemaining}
          mode={gameState.mode}
        />

        <CityScape level={gameState.level} />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${question.id}-${gameState.mode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {question.prompt}
              </h2>
              <Progress 
                value={(gameState.streak / 3) * 100}
                className="h-2 w-full max-w-md mx-auto"
              />
            </div>

            {gameState.mode === 'concrete' && (
              <BlockBuilder
                value={selectedBlocks}
                onChange={setSelectedBlocks}
                onSubmit={handleAnswer}
                maxDigits={gameState.level + 1}
              />
            )}

            {gameState.mode === 'pictorial' && (
              <BarModel
                value={selectedBlocks}
                onChange={setSelectedBlocks}
                onSubmit={handleAnswer}
                maxValue={Math.pow(10, gameState.level + 1)}
              />
            )}

            {gameState.mode === 'abstract' && (
              <NumberSorter
                numbers={question.numbers}
                onSubmit={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {gameState.isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <h3 className="text-2xl font-bold">Game Complete!</h3>
            <p className="text-xl">Final Score: {gameState.score}</p>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg
                shadow-lg hover:shadow-xl transition-all duration-200 text-lg font-semibold"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </Card>
    </div>
  );
}