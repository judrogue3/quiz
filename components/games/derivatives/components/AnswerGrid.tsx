"use client";

import { motion } from "framer-motion";
import { InlineMath } from 'react-katex';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnswerGridProps {
  answers: string[];
  correctAnswer: string;
  isAnswered: boolean;
  onAnswer: (answer: string) => void;
  timeRemaining: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function AnswerGrid({
  answers,
  correctAnswer,
  isAnswered,
  onAnswer,
  timeRemaining
}: AnswerGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4"
    >
      {answers.map((answer) => (
        <motion.div key={answer} variants={item}>
          <Button
            className={cn(
              "w-full h-24 text-lg transition-all duration-300",
              "bg-gradient-to-br hover:shadow-lg",
              isAnswered && answer === correctAnswer && "from-green-500/20 to-green-600/20 border-green-500/50",
              isAnswered && answer !== correctAnswer && "from-red-500/20 to-red-600/20 border-red-500/50",
              !isAnswered && "from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10"
            )}
            variant="outline"
            onClick={() => onAnswer(answer)}
            disabled={isAnswered || timeRemaining === 0}
          >
            <InlineMath math={answer} />
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}