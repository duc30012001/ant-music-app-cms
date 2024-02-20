import { cn } from '@/helpers';
import { Select, SelectProps } from 'antd';
import { useFileTypeList } from '../hooks';

interface Props extends SelectProps {}

function FileTypeSelect({ className, ...props }: Props) {
  const { dataFileType } = useFileTypeList({});
  const options = dataFileType.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Select
      className={cn('w-full', className)}
      placeholder={'Chọn loại file'}
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

export default FileTypeSelect;
