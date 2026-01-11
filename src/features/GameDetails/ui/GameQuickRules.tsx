import { CheckCircle, Shield } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { FC } from 'react';

import { IRule } from '@/src/shared/lib/types';
import { Button } from '@/src/shared/ui/Button/Button';

interface Props {
  rules: IRule[];
  onShowAll: () => void;
}

export const GameQuickRules: FC<Props> = ({ rules, onShowAll }) => {
  return (
    <div className='bg-card rounded-xl border p-5'>
      <div className='mb-4 flex items-center gap-2'>
        <Shield className='text-primary h-5 w-5' />
        <h4 className='font-semibold'>Key rules</h4>
      </div>
      <div className='space-y-3'>
        {rules.map((rule, index) => (
          <div key={index} className='flex items-start gap-2'>
            <CheckCircle className='mt-0.5 h-4 w-4 flex-shrink-0 text-green-500' />
            <span className='text-sm'>{rule.title}</span>
          </div>
        ))}
      </div>
      <Button
        variant='link'
        className='mt-4 w-full p-0 text-sm'
        onClick={onShowAll}
      >
        All rules
        <ChevronRight className='ml-1 h-4 w-4' />
      </Button>
    </div>
  );
};
