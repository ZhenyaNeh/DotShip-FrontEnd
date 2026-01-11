import { Trash2 } from 'lucide-react';
import React, { FC, useState } from 'react';

import { useDeleteGameMutation } from '../../hooks/ui/useDeleteGameMutation';

import { IGame } from '@/src/shared/lib/types';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/ui/Dialog/Dialog';

interface Props {
  game: IGame;
}

export const GameDeleteDialog: FC<Props> = ({ game }) => {
  const { deleteGame } = useDeleteGameMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleConfirmDelete = async () => {
    await deleteGame(game.id);
    setIsDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete game</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the game?{' '}
            <span className='text-foreground font-semibold'>
              {game.displayName}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className='py-4'>
          <div className='border-destructive/20 bg-destructive/5 rounded-lg border p-4'>
            <div className='flex items-center gap-3'>
              <div className='bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-full'>
                <Trash2 className='text-destructive h-5 w-5' />
              </div>
              <div>
                <p className='font-medium'>Warning</p>
                <p className='text-muted-foreground text-sm'>
                  All associated data, including rules and statistics, will be
                  deleted.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={handleConfirmDelete}>
            Delete game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
