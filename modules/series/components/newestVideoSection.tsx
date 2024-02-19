import { Container } from '@/components/appContainer';
import { PUBLIC_ROUTES } from '@/enums';
import { cn } from '@/helpers';
import { VideoItem } from '@/modules/video/components';
import { SeriesSection } from '.';
import { videoData } from './data';

type Props = {
  className?: string;
};

function NewestVideoSection({ className }: Props) {
  return (
    <SeriesSection
      title="Latest Video"
      viewAllHref={PUBLIC_ROUTES.VIDEOS}
      wrapperClassName={cn('bg-background pb-20', className)}
    >
      <Container>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
          {videoData.map((item) => {
            const { id, thumbnail, title } = item;
            return <VideoItem key={id} thumbnail={thumbnail} title={title} />;
          })}
        </div>
      </Container>
    </SeriesSection>
  );
}

export default NewestVideoSection;
