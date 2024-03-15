import { AppForm, FormDivider } from '@/components/ui/antdForm';
import { AppFormItem } from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/input';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { uploadFileToBucket } from '@/components/ui/textEditor/api';
import { PLAYLIST_STATUS } from '@/enums';
import { useActive, useTranslate } from '@/hooks';
import {
  useAddSongToPlaylist,
  useCreatePlaylist,
  usePlaylistBySong,
  useRemoveSongFromPlaylist,
} from '@/modules/playlist/hooks';
import { PlaylistDetailData } from '@/modules/playlist/types';
import { Checkbox, Input } from 'antd';
import { SongData } from '../types';

type Props = {
  dataEdit: SongData | null;
} & Omit<AppModalProps, 'children'>;

function AddSongToPlaylist({ dataEdit, ...props }: Props) {
  const { active, isActive, inActive } = useActive();
  const { messages } = useTranslate();
  const songName = dataEdit?.name;
  const { onCancel } = props;

  const { dataPlaylist } = usePlaylistBySong(dataEdit?.id);
  const { createPlaylist } = useCreatePlaylist();
  const { addSongToPlaylist } = useAddSongToPlaylist();
  const { removeSongFromPlaylist } = useRemoveSongFromPlaylist();

  const onFinish = async (values: any) => {
    active();
    const thumbnailFile = values.thumbnail?.fileList?.[0];
    const originalThumbnailFile = thumbnailFile?.originFileObj;
    let imageUrl: string | undefined = thumbnailFile?.url;

    if (originalThumbnailFile) {
      imageUrl = await uploadFileToBucket(originalThumbnailFile);
    }

    const data = {
      ...values,
      status: PLAYLIST_STATUS.OPEN,
      songId: [dataEdit?.id],
      thumbnail: imageUrl,
    };

    createPlaylist({
      payload: data,
      onSuccess,
      onError: inActive,
    });
  };

  const onSuccess = () => {
    inActive();
    // @ts-ignore
    onCancel();
  };

  const onChange = (checked: boolean, id: PlaylistDetailData['id']) => {
    const songId = dataEdit?.id as SongData['id'];

    if (checked) {
      addSongToPlaylist({
        payload: {
          songId: songId,
          playlistId: id,
        },
      });
    } else {
      removeSongFromPlaylist({
        playlistId: id,
        payload: {
          songId: [songId],
        },
      });
    }
  };

  return (
    <AppModal
      {...props}
      footer={null}
      title={`Thêm ${songName} vào danh sách phát`}
    >
      <div>
        <div className="grid gap-2">
          {dataPlaylist.map((item) => {
            const { id, name, nameEn, exist } = item;
            return (
              <Checkbox
                value={id}
                key={id}
                checked={exist}
                onChange={(e) => onChange(e.target.checked, id)}
              >
                {name} ({nameEn})
              </Checkbox>
            );
          })}
        </div>
        <FormDivider />
        <AppForm
          layout="vertical"
          onFinish={onFinish}
          submitText={messages('common.create')}
          submitProps={{
            loading: isActive,
          }}
        >
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

          <AppFormItem
            label={messages('common.thumbnail')}
            name="thumbnail"
            rules={[
              {
                required: true,
                message: messages('validation.file'),
              },
            ]}
          >
            <ImageUpload />
          </AppFormItem>
        </AppForm>
      </div>
    </AppModal>
  );
}

export default AddSongToPlaylist;
