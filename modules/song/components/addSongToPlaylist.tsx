import { AppForm } from '@/components/ui/antdForm';
import { AppFormItem } from '@/components/ui/form';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { PLAYLIST_STATUS } from '@/enums';
import { useCreatePlaylist, usePlaylistList } from '@/modules/playlist/hooks';
import { Input } from 'antd';
import { SongData } from '../types';

type Props = {
  dataEdit: SongData | null;
} & Omit<AppModalProps, 'children'>;

function AddSongToPlaylist({ dataEdit, ...props }: Props) {
  const songName = dataEdit?.name;
  const { onCancel } = props;

  const { createPlaylist } = useCreatePlaylist();

  const onFinish = (values: any) => {
    const data = {
      ...values,
      status: PLAYLIST_STATUS.OPEN,
      songId: [dataEdit?.id],
    };

    createPlaylist({
      payload: data,
      // @ts-ignore
      onSuccess: onCancel,
    });
    console.log('data:', data);
  };

  const { dataPlaylist } = usePlaylistList({});
  console.log('dataPlaylist:', dataPlaylist);
  return (
    <AppModal
      {...props}
      footer={null}
      title={`Thêm ${songName} vào danh sách phát`}
    >
      <AppForm layout="vertical" onFinish={onFinish}>
        <AppFormItem
          label="Tên danh sách (Tiếng Việt)"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên danh sách',
            },
          ]}
          name={'name'}
        >
          <Input />
        </AppFormItem>
        <AppFormItem
          label="Tên danh sách (Tiếng Anh)"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên danh sách',
            },
          ]}
          name={'nameEn'}
        >
          <Input />
        </AppFormItem>
      </AppForm>
    </AppModal>
  );
}

export default AddSongToPlaylist;
