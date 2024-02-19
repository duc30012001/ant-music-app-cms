import { Container } from '@/components/appContainer';
import { Section } from '@/components/section';
import Image from 'next/image';
import { partners } from './data';

type Props = {
  className?: string;
};

function PartnerSection({ className }: Props) {
  return (
    <Section
      title="Partners"
      description="Let's build something awesome together"
      wrapperClassName={className}
    >
      <Container>
        <div className="grid grid-cols-3 gap-10 sm:grid-cols-4 lg:grid-cols-6">
          {partners.map((item) => (
            <Image
              key={item.id}
              className="m-auto h-auto max-h-10 w-auto text-white"
              src={item.logo}
              alt={item.id.toString()}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default PartnerSection;
