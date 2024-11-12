"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NumberTileProps {
  number: number;
  onDrop: () => void;
  isAnimating: boolean;
}

export default function NumberTile({ number, onDrop, isAnimating }: NumberTileProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
    >
      <Button
        onClick={onDrop}
        className="w-full h-24 text-2xl font-bold"
        variant="outline"
      >
        {number}
      </Button>
    </motion.div>
  );
}