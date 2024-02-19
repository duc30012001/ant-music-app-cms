import { Container } from '@/components/appContainer';
import { Section } from '@/components/section';
import { cn } from '@/helpers';
import { seriesData } from '@/modules/home/components/data';
import { SeriesItem } from '.';

type Props = {
  className?: string;
};

function Series({ className }: Props) {
  return (
    <Section
      title="Our Work"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      wrapperClassName={cn('pt-20 2xl:pt-28 pb-10', className)}
      titleClassName="text-title-color"
    >
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {seriesData.map((item) => (
            <SeriesItem data={item} key={item.id} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Series;
