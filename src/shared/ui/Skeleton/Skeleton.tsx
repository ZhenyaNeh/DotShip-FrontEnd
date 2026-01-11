import { cn } from '../../lib/clsx';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn(
        'animate-pulse rounded-md bg-gray-400 dark:bg-gray-700',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
