"use client";

import React from 'react';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  timeRemaining: number;
  maxTime: number;
}

export function Timer({ timeRemaining, maxTime }: TimerProps) {
  const progress = (timeRemaining / maxTime) * 100;
  const isLow = timeRemaining <= 10;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Time Remaining</span>
        <span className={`font-bold ${isLow ? 'text-red-500' : ''}`}>
          {timeRemaining}s
        </span>
      </div>
      <Progress 
        value={progress} 
        className={`h-2 ${isLow ? 'bg-red-100' : 'bg-blue-100'}`}
      />
    </div>
  );
}