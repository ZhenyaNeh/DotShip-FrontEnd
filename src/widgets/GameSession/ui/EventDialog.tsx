import React, { Dispatch, FC, SetStateAction, useState } from 'react';

import { eventDescriptions } from '../consts/event-description';

import { RollDice } from '@/src/features/RollDice';
import { useGameSession } from '@/src/shared/hooks/useGameSession/useGameSession';
import { GameEvents } from '@/src/shared/lib/types';
import { Button } from '@/src/shared/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/shared/ui/Dialog/Dialog';

interface Props {
  open: boolean;
  selectedEvent: GameEvents | null;
  handleOpenChange: () => void;
  setSelectedEvent: Dispatch<SetStateAction<GameEvents | null>>;
}

export const EventDialog: FC<Props> = props => {
  const { open, selectedEvent, handleOpenChange, setSelectedEvent } = props;
  const [value, setValue] = useState<number>(1);
  const { handleFire } = useGameSession();

  const handleOpen = () => {
    if (selectedEvent === GameEvents.STORM) {
      setTimeout(() => {
        handleFire(0, 0);
      }, 500);
    }
    handleOpenChange();
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className='sm:max-w-[425px] [&>button]:hidden'>
          <DialogHeader>
            <DialogTitle>Roll Dice for event</DialogTitle>
            <DialogDescription>
              Click on the cube to generate an event (the event cannot be
              skipped)
            </DialogDescription>
          </DialogHeader>
          <div className='grid grid-cols-2 gap-2 py-5'>
            <div className='w-ful flex items-center justify-center'>
              <RollDice
                value={value}
                selectedEvent={selectedEvent}
                setValue={setValue}
                setSelectedEvent={setSelectedEvent}
              />
            </div>

            <div className='flex w-full items-center justify-center'>
              {!selectedEvent ? (
                <div className='text-center'>
                  <div className='mb-2 text-4xl'>⌛</div>
                  <h3 className='text-xl font-bold'>Roll the dice!</h3>
                  <p className='text-sm'>
                    Select a random event. Click the cube to select a random
                    event.
                  </p>
                </div>
              ) : (
                <div className={'text-center'}>
                  <div className='mb-2 text-4xl'>
                    {eventDescriptions[selectedEvent].icon}
                  </div>
                  <h3 className='text-xl font-bold'>
                    {eventDescriptions[selectedEvent].title}
                  </h3>
                  <p className='text-sm'>
                    {eventDescriptions[selectedEvent].description}
                  </p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            {selectedEvent && (
              <Button
                className='w-full'
                onClick={handleOpen}
                variant={'outline'}
              >
                Continue game
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
