import { Container } from '@/components/appContainer';
import { SectionTitle, SectionTitleProps } from '@/components/section';
import { videoData } from '@/modules/series/components/data';
import { VideoItem } from '.';

interface Props extends SectionTitleProps {}

function VideoSection({ className, titleClassName, title }: Props) {
  return (
    <Container>
      <div className={className}>
        <div className="mb-10">
          <SectionTitle
            title={title}
            titleClassName={titleClassName}
            className="xl:text-4xl"
          />
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
          {videoData.map((item) => {
            const { id, thumbnail, title } = item;
            return <VideoItem key={id} thumbnail={thumbnail} title={title} />;
          })}
        </div>
      </div>
    </Container>
  );
}

export default VideoSection;
