import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  href: string;
  thumbnail: string;
  title: ReactNode;
  description?: ReactNode;
};

function AppItem({ href, thumbnail, title, description }: Props) {
  return (
    <Link href={href}>
      <div className="group/item rounded-lg bg-gray-800 p-4 shadow-md hover:bg-gray-700">
        <div className="aspect-[11/7] w-full overflow-hidden rounded-lg">
          <div
            className="aspect-[11/7] overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover/item:scale-110"
            style={{
              backgroundImage: `url("${thumbnail}")`,
            }}
          />
        </div>
        <h3 className="my-2 line-clamp-2 cursor-pointer text-lg font-medium group-hover/item:text-primary">
          {title}
        </h3>
        <p className="line-clamp-3 text-gray-300">{description}</p>
      </div>
    </Link>
  );
}

export default AppItem;
