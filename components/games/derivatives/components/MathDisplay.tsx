"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathDisplayProps {
  expression: string;
  isAnswer?: boolean;
  isSelected?: boolean;
  isCorrect?: boolean;
  onClick?: () => void;
}

export function MathDisplay({
  expression,
  isAnswer = false,
  isSelected = false,
  isCorrect,
  onClick,
}: MathDisplayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="p-4 min-h-[60px] flex items-center justify-center">
        <div className="w-full h-4 bg-secondary animate-pulse rounded" />
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={false}
    >
      <Card
        className={`
          relative p-4 transition-all duration-300 cursor-pointer overflow-hidden
          ${isSelected ? 'bg-primary/20 border-primary' : 'hover:bg-secondary/50'}
          ${isCorrect === true ? 'bg-green-500/20 border-green-500' : ''}
          ${isCorrect === false ? 'bg-red-500/20 border-red-500' : ''}
          border-2
        `}
        onClick={onClick}
      >
        <AnimatePresence>
          {isCorrect === true && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
            />
          )}
          {isCorrect === false && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-red-500/10"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex justify-center items-center min-h-[60px]">
          <BlockMath math={expression} />
        </div>
      </Card>
    </motion.div>
  );
}