"use client";

import { Trophy, Heart, Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface GameHeaderProps {
  score: number;
  level: number;
  lives: number;
  timeRemaining: number;
}

export function GameHeader({ score, level, lives, timeRemaining }: GameHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            {score}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Level {level}
          </Badge>
          <div className="flex items-center gap-1">
            {Array.from({ length: lives }).map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-red-500"
                fill="currentColor"
              />
            ))}
          </div>
        </div>
        <Badge
          variant="outline"
          className={`text-lg px-4 py-2 ${
            timeRemaining <= 5 ? 'animate-pulse text-red-500' : ''
          }`}
        >
          <Timer className="w-5 h-5 mr-2" />
          {timeRemaining}s
        </Badge>
      </div>
      <Progress
        value={(timeRemaining / 30) * 100}
        className="h-2"
      />
    </div>
  );
}