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
      className="group/item relative overflow-hidden"
      href={PUBLIC_ROUTES.PRODUCTS + '/detail'}
    >
      <div className="relative aspect-[11/7] w-full overflow-hidden rounded-2xl">
        <div
          className="aspect-[11/7] overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover/item:scale-110"
          style={{
            backgroundImage: `url("${thumbnail}")`,
          }}
        />
      </div>
      <h3 className="text-title mb-1 mt-2 line-clamp-1 cursor-pointer text-lg font-semibold group-hover/item:text-primary lg:text-xl">
        {title}
      </h3>
      <p className="line-clamp-3">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters,
      </p>
    </Link>
  );
}

export default SeriesItem;
