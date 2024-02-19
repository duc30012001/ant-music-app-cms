import { cn } from '@/helpers';
import { TimelineItemProps } from '.';

type Props = {
  data: TimelineItemProps;
  index: number;
  left?: boolean;
};

function TimelineItem({ data, index, left }: Props) {
  const { title, content } = data;
  return (
    <div
      className={cn('mb-8 flex w-full items-center justify-between', {
        'md:flex-row-reverse': left,
      })}
    >
      <div className="order-1 w-5/12" />
      <div className="z-20 order-1 flex h-8 w-8 items-center rounded-full bg-gray-800 shadow-xl">
        <h1 className="mx-auto text-lg font-semibold text-white">{index}</h1>
      </div>
      <div className="order-1 w-5/12 rounded-lg bg-white px-6 py-4 shadow-xl">
        <h3 className="mb-3 text-xl font-bold text-title-color">{title}</h3>
        <p className="leading-snug tracking-wide text-des-color text-opacity-100">
          {content}
        </p>
      </div>
    </div>
  );
}

export default TimelineItem;
