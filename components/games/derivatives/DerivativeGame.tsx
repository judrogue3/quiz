"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Timer, ArrowRight } from 'lucide-react';
import { MathDisplay } from './components/MathDisplay';
import { QuizSummary } from './components/QuizSummary';
import { Celebration } from '@/components/shared/Celebration';

interface Question {
  expression: string;
  derivative: string;
  options: string[];
}

interface QuizStats {
  correctAnswers: number;
  incorrectAnswers: number;
  totalPoints: number;
  timeTaken: number;
  questionsHistory: {
    expression: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

const questions: Question[] = [
  {
    expression: "f(x) = x^2",
    derivative: "2x",
    options: ["2x", "x", "2", "x^2"]
  },
  {
    expression: "f(x) = sin(x)",
    derivative: "cos(x)",
    options: ["cos(x)", "-sin(x)", "tan(x)", "-cos(x)"]
  },
  {
    expression: "f(x) = e^x",
    derivative: "e^x",
    options: ["e^x", "xe^{x-1}", "1", "ln(x)"]
  },
  // Add more questions as needed
];

export function DerivativeGame() {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [quizStats, setQuizStats] = useState<QuizStats>({
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalPoints: 0,
    timeTaken: 0,
    questionsHistory: [],
  });
  const [showSummary, setShowSummary] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.derivative;
    const pointsEarned = isCorrect ? 10 : 0;

    setShowResult(true);
    setQuizStats(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      incorrectAnswers: prev.incorrectAnswers + (isCorrect ? 0 : 1),
      totalPoints: prev.totalPoints + pointsEarned,
      questionsHistory: [
        ...prev.questionsHistory,
        {
          expression: currentQuestion.expression,
          userAnswer: selectedAnswer,
          correctAnswer: currentQuestion.derivative,
          isCorrect,
        },
      ],
    }));

    toast({
      title: isCorrect ? "Excellent! 🎉" : "Keep trying!",
      description: isCorrect 
        ? `+${pointsEarned} points! Great understanding!` 
        : "Don't give up! Review the derivative rules and try again.",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - startTime) / 1000);
      setQuizStats(prev => ({ ...prev, timeTaken }));
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowSummary(false);
    setReviewMode(false);
    setQuizStats({
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalPoints: 0,
      timeTaken: 0,
      questionsHistory: [],
    });
  };

  const handleReviewIncorrect = () => {
    setReviewMode(true);
    setShowSummary(false);
    // Filter and show only incorrect answers
    const incorrectQuestions = quizStats.questionsHistory.filter(q => !q.isCorrect);
    // Implementation for review mode...
  };

  if (showSummary) {
    return (
      <QuizSummary
        stats={quizStats}
        onRestart={handleRestart}
        onReviewIncorrect={handleReviewIncorrect}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4">
      <Card className="max-w-3xl mx-auto p-6 relative overflow-hidden">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{quizStats.totalPoints} points</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {showResult && (
            <Celebration type={selectedAnswer === currentQuestion.derivative ? 'success' : 'error'} />
          )}
          
          <motion.div
            key={currentQuestion.expression}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-4">Find the derivative:</h2>
              <MathDisplay expression={currentQuestion.expression} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MathDisplay
                    expression={option}
                    isAnswer
                    isSelected={selectedAnswer === option}
                    isCorrect={showResult ? option === currentQuestion.derivative : undefined}
                    onClick={() => handleAnswerSelect(option)}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex justify-end gap-4"
              initial={false}
              animate={showResult ? { y: [20, 0], opacity: [0, 1] } : {}}
            >
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer || showResult}
                className="w-32"
              >
                Check
              </Button>
              {showResult && (
                <Button
                  onClick={handleNextQuestion}
                  className="w-32 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}