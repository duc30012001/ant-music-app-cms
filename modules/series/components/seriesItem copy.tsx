import { PUBLIC_ROUTES } from '@/enums';
import Link from 'next/link';
import { Series } from '../../home/components/data';

type Props = {
  data: Series;
};

function SeriesItem({ data }: Props) {
  const { thumbnail, title } = data;
  return (
    <Link
      className="group/item relative overflow-hidden rounded-2xl"
      href={PUBLIC_ROUTES.PRODUCTS + '/detail'}
    >
      <div
        className="aspect-[11/7] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${thumbnail}")`,
        }}
      >
        <div className="grid h-full w-full place-content-center bg-primary/85 opacity-0 transition-all duration-300 group-hover/item:opacity-100">
          <h3 className="text-center font-bold text-white md:text-lg lg:text-2xl">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default SeriesItem;
