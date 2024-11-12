import dynamic from "next/dynamic";

// Disable SSR for the MathGame component
const MathGame = dynamic(() => import("@/components/games/math/MathGame"), {
  ssr: false,
});

export default function MathGamePage() {
  return <MathGame />;
}