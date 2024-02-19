import { TimelineItemProps } from './index.d';
import TimelineItem from './timelineItem';

type Props = {
  data: TimelineItemProps[];
};

function Timeline({ data }: Props) {
  return (
    <div className="before:absolute before:top-0 before:h-full before:w-1 before:bg-primary before:content-[''] md:before:left-1/2 md:before:-translate-x-1/2">
      {data?.map((item, index) => {
        const isOdd = index % 2 === 1;
        return (
          <TimelineItem
            left={isOdd}
            index={index + 1}
            key={index}
            data={item}
          />
        );
      })}
    </div>
  );
}

export default Timeline;
export * from './index.d';
