import { PLAYLIST_STATUS } from '@/enums';
import { useTranslate } from '@/hooks';
import { Select, SelectProps } from 'antd';

type Props = {} & SelectProps;

function PlaylistStatusSelect({ ...props }: Props) {
  const { messages } = useTranslate();

  const options = [
    {
      label: messages('status.active'),
      value: PLAYLIST_STATUS.OPEN,
    },
    {
      label: messages('status.block'),
      value: PLAYLIST_STATUS.LOCK,
    },
  ];

  return (
    <Select
      placeholder={messages('status.label')}
      allowClear
      {...props}
      options={options}
    />
  );
}

export default PlaylistStatusSelect;
