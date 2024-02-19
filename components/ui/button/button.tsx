import { cn } from '@/helpers';
import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  primary?: boolean;
  loading?: boolean;
}

function Button({
  children,
  className,
  primary,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded-3xl border border-gray-400 px-5 py-3 text-center text-base font-medium text-text-color hover:border-primary hover:text-primary',
        {
          'border-none bg-primary text-white hover:bg-primary/90 hover:text-white':
            primary,
          'cursor-default opacity-70 hover:opacity-60': loading,
        },
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
