"use client";

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MathLiveProps {
  math: string;
  className?: string;
}

export function MathLive({ math, className }: MathLiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Using MathJax as a simpler alternative for math rendering
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.MathJax) {
          window.MathJax.typesetPromise([containerRef.current]);
        }
      };

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [math]);

  return (
    <div 
      ref={containerRef} 
      className={cn("math-display", className)}
    >
      {`\\[${math}\\]`}
    </div>
  );
}