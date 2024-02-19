import { cn } from '@/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { publicRoutes, publicRoutesType } from '../routes';

type Props = {};

function Menu({}: Props) {
  const { pathname } = useRouter();
  console.log('pathname:', pathname);
  return (
    <>
      {publicRoutes.map((item: publicRoutesType) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            'rounded-lg px-4 py-2 text-base font-bold text-title-color hover:text-primary',
            {
              'text-primary': pathname === item.href,
            }
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export default Menu;
