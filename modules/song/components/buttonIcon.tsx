import { cn } from '@/helpers';
import { Tooltip } from 'antd';
import { ReactNode } from 'react';

type Props = {
  title?: ReactNode;
  icon: ReactNode;
  className?: string;
};

function ButtonIcon({ title, icon, className }: Props) {
  return (
    <Tooltip title={title}>
      <button
        className={cn(
          'rounded-full p-3 text-xl text-gray-700 hover:bg-gray-300',
          className
        )}
      >
        {icon}
      </button>
    </Tooltip>
  );
}

export default ButtonIcon;
