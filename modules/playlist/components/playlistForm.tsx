import {
  AppForm,
  FormMultiLangCol,
  FormMultiLangRow,
} from '@/components/ui/antdForm';
import { AppFormItem } from '@/components/ui/form';
import { AppModal, AppModalProps } from '@/components/ui/modal';
import { useActive, useTranslate } from '@/hooks';
import { Form, Input } from 'antd';
import { PlaylistData } from '../types';

type Props = {
  dataEdit: PlaylistData | null;
} & Omit<AppModalProps, 'children'>;

function PlaylistForm({ dataEdit, ...props }: Props) {
  const { messages } = useTranslate();
  const [form] = Form.useForm();
  const { active, isActive, inActive } = useActive();
  return (
    <AppModal
      {...props}
      title={
        dataEdit?.playList_id
          ? messages('common.update')
          : messages('common.create')
      }
      footer={null}
      width={1200}
      loading={isActive}
      className="top-10"
    >
      <AppForm
        form={form}
        submitProps={{
          loading: isActive,
        }}
        layout="vertical"
      >
        <FormMultiLangRow>
          <FormMultiLangCol>
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
          </FormMultiLangCol>
          <FormMultiLangCol>
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
          </FormMultiLangCol>
        </FormMultiLangRow>
      </AppForm>
    </AppModal>
  );
}

export default PlaylistForm;
