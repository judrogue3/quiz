"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Clock, 
  Share2, 
  RotateCcw, 
  Eye,
  Award,
  CheckCircle2,
  XCircle,
  Percent
} from 'lucide-react';

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

interface QuizSummaryProps {
  stats: QuizStats;
  onRestart: () => void;
  onReviewIncorrect: () => void;
}

function getPerformanceBadge(accuracy: number) {
  if (accuracy >= 90) return { label: "Master", color: "bg-yellow-500" };
  if (accuracy >= 75) return { label: "Expert", color: "bg-purple-500" };
  if (accuracy >= 60) return { label: "Intermediate", color: "bg-blue-500" };
  return { label: "Beginner", color: "bg-green-500" };
}

export function QuizSummary({ stats, onRestart, onReviewIncorrect }: QuizSummaryProps) {
  const totalQuestions = stats.correctAnswers + stats.incorrectAnswers;
  const accuracy = Math.round((stats.correctAnswers / totalQuestions) * 100);
  const performanceBadge = getPerformanceBadge(accuracy);
  
  const handleShare = async () => {
    const text = `I just completed the Derivative Quest! 🎯\n` +
      `Score: ${stats.totalPoints} points\n` +
      `Accuracy: ${accuracy}%\n` +
      `Badge: ${performanceBadge.label} 🏆`;
      
    try {
      await navigator.share({
        title: 'My Derivative Quest Results',
        text: text,
      });
    } catch (err) {
      // Fallback to clipboard copy
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-background to-secondary p-4"
    >
      <Card className="max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
            <Badge className={`${performanceBadge.color} text-white px-4 py-2`}>
              <Award className="w-4 h-4 mr-2" />
              {performanceBadge.label}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5">
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                  <h3 className="text-sm font-medium text-muted-foreground">Correct</h3>
                  <p className="text-3xl font-bold text-green-500">{stats.correctAnswers}</p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/5">
                <div className="flex flex-col items-center">
                  <XCircle className="w-8 h-8 text-red-500 mb-2" />
                  <h3 className="text-sm font-medium text-muted-foreground">Incorrect</h3>
                  <p className="text-3xl font-bold text-red-500">{stats.incorrectAnswers}</p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
                <div className="flex flex-col items-center">
                  <Percent className="w-8 h-8 text-blue-500 mb-2" />
                  <h3 className="text-sm font-medium text-muted-foreground">Accuracy</h3>
                  <p className="text-3xl font-bold text-blue-500">{accuracy}%</p>
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 text-purple-500 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Points</h3>
                    <p className="text-2xl font-bold text-purple-500">{stats.totalPoints}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-orange-500 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Time Taken</h3>
                    <p className="text-2xl font-bold text-orange-500">
                      {Math.floor(stats.timeTaken / 60)}m {stats.timeTaken % 60}s
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={onReviewIncorrect} variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Review Incorrect
            </Button>
            <Button onClick={handleShare} variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share Results
            </Button>
            <Button onClick={onRestart} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}