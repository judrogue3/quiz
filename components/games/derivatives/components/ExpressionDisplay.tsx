"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MathLive } from "./MathLive";

interface ExpressionDisplayProps {
  expression: string;
  isAnimating?: boolean;
}

export default function ExpressionDisplay({ expression, isAnimating }: ExpressionDisplayProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 bg-secondary/10 backdrop-blur">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Find the derivative of:</p>
          <MathLive math={`f(x) = ${expression}`} className="text-2xl font-bold" />
        </div>
      </Card>
    </motion.div>
  );
}