import minion from '@/assets/minion.png';
import AnimationSection from '@/components/animationSection';
import { Container } from '@/components/appContainer';
import { SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/helpers';
import Image from 'next/image';

type Props = {
  className?: string;
};

function AboutUsSection({ className }: Props) {
  return (
    <div className="bg-bg">
      <Container className="pb-0">
        <AnimationSection>
          <div className={cn('rounded-2xl p-5', className)}>
            <div className="grid grid-cols-1 place-content-center gap-10 rounded-2xl py-5 lg:grid-cols-3 lg:gap-20">
              <div className="lg:col-span-1">
                <Image
                  src={minion}
                  alt="about-us"
                  className="mx-auto w-full max-w-sm"
                />
              </div>
              <div className="mx-auto max-w-2xl lg:col-span-2">
                <SectionTitle
                  className="!leading-normal text-sky-800"
                  title="About us"
                />
                <p className="mb-4 font-medium text-des-color lg:text-lg">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using Content
                  here, content here, making it look like readable English
                </p>
                <Button
                //  className="border-primary text-primary hover:border-primary/80 hover:text-primary/80"
                >
                  More about us
                </Button>
              </div>
            </div>
          </div>
        </AnimationSection>
      </Container>
    </div>
  );
}

export default AboutUsSection;
