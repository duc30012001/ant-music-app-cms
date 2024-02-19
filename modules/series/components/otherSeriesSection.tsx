import { Container } from '@/components/appContainer';
import { PUBLIC_ROUTES } from '@/enums';
import { cn } from '@/helpers';
import { seriesData } from '@/modules/home/components/data';
import { SeriesItem, SeriesSection } from '.';

type Props = {
  className?: string;
};

function OtherSeriesSection({ className }: Props) {
  return (
    <SeriesSection
      title="Other Series"
      wrapperClassName={cn('bg-background pt-10 pb-10', className)}
      viewAllHref={PUBLIC_ROUTES.PRODUCTS}
    >
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {seriesData.map((item) => (
            <SeriesItem data={item} key={item.id} />
          ))}
        </div>
      </Container>
    </SeriesSection>
  );
}

export default OtherSeriesSection;
