import { cn } from '@/helpers';

type Props = {
  value: string | TrustedHTML;
  className?: string;
};

function CKContent({ value, className }: Props) {
  return (
    <div
      className={cn('ck-content !min-h-[auto] p-0', className)}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

export default CKContent;
