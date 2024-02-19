import { PropsWithChildren, ReactNode } from 'react';
import AnimationSection from '../animationSection';
import SectionTitle, { SectionTitleProps } from './sectionTitle';

type Props = PropsWithChildren &
  SectionTitleProps & {
    className?: string;
    wrapperClassName?: string;
    description?: ReactNode;
  };

function Section({
  className,
  wrapperClassName,
  titleClassName,
  title,
  children,
  description,
}: Props) {
  return (
    <div className={wrapperClassName}>
      <AnimationSection>
        <div className="mx-auto mb-10 max-w-screen-sm text-center">
          <SectionTitle title={title} titleClassName={titleClassName} />
          <p className="text-des-color lg:text-lg">{description}</p>
        </div>
      </AnimationSection>
      <AnimationSection>
        <div className={className}>{children}</div>
      </AnimationSection>
    </div>
  );
}

export default Section;
