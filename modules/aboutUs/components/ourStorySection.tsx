import bear from '@/assets/cartoon/bear.jpg';
import bear1 from '@/assets/cartoon/bear1.webp';
import cartoon1 from '@/assets/cartoon/cartoon1.webp';
import panther from '@/assets/cartoon/panther.jpg';
import AnimationSection from '@/components/animationSection';
import { Container } from '@/components/appContainer';
import { SectionTitle } from '@/components/section';
import { cn } from '@/helpers';
import ImageItem from './imageItem';

type Props = {
  className?: string;
};

function OurStorySection({ className }: Props) {
  return (
    <div className="bg-bg">
      <Container className="pt-0">
        <AnimationSection>
          <div className={cn('rounded-2xl p-5', className)}>
            <div className="grid grid-cols-1 place-content-center gap-10 rounded-2xl py-5 lg:grid-cols-2 lg:gap-20">
              <div className="mx-auto grid max-w-2xl place-content-center">
                <SectionTitle
                  title="Our story"
                  className="!leading-normal text-rose-500"
                />
                <p className="mb-4 font-medium text-des-color lg:text-lg xl:text-xl">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using Content
                  here, content here, making it look like readable English
                </p>
              </div>
              <div className="mb-2 mt-14">
                <div className="relative mx-auto aspect-square w-[16rem] rounded-full bg-red-300 sm:w-[22rem]">
                  <ImageItem
                    thumbnail={bear.src}
                    wrapperClassName="-left-12 sm:-left-8 -top-14 max-w-40 sm:max-w-52"
                    className="aspect-[7/8] bg-cover"
                  />
                  <ImageItem
                    thumbnail={panther.src}
                    wrapperClassName="-right-10 top-2 sm:-right-16 sm:top-7 max-w-44 sm:max-w-56"
                    className="aspect-[11/8]"
                  />
                  <ImageItem
                    thumbnail={cartoon1.src}
                    wrapperClassName="-left-14 sm:-left-16 -bottom-2 sm:-bottom-2 max-w-44 sm:max-w-56"
                    className="aspect-[11/8]"
                  />
                  <ImageItem
                    thumbnail={bear1.src}
                    wrapperClassName="right-0 bottom-4 sm:bottom-3 max-w-32 sm:max-w-44"
                    className="aspect-[11/8]"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimationSection>
      </Container>
    </div>
  );
}

export default OurStorySection;
