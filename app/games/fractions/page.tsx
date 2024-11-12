import dynamic from 'next/dynamic';

const PizzaGame = dynamic(() => import('@/components/games/fractions/PizzaGame'), {
  ssr: false,
});

export default function PizzaGamePage() {
  return <PizzaGame />;
}