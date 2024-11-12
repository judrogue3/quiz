import dynamic from 'next/dynamic';

const NumberMasterGame = dynamic(() => import('@/components/games/number-master/NumberMasterGame'), {
  ssr: false,
});

export default function NumberMasterPage() {
  return <NumberMasterGame />;
}