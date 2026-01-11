import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { FC } from 'react';

import { useGameSession } from '@/src/shared/hooks/useGameSession/useGameSession';
import { cn } from '@/src/shared/lib/clsx';

interface TimerCircleProps {
  duration: number;
  isPlayerTurn: boolean;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const TimerCircle: FC<TimerCircleProps> = ({
  duration,
  isPlayerTurn,
  className,
  size = 80,
  strokeWidth = 5,
}) => {
  const { timeLeft } = useGameSession();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = (Math.max(0, timeLeft) / duration) * circumference;

  const getColorClass = () => {
    if (timeLeft > duration * 0.3) return 'stroke-blue-500 text-blue-500';
    if (timeLeft > duration * 0.1) return 'stroke-amber-500 text-amber-500';
    return 'stroke-red-500 text-red-500';
  };

  const colorClasses = getColorClass();
  const strokeColor = colorClasses.split(' ')[0];
  const textColor = colorClasses.split(' ')[1];

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className='relative'>
        <svg width={size} height={size} className='-rotate-90 transform'>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className='fill-transparent stroke-gray-200 dark:stroke-gray-700'
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap='round'
            className={cn(
              'fill-transparent transition-colors duration-300',
              strokeColor,
              timeLeft < duration &&
                'transition-[stroke-dashoffset] duration-1000 ease-linear'
            )}
          />
        </svg>

        <div className='absolute inset-0 flex items-center justify-center'>
          {isPlayerTurn ? (
            <ArrowBigRight
              className={cn(
                'rotate-90 transition-colors duration-300 lg:rotate-0',
                textColor,
                'size-8 md:size-10 lg:size-12'
              )}
            />
          ) : (
            <ArrowBigLeft
              className={cn(
                'rotate-90 transition-colors duration-300 lg:rotate-0',
                'text-gray-400',
                'size-8 md:size-10 lg:size-12'
              )}
            />
          )}
        </div>

        <div
          className={cn(
            'absolute bottom-[-28px] left-1/2 -translate-x-1/2 font-mono font-bold transition-colors duration-300',
            isPlayerTurn
              ? timeLeft > duration * 0.3
                ? 'text-blue-600 dark:text-blue-400'
                : timeLeft > duration * 0.1
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-red-600 dark:text-red-400'
              : 'text-gray-500 dark:text-gray-400'
          )}
        >
          {timeLeft}s
        </div>
      </div>
    </div>
  );
};
