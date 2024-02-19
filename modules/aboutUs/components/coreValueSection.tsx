import oggy from '@/assets/oggy.png';
import { Container } from '@/components/appContainer';
import { Section } from '@/components/section';
import Image from 'next/image';
import CoreValueItem from './coreValueItem';
import { coreValueData } from './data';

type Props = {};

function CoreValueSection({}: Props) {
  return (
    <Section
      title="Core Values"
      description="The fundamental principles guiding our company"
      wrapperClassName="py-20 bg-background"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <Image src={oggy} alt="core value" className="mx-auto max-w-sm" />
          </div>
          <div className="grid gap-5">
            {coreValueData.map((item) => (
              <CoreValueItem key={item.id} data={item} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default CoreValueSection;
