"use client";

import { Brain, PieChart, Building2, Sigma } from 'lucide-react';
import { HeroSection } from '@/components/landing/HeroSection';
import { GameCard } from '@/components/landing/GameCard';

const games = [
  {
    title: "Derivative Quest",
    description: "Master calculus through interactive exercises and real-world applications. Practice differentiation rules and solve optimization problems.",
    icon: Sigma,
    color: "from-blue-500/20 to-indigo-600/20",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-500",
    href: "/games/derivatives",
    difficulty: "Advanced"
  },
  {
    title: "Pizza Fraction Master",
    description: "Learn fractions through interactive pizza slicing! Compare different parts, match visual representations, and solve fraction problems.",
    icon: PieChart,
    color: "from-orange-500/20 to-red-600/20",
    borderColor: "border-orange-500/20",
    iconColor: "text-orange-500",
    href: "/games/fractions",
    difficulty: "Intermediate"
  },
  {
    title: "Number Master CPA",
    description: "Explore place values up to 1000 using Singapore's CPA method. Build numbers with blocks and understand their composition.",
    icon: Building2,
    color: "from-emerald-500/20 to-teal-600/20",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-500",
    href: "/games/number-master",
    difficulty: "Beginner"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/90 via-background to-background">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative">
        <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <HeroSection />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}