"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Heart, Timer, Volume2, VolumeX } from "lucide-react";
import { GameState } from "../types";

interface GameHeaderProps {
  gameState: GameState;
  onToggleMute: () => void;
}

export default function GameHeader({ gameState, onToggleMute }: GameHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          {gameState.score}
        </Badge>
        <div className="flex items-center">
          {[...Array(gameState.lives)].map((_, i) => (
            <Heart
              key={i}
              className="w-6 h-6 text-red-500 animate-pulse"
              fill="currentColor"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="text-lg px-4 py-2">
          <Timer className="w-5 h-5 mr-2" />
          {gameState.time}s
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMute}
        >
          {gameState.isMuted ? <VolumeX /> : <Volume2 />}
        </Button>
      </div>
    </div>
  );
}