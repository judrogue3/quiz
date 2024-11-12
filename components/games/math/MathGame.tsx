"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { GameState, Question } from "./types";
import { generateQuestion } from "./mathUtils";
import { useSound } from "./hooks/useSound";
import GameHeader from "./components/GameHeader";
import NumberTile from "./components/NumberTile";

const initialGameState: GameState = {
  score: 0,
  lives: 3,
  time: 60,
  isMuted: false,
  selectedNumbers: [],
  isAnimating: false,
};

export default function MathGame() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(generateQuestion);
  const { toast } = useToast();
  const playSound = useSound(gameState.isMuted);

  useEffect(() => {
    if (gameState.time > 0 && gameState.lives > 0) {
      const timer = setInterval(() => {
        setGameState((prev) => ({ ...prev, time: prev.time - 1 }));
      }, 1000);
      return () => clearInterval(timer);
    } else if (gameState.time === 0) {
      endGame();
    }
  }, [gameState.time, gameState.lives]);

  const handleDrop = (number: number) => {
    setGameState((prev) => ({
      ...prev,
      selectedNumbers: [...prev.selectedNumbers, number],
    }));
    playSound("drop");

    const newSum = [...gameState.selectedNumbers, number].reduce((a, b) => a + b, 0);
    
    if (newSum === currentQuestion.target) {
      handleCorrectAnswer();
    } else if (newSum > currentQuestion.target) {
      handleWrongAnswer();
    }
  };

  const handleCorrectAnswer = () => {
    const pointsGained = Math.ceil(gameState.time / 10);
    
    setGameState((prev) => ({
      ...prev,
      isAnimating: true,
      score: prev.score + pointsGained,
    }));
    
    playSound("correct");
    toast({
      title: "Correct!",
      description: `+${pointsGained} points`,
      duration: 2000,
    });
    
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        selectedNumbers: [],
        isAnimating: false,
      }));
      setCurrentQuestion(generateQuestion());
    }, 1000);
  };

  const handleWrongAnswer = () => {
    playSound("wrong");
    setGameState((prev) => ({
      ...prev,
      lives: prev.lives - 1,
      selectedNumbers: [],
    }));
    
    if (gameState.lives <= 1) endGame();
  };

  const endGame = () => {
    toast({
      title: "Game Over!",
      description: `Final Score: ${gameState.score}`,
      duration: 5000,
    });
  };

  const resetGame = () => {
    setGameState(initialGameState);
    setCurrentQuestion(generateQuestion());
  };

  const toggleMute = () => {
    setGameState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto p-6 space-y-6">
        <GameHeader gameState={gameState} onToggleMute={toggleMute} />

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            Find numbers that sum to{" "}
            <span className="text-primary">{currentQuestion.target}</span>
          </h2>
          <Progress value={(gameState.time / 60) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {currentQuestion.numbers.map((number, index) => (
            <NumberTile
              key={`${number}-${index}`}
              number={number}
              onDrop={() => handleDrop(number)}
              isAnimating={gameState.isAnimating}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            Selected Sum:{" "}
            <span className="text-primary">
              {gameState.selectedNumbers.reduce((a, b) => a + b, 0)}
            </span>
          </div>
        </div>

        {(gameState.lives === 0 || gameState.time === 0) && (
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Game Over!</h3>
            <p className="text-xl">Final Score: {gameState.score}</p>
            <Button onClick={resetGame} className="w-full sm:w-auto">
              Play Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}