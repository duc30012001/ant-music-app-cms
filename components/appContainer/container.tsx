import { cn } from '@/helpers';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
  widthFull?: boolean;
}

function Container({ children, className, widthFull }: Props) {
  return (
    <div
      className={cn(
        'mx-auto max-w-screen-xl px-4 py-8',
        {
          'max-w-full': widthFull,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export default Container;
