"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface FractionDisplayProps {
  numerator: number;
  denominator: number;
}

export function FractionDisplay({ numerator, denominator }: FractionDisplayProps) {
  return (
    <Card className="inline-flex flex-col items-center p-4 bg-white shadow-md">
      <motion.div
        key={`${numerator}/${denominator}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl font-bold"
      >
        <span className="text-orange-500">{numerator}</span>
        <span className="mx-1">/</span>
        <span className="text-gray-700">{denominator}</span>
      </motion.div>
    </Card>
  );
}