"use client";

import { motion } from 'framer-motion';

interface CityScapeProps {
  level: number;
}

export function CityScape({ level }: CityScapeProps) {
  return (
    <div className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-b from-sky-400 to-sky-300">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 bg-blue-900"
          style={{
            left: `${i * 20}%`,
            width: '15%',
            height: `${30 + Math.random() * 50}%`,
            opacity: 0.8,
          }}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            delay: i * 0.1,
            duration: 0.5,
            type: 'spring',
            stiffness: 100
          }}
        >
          {[...Array(Math.floor(level * 1.5))].map((_, j) => (
            <div
              key={j}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${1 + Math.random() * 2}s infinite`
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}