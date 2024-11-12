"use client";

import { Trophy, Heart, Timer, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface GameHeaderProps {
  score: number;
  level: number;
  lives: number;
  timeRemaining: number;
  mode: 'concrete' | 'pictorial' | 'abstract';
}

export function GameHeader({
  score,
  level,
  lives,
  timeRemaining,
  mode
}: GameHeaderProps) {
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
            {[...Array(lives)].map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-red-500"
                fill="currentColor"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className={cn(
              "text-lg px-4 py-2",
              timeRemaining <= 10 && "animate-pulse text-red-500"
            )}
          >
            <Timer className="w-5 h-5 mr-2" />
            {timeRemaining}s
          </Badge>
          <Badge
            variant="outline"
            className="text-lg px-4 py-2 capitalize"
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            {mode}
          </Badge>
        </div>
      </div>
      <Progress
        value={(timeRemaining / 60) * 100}
        className="h-2"
      />
    </div>
  );
}