import { BattleRoyalProvider } from '@/src/app/providers/BattleRoyalProvider';
import { BattleRoyalPage } from '@/src/pagesFSD/BattleRoyalPage';

export default function Page() {
  return (
    <BattleRoyalProvider>
      <BattleRoyalPage />
    </BattleRoyalProvider>
  );
}
