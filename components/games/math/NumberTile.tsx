"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NumberTileProps {
  number: number;
  onDrop: () => void;
  isAnimating: boolean;
}

export default function NumberTile({ number, onDrop, isAnimating }: NumberTileProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Button
      className={cn(
        "h-24 text-2xl font-bold transition-all duration-300 transform hover:scale-105",
        isDragging && "scale-95 opacity-50",
        isAnimating && "animate-bounce"
      )}
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        onDrop();
      }}
      onClick={onDrop}
    >
      {number}
    </Button>
  );
}