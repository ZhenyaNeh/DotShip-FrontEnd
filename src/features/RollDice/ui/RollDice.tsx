import { motion } from 'framer-motion';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { dotEventConvert } from '../consts/dot-event-convert';

import { DiceFace } from './DiceFace';
import { useSound } from '@/src/shared/hooks';
import { GameEvents, LocalStorageHit } from '@/src/shared/lib/types';
import {
  eventAlreadyHitTokenInstance,
  eventTokenInstance,
  getWeightedRandom,
} from '@/src/shared/lib/utils';

interface Props {
  value: number;
  selectedEvent: GameEvents | null;
  setValue: Dispatch<SetStateAction<number>>;
  setSelectedEvent: Dispatch<SetStateAction<GameEvents | null>>;
}

export const RollDice: FC<Props> = props => {
  const { value, selectedEvent, setValue, setSelectedEvent } = props;
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const { playSound } = useSound();

  useEffect(() => {
    const checkEvent = Number(eventTokenInstance.get());
    const alreadyHit = eventAlreadyHitTokenInstance.get();

    if (
      alreadyHit === LocalStorageHit.NO_HIT &&
      checkEvent &&
      checkEvent > 0 &&
      checkEvent < 7
    ) {
      setSelectedEvent(dotEventConvert[checkEvent]);
      setValue(checkEvent);
    }

    return () => {
      setValue(1);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rollDice = () => {
    if (isRolling) return;
    if (selectedEvent) {
      toast.info('You have already chosen your event.');
      return;
    }

    setIsRolling(true);
    const newValue = getWeightedRandom();
    playSound('bonus', 0.8);

    setTimeout(() => {
      eventAlreadyHitTokenInstance.set(LocalStorageHit.NO_HIT);
      setSelectedEvent(dotEventConvert[newValue]);
      eventTokenInstance.set(newValue.toString());
      setValue(newValue);
      setIsRolling(false);
    }, 1000);
  };

  return (
    <motion.div
      onClick={rollDice}
      animate={{
        rotate: isRolling ? [0, 360, 720] : 0,
        scale: isRolling ? [1, 1.2, 1] : 1,
      }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
      className='bg-muted relative flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-[15px] select-none'
    >
      <DiceFace value={value} />
    </motion.div>
  );
};
