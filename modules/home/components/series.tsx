import { Container } from '@/components/appContainer';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import { PUBLIC_ROUTES } from '@/enums';
import { cn } from '@/helpers';
import { SeriesItem } from '@/modules/series/components';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import { seriesData } from './data';

type Props = {
  className?: string;
};

function Series({ className }: Props) {
  return (
    <Section
      title="Our Work"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      wrapperClassName={cn('bg-background pt-20 2xl:pt-28 pb-10', className)}
      titleClassName="bg-gradient-to-r from-purple-600/80 to-cyan-600 bg-clip-text text-transparent"
    >
      <Container>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-y-6 xl:grid-cols-4">
          {seriesData.map((item) => (
            <SeriesItem data={item} key={item.id} />
          ))}
        </div>
        <div className="mt-10 grid place-content-center">
          <Link href={PUBLIC_ROUTES.PRODUCTS}>
            <Button className="flex items-center justify-center gap-2">
              Show more project <FaChevronRight />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export default Series;
