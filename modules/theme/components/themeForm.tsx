import { AppForm } from '@/components/ui/form';
import AppFormItem from '@/components/ui/form/formItem';
import { ImageUpload } from '@/components/ui/input';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { useLoading, useTranslate } from '@/hooks';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useCreateTheme, useThemeDetail, useUpdateTheme } from '../hooks';
import { CreateTheme, ThemeData, UpdateTheme } from '../types';

type Props = {
  dataEdit: ThemeData | null;
} & Omit<AppModalProps, 'children'>;

function ThemeForm({ dataEdit, ...props }: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();
  const [form] = Form.useForm();

  const isUpdate = Boolean(dataEdit?.id);
  const themeId = dataEdit?.id as ThemeData['id'];
  const modalTitle = isUpdate
    ? messages('common.update')
    : messages('common.create');

  const { updateTheme } = useUpdateTheme();
  const { createTheme } = useCreateTheme();
  const { dataThemeDetail } = useThemeDetail(themeId);

  function onFinish({ name, thumbnail }: any) {
    const file = thumbnail?.fileList?.[0];
    const originalFile = file?.originFileObj;

    const payload: any = new FormData();

    payload.append('name', name);
    if (originalFile) {
      payload.append('file', originalFile);
    }

    const createVariables: CreateTheme = {
      payload,
      onSuccess,
    };

    const updateVariables: UpdateTheme = {
      payload,
      onSuccess,
      themeId,
    };

    if (isUpdate) {
      return updateTheme(updateVariables);
    }

    return createTheme(createVariables);
  }

  function onSuccess() {
    if (!isUpdate) {
      form.resetFields();
    }
  }

  useEffect(() => {
    const { name } = dataThemeDetail;
    form.setFieldsValue({
      ...dataThemeDetail,
      thumbnail: dataThemeDetail.thumbnail
        ? {
            fileList: [{ url: dataThemeDetail.thumbnail, name }],
          }
        : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataThemeDetail)]);

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
          label={'Chủ đề'}
          rules={[
            {
              whitespace: true,
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

export default ThemeForm;
