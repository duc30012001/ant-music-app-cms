import AnimationSection from '@/components/animationSection';
import { Container } from '@/components/appContainer';
import { SectionTitle } from '@/components/section';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  className?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  title?: ReactNode;
  viewAllHref?: string;
  target?: HTMLAttributeAnchorTarget;
}

function SeriesSection({
  className,
  wrapperClassName,
  titleClassName,
  title,
  viewAllHref,
  children,
  target,
}: Props) {
  return (
    <div className={wrapperClassName}>
      <Container className="pb-2">
        <AnimationSection>
          <div className="flex items-center justify-between">
            <SectionTitle
              title={title}
              titleClassName={titleClassName}
              className="xl:text-4xl"
            />
            {viewAllHref && (
              <Link
                target={target}
                href={viewAllHref}
                className="inline-flex items-center font-medium text-primary underline-offset-2 hover:underline lg:text-lg"
              >
                View All
              </Link>
            )}
          </div>
        </AnimationSection>
      </Container>
      <AnimationSection>
        <div className={className}>{children}</div>
      </AnimationSection>
    </div>
  );
}

export default SeriesSection;
