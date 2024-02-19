import { cn } from '@/helpers';

type Props = {
  thumbnail: string;
  wrapperClassName?: string;
  className?: string;
};

function ImageItem({ thumbnail, className, wrapperClassName }: Props) {
  return (
    <div
      className={cn(
        'absolute w-full max-w-48 overflow-hidden rounded-2xl bg-white p-1 shadow-md sm:p-2',
        wrapperClassName
      )}
    >
      <div
        className={cn(
          'aspect-[5/7] overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover/item:scale-110',
          className
        )}
        style={{
          backgroundImage: `url("${thumbnail}")`,
        }}
      />
    </div>
  );
}

export default ImageItem;
