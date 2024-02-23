import { AppForm } from '@/components/ui/form';
import AppFormItem from '@/components/ui/form/formItem';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { FILE_TYPE } from '@/enums';
import { useLoading, useTranslate } from '@/hooks';
import { Form, Input, Radio } from 'antd';
import { useEffect } from 'react';
import {
  useCreateFileType,
  useFileTypeDetail,
  useUpdateFileType,
} from '../hooks';
import { CreateFileType, FileTypeData, UpdateFileType } from '../types';

type Props = {
  dataEdit: FileTypeData | null;
} & Omit<AppModalProps, 'children'>;

function FileTypeForm({ dataEdit, ...props }: Props) {
  const { messages } = useTranslate();
  const loading = useLoading();
  const [form] = Form.useForm();

  const isUpdate = Boolean(dataEdit?.id);
  const fileTypeId = dataEdit?.id as FileTypeData['id'];
  const modalTitle = isUpdate
    ? messages('common.update')
    : messages('common.create');

  const { updateFileType } = useUpdateFileType();
  const { createFileType } = useCreateFileType();
  const { dataFileTypeDetail } = useFileTypeDetail(fileTypeId);

  function onFinish(values: any) {
    const createVariables: CreateFileType = {
      payload: values,
      onSuccess,
    };

    const updateVariables: UpdateFileType = {
      payload: values,
      onSuccess,
      fileTypeId,
    };

    if (isUpdate) {
      return updateFileType(updateVariables);
    }

    return createFileType(createVariables);
  }

  function onSuccess() {
    if (!isUpdate) {
      form.resetFields();
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...dataFileTypeDetail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataFileTypeDetail)]);

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
          label={'Loại file'}
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
          label={'Trả phí'}
          rules={[
            {
              required: true,
              message: messages('validation.select'),
            },
          ]}
          name="pay"
        >
          <Radio.Group>
            <Radio value={FILE_TYPE.FREE}>Miễn phí</Radio>
            <Radio value={FILE_TYPE.PREMIUM}>Có phí</Radio>
          </Radio.Group>
        </AppFormItem>
      </AppForm>
    </AppModal>
  );
}

export default FileTypeForm;
