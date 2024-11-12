"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Pizza, Trophy, Heart } from 'lucide-react';
import { PizzaSlice } from './components/PizzaSlice';
import { FractionDisplay } from './components/FractionDisplay';
import { GameHeader } from './components/GameHeader';
import { generateQuestion } from './utils/questionGenerator';
import type { Question, GameState } from './types';

const initialState: GameState = {
  score: 0,
  level: 1,
  lives: 3,
  currentStreak: 0,
  timeRemaining: 30,
  isComplete: false,
};

export default function PizzaGame() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [question, setQuestion] = useState<Question>(generateQuestion(1));
  const [selectedSlices, setSelectedSlices] = useState<number>(0);
  const { toast } = useToast();

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
      handleAnswer(selectedSlices);
    }
  }, [gameState.timeRemaining, gameState.isComplete]);

  const handleSliceClick = (index: number) => {
    if (selectedSlices === index) {
      setSelectedSlices(0);
    } else {
      setSelectedSlices(index);
    }
  };

  const handleAnswer = (answer: number) => {
    const isCorrect = answer === question.correctSlices;
    
    if (isCorrect) {
      const pointsGained = Math.ceil(gameState.timeRemaining / 3);
      setGameState(prev => ({
        ...prev,
        score: prev.score + pointsGained,
        currentStreak: prev.currentStreak + 1,
        timeRemaining: 30
      }));

      toast({
        title: "Correct! 🎉",
        description: `+${pointsGained} points`,
      });

      if (gameState.currentStreak === 3) {
        handleLevelUp();
      } else {
        setQuestion(generateQuestion(gameState.level));
      }
    } else {
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1,
        currentStreak: 0,
        timeRemaining: 30
      }));

      toast({
        title: "Incorrect",
        description: `The correct answer was ${question.correctSlices}/${question.totalSlices}`,
        variant: "destructive",
      });

      if (gameState.lives <= 1) {
        endGame();
      } else {
        setQuestion(generateQuestion(gameState.level));
      }
    }
    setSelectedSlices(0);
  };

  const handleLevelUp = () => {
    setGameState(prev => ({
      ...prev,
      level: prev.level + 1,
      currentStreak: 0,
      timeRemaining: 30
    }));

    toast({
      title: "Level Up! 🌟",
      description: `You've reached level ${gameState.level + 1}!`,
    });

    setQuestion(generateQuestion(gameState.level + 1));
  };

  const endGame = () => {
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
    setQuestion(generateQuestion(1));
    setSelectedSlices(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto p-6 space-y-8">
        <GameHeader
          score={gameState.score}
          level={gameState.level}
          lives={gameState.lives}
          timeRemaining={gameState.timeRemaining}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {question.prompt}
              </h2>
              <FractionDisplay
                numerator={selectedSlices}
                denominator={question.totalSlices}
              />
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: question.totalSlices }).map((_, index) => (
                    <PizzaSlice
                      key={index}
                      isSelected={index < selectedSlices}
                      onClick={() => handleSliceClick(index + 1)}
                      rotationDeg={(360 / question.totalSlices) * index}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleAnswer(selectedSlices)}
                className="px-8 py-4 text-lg"
                disabled={selectedSlices === 0}
              >
                Check Answer
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {gameState.isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <h3 className="text-2xl font-bold">Game Over!</h3>
            <p className="text-xl">Final Score: {gameState.score}</p>
            <Button onClick={resetGame} className="px-8 py-4 text-lg">
              Play Again
            </Button>
          </motion.div>
        )}
      </Card>
    </div>
  );
}