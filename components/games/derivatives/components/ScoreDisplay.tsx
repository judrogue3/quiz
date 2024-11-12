"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  totalQuestions: number;
}

export function ScoreDisplay({ score, totalQuestions }: ScoreDisplayProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <Card className="p-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6" />
        <span className="font-bold">Score</span>
      </div>
      <div className="text-xl font-bold">
        {score}/{totalQuestions} ({percentage}%)
      </div>
    </Card>
  );
}