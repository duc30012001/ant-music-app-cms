import { cn } from '@/helpers';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type Props = {} & DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

function FormDivider({ className, ...props }: Props) {
  return (
    <div
      className={cn('my-3 h-[1px] w-full bg-gray-300', className)}
      {...props}
    />
  );
}

export default FormDivider;
