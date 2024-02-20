import { cn } from '@/helpers';
import { Select, SelectProps } from 'antd';
import { useGenreList } from '../hooks';

interface Props extends SelectProps {}

function GenreSelect({ className, ...props }: Props) {
  const { dataGenre } = useGenreList({});
  const options = dataGenre.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Select
      className={cn('w-full', className)}
      placeholder={'Chọn thể loại'}
      {...props}
      options={options}
      filterOption={(input, option) =>
        ((option?.label as string) ?? '')
          .toLowerCase()
          .includes((input ?? '').toLowerCase())
      }
    />
  );
}

export default GenreSelect;
