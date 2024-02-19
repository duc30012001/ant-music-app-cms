import { Container } from '@/components/appContainer';
import { cn } from '@/helpers';
import { VideoItem } from '@/modules/video/components';
import { SeriesSection } from '.';
import { DetailData, videoData } from './data';

type Props = {
  className?: string;
  data: DetailData;
};

function VideoBySeriesSection({ className, data }: Props) {
  const { channelUrl } = data;
  return (
    <SeriesSection
      title="Video"
      wrapperClassName={cn('bg-background pt-10 2xl:pt-20', className)}
      viewAllHref={channelUrl}
      target="_blank"
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

export default VideoBySeriesSection;
