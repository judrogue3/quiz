"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PizzaSliceProps {
  isSelected: boolean;
  onClick: () => void;
  rotationDeg: number;
}

export function PizzaSlice({ isSelected, onClick, rotationDeg }: PizzaSliceProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative aspect-square cursor-pointer"
      onClick={onClick}
      style={{ transform: `rotate(${rotationDeg}deg)` }}
    >
      <div
        className={cn(
          "absolute inset-0 origin-bottom-right",
          "bg-gradient-to-br transition-colors duration-200",
          isSelected
            ? "from-orange-400 to-orange-500 shadow-lg"
            : "from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300"
        )}
        style={{
          clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
          borderRadius: "0 100% 0 0",
        }}
      >
        <div
          className={cn(
            "absolute inset-0 bg-[url('/pizza-texture.png')] bg-cover opacity-50",
            "mix-blend-overlay transition-opacity duration-200",
            isSelected ? "opacity-70" : "opacity-30"
          )}
        />
      </div>
    </motion.div>
  );
}