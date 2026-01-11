'use client';

import { AlertCircle } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { GameDetailContent } from './GameDetailContent';
import { GameDetailSidebar } from './GameDetailSidebar';
import { GameDetailSkeleton } from './GameDetailSkeleton';
import { useGames } from '@/src/shared/hooks';
import { Alert, AlertDescription } from '@/src/shared/ui/Alert/Alert';
import { Button } from '@/src/shared/ui/Button/Button';

export const GameDetails: FC = () => {
  const { id } = useParams();
  const { games, isLoading, error } = useGames();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const game = games?.find(game => game.id === id);

  if (!game) {
    return null;
  }

  const onStartGame = () => {
    router.push(`/sea-battle?gameId=${game.id}`);
  };

  if (isLoading) {
    return <GameDetailSkeleton />;
  }

  if (error || !game) {
    return (
      <div className='container mx-auto px-4'>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Game not found or there was an error loading
          </AlertDescription>
        </Alert>
        <Button asChild className='mt-4'>
          <Link href='/games-catalog'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Return to catalog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='mb-6'>
        <Button asChild variant='ghost' size='sm' className='mb-4'>
          <Link href='/games-catalog'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            To the games catalog
          </Link>
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <GameDetailContent
          game={game}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <GameDetailSidebar
          game={game}
          onStartGame={onStartGame}
          onShowRules={() => setActiveTab('rules')}
        />
      </div>
    </div>
  );
};
