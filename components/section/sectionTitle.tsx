import { cn } from '@/helpers';
import { ReactNode } from 'react';

export interface SectionTitleProps {
  titleClassName?: string;
  className?: string;
  title?: ReactNode;
}

function SectionTitle({ titleClassName, className, title }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        'mb-2 text-3xl font-extrabold leading-tight tracking-tighter text-title-color md:text-4xl xl:text-5xl',
        titleClassName,
        className
      )}
    >
      {title}
    </h2>
  );
}

export default SectionTitle;
