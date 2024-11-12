"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BarModelProps {
  value: number[];
  onChange: (value: number[]) => void;
  onSubmit: (value: number[]) => void;
  maxValue: number;
}

export function BarModel({
  value,
  onChange,
  onSubmit,
  maxValue
}: BarModelProps) {
  const handleBarClick = (position: number) => {
    const newValue = Math.floor((position / 100) * maxValue);
    onChange([newValue]);
  };

  return (
    <div className="space-y-8">
      <div className="relative h-24 bg-gray-100 rounded-lg overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
          style={{
            width: `${(value[0] / maxValue) * 100}%`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(value[0] / maxValue) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
        
        <div
          className="absolute inset-0"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const position = ((e.clientX - rect.left) / rect.width) * 100;
            handleBarClick(position);
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {value[0] || 0}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => onSubmit(value)}
          className={cn(
            "px-8 py-3 rounded-lg text-white text-lg font-semibold",
            "bg-gradient-to-r from-blue-500 to-blue-600",
            "hover:shadow-lg transition-shadow duration-200"
          )}
        >
          Check Answer
        </button>
      </div>
    </div>
  );
}