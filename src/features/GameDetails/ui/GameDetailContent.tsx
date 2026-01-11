import { Award, BookOpen, Shield } from 'lucide-react';
import { FC } from 'react';

import { GameDetailHeader } from './GameDetailHeader';
import { GameDetailsInfo } from './GameDetailsInfo';
import { GameOverview } from './GameOverview';
import { GameRules } from './GameRules';
import { IGame } from '@/src/shared/lib/types';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/shared/ui/Tabs/Tabs';

interface Props {
  game: IGame;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const GameDetailContent: FC<Props> = props => {
  const { game, activeTab, onTabChange } = props;

  return (
    <div className='space-y-8 lg:col-span-2'>
      <GameDetailHeader
        displayName={game.displayName}
        picture={game.picture}
        isVisible={game.isVisible}
        description={game.description}
        gameMode={game.gameMode}
        difficulty={game.difficulty}
        estimatedTime={game.estimatedTime}
      />
      <Tabs value={activeTab} onValueChange={onTabChange} className='w-full'>
        <TabsList className='bg-primary/5 grid w-full grid-cols-3 dark:bg-gray-700'>
          <TabsTrigger value='overview' className='gap-2'>
            <BookOpen className='h-4 w-4' />
            Review
          </TabsTrigger>
          <TabsTrigger value='rules' className='gap-2'>
            <Shield className='h-4 w-4' />
            Rules
          </TabsTrigger>
          <TabsTrigger value='details' className='gap-2'>
            <Award className='h-4 w-4' />
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='mt-6'>
          <GameOverview game={game} />
        </TabsContent>

        <TabsContent value='rules' className='mt-6'>
          <GameRules rules={game.rules} />
        </TabsContent>

        <TabsContent value='details' className='mt-6'>
          <GameDetailsInfo game={game} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
