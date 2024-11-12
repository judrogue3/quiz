"use client";

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.div 
          className="flex justify-center mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
            <Brain className="w-20 h-20 text-purple-500 relative" />
          </div>
        </motion.div>

        <h1 className="text-4xl font-bold text-foreground sm:text-6xl lg:text-7xl">
          <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            Interactive Math Games
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore mathematics through engaging, interactive games designed to make learning fun and effective.
        </p>
      </motion.div>
    </div>
  );
}