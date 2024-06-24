import { AppForm } from '@/components/ui/antdForm';
import { AppFormItem } from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/input';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { uploadFileToBucket } from '@/components/ui/textEditor/api';
import { PLAYLIST_STATUS } from '@/enums';
import { useActive, useTranslate } from '@/hooks';
import { Col, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import {
  useCreatePlaylist,
  usePlaylistDetail,
  useUpdatePlaylist,
} from '../hooks';
import { PlaylistData } from '../types';
import TransferTable from './transferTable';

type Props = {
  dataEdit: PlaylistData | null;
} & Omit<AppModalProps, 'children'>;

function PlaylistForm({ dataEdit, ...props }: Props) {
  const { messages } = useTranslate();
  const [form] = Form.useForm();
  const { active, isActive, inActive } = useActive();
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const { dataPlaylistDetail } = usePlaylistDetail(dataEdit?.playList_id);
  const { createPlaylist } = useCreatePlaylist();
  const { updatePlaylist } = useUpdatePlaylist();

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys);
  };

  const onFinish = async (values: any) => {
    active();
    const thumbnailFile = values.thumbnail?.fileList?.[0];
    const originalThumbnailFile = thumbnailFile?.originFileObj;
    let imageUrl: string | undefined = thumbnailFile?.url;

    if (originalThumbnailFile) {
      imageUrl = await uploadFileToBucket(originalThumbnailFile);
    }

    const payload: any = {
      ...values,
      songId: targetKeys.map((item) => Number(item)),
      thumbnail: imageUrl,
      status: dataPlaylistDetail.status?.name ?? PLAYLIST_STATUS.OPEN,
    };

    if (dataPlaylistDetail.id) {
      updatePlaylist({
        playlistId: dataPlaylistDetail.id,
        payload,
        onSuccess: inActive,
        onError: inActive,
      });
    } else {
      createPlaylist({
        payload,
        onSuccess: onCreateSuccess,
        onError: inActive,
      });
    }
  };

  const onCreateSuccess = () => {
    inActive();
    setTargetKeys([]);
    form.resetFields();
  };

  useEffect(() => {
    if (dataPlaylistDetail.id) {
      const { songPlaylist, name, nameEn, thumbnail, id } = dataPlaylistDetail;
      const key = songPlaylist?.map((item) => item.songId.toString()) ?? [];
      setTargetKeys(key);

      const initialValue = {
        name: name,
        nameEn: nameEn,
        thumbnail: thumbnail
          ? {
              fileList: [{ url: thumbnail, name, uuid: id }],
            }
          : undefined,
      };

      form.setFieldsValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataPlaylistDetail)]);
  return (
    <AppModal
      {...props}
      title={
        dataEdit?.playList_id
          ? messages('common.update')
          : messages('common.create')
      }
      footer={null}
      width={1800}
      loading={isActive}
      className="top-10"
    >
      <AppForm
        form={form}
        submitProps={{
          loading: isActive,
        }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={30}>
          <Col xs={24} lg={8} xxl={6}>
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
          </Col>
          <Col xs={24} lg={16} xxl={18}>
            <AppFormItem label={'Bài hát'}>
              <TransferTable targetKeys={targetKeys} onChange={onChange} />
            </AppFormItem>
          </Col>
        </Row>
      </AppForm>
    </AppModal>
  );
}

export default PlaylistForm;
