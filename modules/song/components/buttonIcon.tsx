import { cn } from '@/helpers';
import { Tooltip } from 'antd';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  title?: ReactNode;
  icon: ReactNode;
};

function ButtonIcon({ title, icon, className, ...props }: Props) {
  return (
    <Tooltip title={title}>
      <button
        className={cn(
          'rounded-full p-[10px] text-xl text-gray-700 hover:bg-gray-300',
          className
        )}
        {...props}
      >
        {icon}
      </button>
    </Tooltip>
  );
}

export default ButtonIcon;
