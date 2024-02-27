import { AppForm } from '@/components/ui/antdForm';
import { AppFormItem } from '@/components/ui/form';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { Input } from 'antd';
import { SongData } from '../types';

type Props = {
  dataEdit: SongData | null;
} & Omit<AppModalProps, 'children'>;

function AddSongToPlaylist({ dataEdit, ...props }: Props) {
  const songName = dataEdit?.name;
  const { onCancel } = props;

  const onFinish = (e: any) => {
    onCancel?.(e);
  };
  return (
    <AppModal
      {...props}
      footer={null}
      title={`Thêm ${songName} vào danh sách phát`}
    >
      <AppForm layout="vertical" onFinish={onFinish}>
        <AppFormItem
          label="Tên danh sách (Tiếng Việt)"
          required
          name={'name_vi'}
        >
          <Input />
        </AppFormItem>
        <AppFormItem
          label="Tên danh sách (Tiếng Anh)"
          required
          name={'name_en'}
        >
          <Input />
        </AppFormItem>
      </AppForm>
    </AppModal>
  );
}

export default AddSongToPlaylist;
