"use client";

import { motion } from 'framer-motion';
import { Star, Sparkle } from 'lucide-react';

interface CelebrationProps {
  type: 'success' | 'error';
}

export function Celebration({ type }: CelebrationProps) {
  if (type === 'success') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: '50%',
              y: '50%'
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut"
            }}
            className="absolute"
          >
            {i % 2 === 0 ? (
              <Star className="w-6 h-6 text-yellow-500" />
            ) : (
              <Sparkle className="w-4 h-4 text-purple-500" />
            )}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1 }}
      className="absolute inset-0 bg-red-500/10 pointer-events-none"
    />
  );
}