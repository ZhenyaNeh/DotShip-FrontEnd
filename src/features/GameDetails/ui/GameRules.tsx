import { BookOpen } from 'lucide-react';
import { FC } from 'react';

import { IRule } from '@/src/shared/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/shared/ui/Accordion/Accordion';

interface Props {
  rules: IRule[];
}

export const GameRules: FC<Props> = ({ rules }) => {
  const sortedRules = [...rules].sort((a, b) => a.order - b.order);

  if (sortedRules.length === 0) {
    return (
      <div className='space-y-6'>
        <div>
          <h3 className='mb-4 text-xl font-semibold'>Rules of the game</h3>
          <p className='text-muted-foreground mb-6'>
            Please read the rules before you start playing.
          </p>
        </div>

        <div className='bg-muted/50 rounded-lg border p-6 text-center'>
          <BookOpen className='text-muted-foreground mx-auto mb-3 h-8 w-8' />
          <p className='text-muted-foreground'>
            Rules for this game have not been added yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 text-xl font-semibold'>Rules of the game</h3>
        <p className='text-muted-foreground mb-6'>
          Please read the rules before starting the game. {sortedRules.length}{' '}
          rules
        </p>
      </div>

      <Accordion
        type='single'
        collapsible
        defaultValue={`rule-${rules[0].order}`}
        className='space-y-4'
      >
        {sortedRules.map((rule, index) => (
          <AccordionItem
            key={rule.order}
            value={`rule-${rule.order}`}
            className='bg-card overflow-hidden px-4'
          >
            <AccordionTrigger className='px-0 py-4'>
              <div className='flex items-center gap-3 text-left'>
                <div className='bg-primary/10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full'>
                  <span className='text-primary text-sm font-semibold'>
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h4 className='font-semibold'>{rule.title}</h4>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className='px-0 pb-4'>
              <div className='border-primary/20 ml-9 border-l-2 pl-4'>
                <p className='text-muted-foreground leading-relaxed'>
                  {rule.description}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className='bg-primary/5 rounded-lg p-4'>
        <p className='text-muted-foreground text-sm'>
          <span className='font-medium'>Advice:</span> You can expand all the
          rules at once by clicking on the headings. We recommend familiarizing
          yourself with them before starting the game.
        </p>
      </div>
    </div>
  );
};
