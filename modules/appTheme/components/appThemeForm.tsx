import { AppForm } from '@/components/ui/form';
import AppFormItem from '@/components/ui/form/formItem';
import { ColorPicker, ImageUpload } from '@/components/ui/input';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { uploadFileToBucket } from '@/components/ui/textEditor/api';
import { useActive, useTranslate } from '@/hooks';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import {
  useAppThemeDetail,
  useCreateAppTheme,
  useUpdateAppTheme,
} from '../hooks';
import { AppThemeData, CreateAppTheme, UpdateAppTheme } from '../types';

type Props = {
  dataEdit: AppThemeData | null;
} & Omit<AppModalProps, 'children'>;

function AppThemeForm({ dataEdit, ...props }: Props) {
  const { messages } = useTranslate();
  const { active, isActive, inActive } = useActive();
  const [form] = Form.useForm();

  const isUpdate = Boolean(dataEdit?.id);
  const appThemeId = dataEdit?.id as AppThemeData['id'];
  const modalTitle = isUpdate
    ? messages('common.update')
    : messages('common.create');

  const { updateAppTheme } = useUpdateAppTheme();
  const { createAppTheme } = useCreateAppTheme();
  const { dataAppThemeDetail } = useAppThemeDetail(appThemeId);

  async function onFinish(values: any) {
    active();
    const thumbnailFile = values.thumbnail?.fileList?.[0];
    const originalThumbnailFile = thumbnailFile?.originFileObj;
    let imageUrl: string | undefined = thumbnailFile?.url;

    if (originalThumbnailFile) {
      imageUrl = await uploadFileToBucket(originalThumbnailFile);
    }

    const payload: any = {
      ...values,
      thumbnail: imageUrl,
    };

    const createVariables: CreateAppTheme = {
      payload,
      onSuccess,
      onError: inActive,
    };

    const updateVariables: UpdateAppTheme = {
      appThemeId,
      payload,
      onSuccess,
      onError: inActive,
    };

    if (isUpdate) {
      return updateAppTheme(updateVariables);
    }

    return createAppTheme(createVariables);
  }

  function onSuccess() {
    inActive();
    if (!isUpdate) {
      form.resetFields();
    }
  }

  useEffect(() => {
    const { name } = dataAppThemeDetail;
    form.setFieldsValue({
      ...dataAppThemeDetail,
      thumbnail: dataAppThemeDetail.thumbnail
        ? {
            fileList: [{ url: dataAppThemeDetail.thumbnail, name }],
          }
        : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataAppThemeDetail)]);

  return (
    <AppModal
      {...props}
      title={modalTitle}
      footer={null}
      width={800}
      loading={isActive}
    >
      <AppForm
        initialValues={{ ...dataEdit }}
        onFinish={onFinish}
        form={form}
        loading={isActive}
      >
        <AppFormItem
          label={'Tên chủ đề (Tiếng Việt)'}
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
          label={'Tên chủ đề (Tiếng Anh)'}
          rules={[
            {
              whitespace: true,
              required: true,
            },
          ]}
          name="nameEn"
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

        <AppFormItem
          label="Màu chủ đạo"
          rules={[
            {
              required: true,
              message: messages('validation.select'),
            },
          ]}
          name="color"
        >
          <ColorPicker />
        </AppFormItem>

        <AppFormItem
          label="Màu nền"
          rules={[
            {
              required: true,
              message: messages('validation.select'),
            },
          ]}
          name="color1"
        >
          <ColorPicker />
        </AppFormItem>

        <AppFormItem
          label="Màu chữ"
          rules={[
            {
              required: true,
              message: messages('validation.select'),
            },
          ]}
          name="color2"
        >
          <ColorPicker />
        </AppFormItem>

        <AppFormItem
          label="Màu viền"
          rules={[
            {
              required: true,
              message: messages('validation.select'),
            },
          ]}
          name="color3"
        >
          <ColorPicker />
        </AppFormItem>
      </AppForm>
    </AppModal>
  );
}

export default AppThemeForm;
