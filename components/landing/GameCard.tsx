"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  iconColor: string;
  href: string;
  difficulty: string;
}

export function GameCard({
  title,
  description,
  icon: Icon,
  color,
  borderColor,
  iconColor,
  href,
  difficulty,
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={href}>
        <Card className={cn(
          "relative h-full p-6 overflow-hidden transition-all duration-300",
          "hover:shadow-2xl hover:shadow-purple-500/10",
          "bg-gradient-to-br border-2",
          color,
          borderColor
        )}>
          <div className="relative z-10">
            <div className={cn(
              "inline-flex items-center justify-center",
              "w-12 h-12 rounded-xl mb-4",
              "bg-white/10 backdrop-blur-sm",
              iconColor
            )}>
              <Icon className="w-6 h-6" />
            </div>
            
            <Badge variant="secondary" className="mb-4">
              {difficulty}
            </Badge>

            <h3 className="text-2xl font-bold text-foreground mb-2">
              {title}
            </h3>
            
            <p className="text-muted-foreground mb-6">
              {description}
            </p>

            <div className="flex items-center text-foreground/80 group">
              <span className="font-medium">Start Playing</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div className="absolute right-2 top-2 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-2xl" />
          <Sparkles className="absolute right-4 top-4 w-6 h-6 text-white/20 animate-pulse-slow" />
        </Card>
      </Link>
    </motion.div>
  );
}