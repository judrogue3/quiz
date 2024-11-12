"use client";

import { Trophy, Star, Lightbulb, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface GameHeaderProps {
  score: number;
  level: number;
  streak: number;
  timeRemaining: number;
  onToggleHint: () => void;
  onToggleExplanation: () => void;
}

export function GameHeader({
  score,
  level,
  streak,
  timeRemaining,
  onToggleHint,
  onToggleExplanation
}: GameHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-xl font-bold">{score}</span>
          </motion.div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Star className="w-5 h-5 text-purple-500 mr-2" />
            Level {level}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <Badge 
            variant="outline" 
            className={`text-lg px-4 py-2 ${timeRemaining <= 5 ? 'animate-pulse text-red-500' : ''}`}
          >
            <Clock className="w-5 h-5 mr-2" />
            {timeRemaining}s
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleHint}
              className="text-yellow-500 hover:bg-yellow-500/10"
            >
              <Lightbulb />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleExplanation}
              className="text-blue-500 hover:bg-blue-500/10"
            >
              <BookOpen />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Streak Progress</span>
          <span>{streak} / 10</span>
        </div>
        <Progress 
          value={Math.min(100, (streak / 10) * 100)} 
          className="h-2 bg-secondary"
        />
      </div>
    </div>
  );
}