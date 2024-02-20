import { AppModal, AppModalProps } from '@/components/ui/modal';
import { handleGetErrorMessage, showNotification } from '@/helpers';
import { useActive, useTranslate } from '@/hooks';
import { GenreSelect } from '@/modules/genre/components';
import { ThemeSelect } from '@/modules/theme/components';
import { Button, Divider, Input } from 'antd';
import { useRef, useState } from 'react';
import { songApi } from '../api';
import { SongDetailExists } from '../types';

type Props = {} & Omit<AppModalProps, 'children'>;

function CreateSong({ ...props }: Props) {
  const songSlug = useRef<string | undefined>();
  const { messages } = useTranslate();
  const { active, isActive, inActive } = useActive();

  const [songData, setSongData] = useState<SongDetailExists | {}>({});
  console.log('songData:', songData);

  const onGetInfoSong = async () => {
    const value = songSlug.current;
    if (!value) {
      showNotification('error', 'Vui lòng nhập link bài hát');
      return;
    }
    active();
    songApi
      .getExistDetail(value)
      .then((response) => {
        const data = response.data.docs.result;
        setSongData(data);
      })
      .catch((error) => {
        const message = handleGetErrorMessage(error);
        showNotification('error', message);
      })
      .finally(() => {
        inActive();
      });
  };

  return (
    <AppModal
      {...props}
      title={messages('common.create')}
      footer={null}
      width={1200}
      loading={isActive}
      className="top-10"
    >
      <div>
        <div className="flex items-center gap-2 font-medium">
          <label htmlFor="songSlug" className="flex-none">
            Link bài hát
          </label>
          <Input
            name="songSlug"
            onChange={(e) => (songSlug.current = e.target.value)}
          />
          <Button type="primary" onClick={onGetInfoSong} loading={isActive}>
            Lấy thông tin
          </Button>
        </div>
      </div>
      <Divider />
      <div>
        Form
        <ThemeSelect mode="multiple" />
        <GenreSelect mode="multiple" />
      </div>
    </AppModal>
  );
}

export default CreateSong;
