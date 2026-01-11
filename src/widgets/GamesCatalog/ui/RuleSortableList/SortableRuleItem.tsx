import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import React, { FC } from 'react';

import { Button } from '@/src/shared/ui/Button/Button';
import { TypeRuleFormSchema } from '@/src/widgets/GamesCatalog/schemas';

interface RuleItemProps {
  rule: TypeRuleFormSchema;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export const SortableRuleItem: FC<RuleItemProps> = props => {
  const { rule, index, onEdit, onDelete } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: rule.order?.toString() || index.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='bg-card mb-2 flex items-center gap-3 rounded-lg border p-4'
    >
      <button
        type='button'
        className='text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing'
        {...attributes}
        {...listeners}
      >
        <GripVertical className='h-5 w-5' />
      </button>

      <div className='flex-1'>
        <div className='flex items-center gap-2'>
          <span className='bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium'>
            {rule.order}
          </span>
          <h4 className='font-medium'>{rule.title}</h4>
        </div>
        <p className='text-muted-foreground mt-1 text-sm'>{rule.description}</p>
      </div>

      <div className='flex items-center gap-1'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={() => onEdit(rule.order)}
          className='h-8 w-8'
        >
          <Pencil className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={() => onDelete(rule.order)}
          className='text-destructive hover:text-destructive h-8 w-8'
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};
