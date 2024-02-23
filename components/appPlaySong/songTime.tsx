import { cn, convertSecondsToTime } from '@/helpers';

type Props = {
  value: number | string;
  className?: string;
};

function SongTime({ value, className }: Props) {
  return (
    <p className={cn('w-16 flex-none', className)}>
      {convertSecondsToTime(Number(value))}
    </p>
  );
}

export default SongTime;
