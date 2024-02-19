import { cn } from '@/helpers';
import Menu from './menu';

type Props = {
  className?: string;
};

function Navbar({ className }: Props) {
  return (
    <ul className={cn('flex list-none flex-row space-x-6', className)}>
      <Menu />
    </ul>
  );
}

export default Navbar;
