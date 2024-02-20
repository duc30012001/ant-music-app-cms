import { AppForm } from '@/components/ui/form';
import AppFormItem from '@/components/ui/form/formItem';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { NAME_LENGTH, PASSWORD_LENGTH } from '@/enums';
import { useAuth, useLoading, useTranslate } from '@/hooks';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useCreateUser, useUpdateUser, useUserDetail } from '../hooks';
import { CreateUser, UpdateUser, UserData } from '../types';
import UserRoleSelect from './userRoleSelect';

type Props = {
  dataEdit: UserData | null;
} & Omit<AppModalProps, 'children'>;

function UserForm({ dataEdit, ...props }: Props) {
  const { messages } = useTranslate();
  const [form] = Form.useForm();
  const {
    role: { isAdmin },
  } = useAuth();

  const isUpdate = Boolean(dataEdit?.id);
  const userId = dataEdit?.id as UserData['id'];
  const modalTitle = isUpdate
    ? messages('common.update')
    : messages('common.create');

  const { updateUser } = useUpdateUser();
  const { createUser } = useCreateUser();
  const { dataUserDetail } = useUserDetail(userId);
  const loading = useLoading();

  function onFinish(values: any) {
    const createVariables: CreateUser = {
      payload: values,
      onSuccess,
    };

    const updateVariables: UpdateUser = {
      payload: values,
      onSuccess,
      userId,
    };

    if (isUpdate) {
      return updateUser(updateVariables);
    }

    return createUser(createVariables);
  }

  function onSuccess() {
    if (!isUpdate) {
      form.resetFields();
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...dataUserDetail,
      role: dataUserDetail?.role?.name?.toLowerCase(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dataUserDetail)]);

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
          label={'Họ tên đệm'}
          rules={[
            {
              whitespace: true,
              max: NAME_LENGTH.MAX,
              min: NAME_LENGTH.MIN,
              required: true,
            },
          ]}
          name="firstName"
        >
          <Input />
        </AppFormItem>

        <AppFormItem
          label={'Tên'}
          rules={[
            {
              whitespace: true,
              max: NAME_LENGTH.MAX,
              min: NAME_LENGTH.MIN,
              required: true,
            },
          ]}
          name="lastName"
        >
          <Input />
        </AppFormItem>

        <AppFormItem
          label={messages('common.email')}
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
          name="email"
        >
          <Input />
        </AppFormItem>

        <AppFormItem
          label={messages('common.role')}
          rules={[
            {
              required: true,
            },
          ]}
          name="role"
          hidden={!isAdmin}
        >
          <UserRoleSelect />
        </AppFormItem>

        <AppFormItem
          label={messages('common.newPassword')}
          rules={[
            {
              required: !isUpdate,
              max: PASSWORD_LENGTH.MAX,
              min: PASSWORD_LENGTH.MIN,
              whitespace: true,
            },
          ]}
          // hidden={isUpdate}
          name="password"
        >
          <Input.Password />
        </AppFormItem>

        <AppFormItem
          label={messages('common.retypePassword')}
          rules={[
            {
              required: !isUpdate,
              max: PASSWORD_LENGTH.MAX,
              min: PASSWORD_LENGTH.MIN,
              whitespace: true,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(messages('validation.passwordMisMatch'));
              },
            }),
          ]}
          // hidden={isUpdate}
          name="confirmPassword"
        >
          <Input.Password />
        </AppFormItem>
      </AppForm>
    </AppModal>
  );
}

export default UserForm;
