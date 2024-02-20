import { cn } from '@/helpers';
import { Select, SelectProps } from 'antd';
import { useThemeList } from '../hooks';

interface Props extends SelectProps {}

function ThemeSelect({ className, ...props }: Props) {
  const { dataTheme } = useThemeList({});
  const options = dataTheme.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Select
      className={cn('w-full', className)}
      placeholder={'Chọn chủ đề'}
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

export default ThemeSelect;
