import AnimationSection from '@/components/animationSection';
import { Container } from '@/components/appContainer';
import { Section } from '@/components/section';
import hexRgb from 'hex-rgb';
import Image from 'next/image';
import { history } from './data.';

type Props = {};

function CompanyHistorySection({}: Props) {
  return (
    <Section
      title="Our history"
      description="It is a long established fact that a reader will be distracted by the readable content"
      wrapperClassName="py-20"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {history.map((item) => {
            const { id, color, content, title, image } = item;
            const backgroundColor = hexRgb(color, {
              format: 'css',
              alpha: 0.1,
            });
            const borderColor = hexRgb(color, {
              format: 'css',
              alpha: 0.5,
            });
            return (
              <div
                key={id}
                className="rounded-xl border-4 p-10"
                style={{ backgroundColor, borderColor }}
              >
                <AnimationSection>
                  <Image src={image} alt={title} className="mx-auto h-48" />
                  <h2
                    className="pb-2 pt-4 text-center text-2xl font-bold"
                    style={{ color }}
                  >
                    {title}
                  </h2>
                  <p className="text-center">{content}</p>
                </AnimationSection>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export default CompanyHistorySection;
