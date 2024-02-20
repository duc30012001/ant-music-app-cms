import { AppForm } from '@/components/ui/form';
import AppFormItem from '@/components/ui/form/formItem';
import { ImageUpload } from '@/components/ui/input';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { NAME_LENGTH } from '@/enums';
import { useLoading, useTranslate } from '@/hooks';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useCreateGenre, useGenreDetail, useUpdateGenre } from '../hooks';
import { CreateGenre, GenreData, UpdateGenre } from '../types';

type Props = {
  dataEdit: GenreData | null;
} & Omit<AppModalProps, 'children'>;

function GenreForm({ dataEdit, ...props }: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();
  const [form] = Form.useForm();

  const isUpdate = Boolean(dataEdit?.id);
  const genreId = dataEdit?.id as GenreData['id'];
  const modalTitle = isUpdate
    ? messages('common.update')
    : messages('common.create');

  const { updateGenre } = useUpdateGenre();
  const { createGenre } = useCreateGenre();
  const { dataGenreDetail } = useGenreDetail(genreId);

  function onFinish({ name, thumbnail }: any) {
    const file = thumbnail?.fileList?.[0];
    const originalFile = file?.originFileObj;

    const payload: any = new FormData();

    payload.append('name', name);
    if (originalFile) {
      payload.append('file', originalFile);
    }

    const createVariables: CreateGenre = {
      payload,
      onSuccess,
    };

    const updateVariables: UpdateGenre = {
      payload,
      onSuccess,
      genreId,
    };

    if (isUpdate) {
      return updateGenre(updateVariables);
    }

    return createGenre(createVariables);
  }

  function onSuccess() {
    if (!isUpdate) {
      form.resetFields();
    }
  }

  useEffect(() => {
    const { name } = dataGenreDetail;
    form.setFieldsValue({
      ...dataGenreDetail,
      thumbnail: dataGenreDetail.thumbnail
        ? {
            fileList: [{ url: dataGenreDetail.thumbnail, name }],
          }
        : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataGenreDetail)]);

  return (
    <AppModal
      {...props}
      title={modalTitle}
      footer={null}
      width={600}
      loading={loading}
    >
      <AppForm
        initialValues={{ ...dataEdit }}
        onFinish={onFinish}
        loading={loading}
        form={form}
      >
        <AppFormItem
          label={'Thể loại'}
          rules={[
            {
              whitespace: true,
              max: NAME_LENGTH.MAX,
              min: NAME_LENGTH.MIN,
              required: true,
            },
          ]}
          name="name"
        >
          <Input />
        </AppFormItem>

        <AppFormItem
          label={messages('common.thumbnail')}
          rules={[
            {
              required: true,
              message: messages('validation.file'),
            },
          ]}
          name="thumbnail"
        >
          <ImageUpload />
        </AppFormItem>
      </AppForm>
    </AppModal>
  );
}

export default GenreForm;
