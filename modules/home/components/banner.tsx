import bg from '@/assets/larva.png';
import AnimationSection from '@/components/animationSection';
import { Container } from '@/components/appContainer';
import { Button } from '@/components/ui/button';
import { PUBLIC_ROUTES } from '@/enums';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

function Banner({}: Props) {
  return (
    <Container className="pt-10 md:pt-20 lg:pt-28">
      <div className="mx-auto grid grid-cols-1 items-center lg:grid-cols-5 lg:flex-row lg:gap-20">
        <div className="mx-auto max-w-2xl font-sans lg:col-span-3 lg:mx-0">
          <AnimationSection animation="fade-right">
            <h2 className="mb-8 text-4xl font-extrabold tracking-tighter text-title-color md:text-5xl xl:text-6xl">
              The Wonders of Animation - The Mark of{' '}
              <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                ANT Media
              </span>
            </h2>
            <p className="font-medium text-slate-600 md:text-lg lg:text-xl">
              Step into the vibrant world of Ant Media Entertainment Service,
              where stories are woven from skilled strokes and smooth animation,
              bringing endless hours of relaxation and discovery.
            </p>
            <div className="mt-5">
              <Link href={PUBLIC_ROUTES.CONTACT}>
                <Button primary>Get In Touch</Button>
              </Link>
            </div>
          </AnimationSection>
        </div>
        <div className="lg:col-span-2">
          <AnimationSection animation="fade-left">
            <Image
              src={bg}
              alt="ANT Media"
              className="mx-auto w-full max-w-md"
            />
          </AnimationSection>
        </div>
      </div>
    </Container>
  );
}

export default Banner;
