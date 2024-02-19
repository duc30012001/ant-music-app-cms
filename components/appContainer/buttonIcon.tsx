import { cn } from '@/helpers';
import React, { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function ButtonIcon({ icon, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'grid h-10 w-10 place-content-center rounded-full text-xl hover:bg-slate-200',
        className
      )}
    >
      {icon}
    </button>
  );
}

export default ButtonIcon;
