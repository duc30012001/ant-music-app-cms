import { cn } from '@/helpers';
import { Form, FormItemProps } from 'antd';
import { ReactNode } from 'react';

type AppFormItemProps = {
  children: ReactNode;
} & FormItemProps;

function AppFormItem({ children, className, ...props }: AppFormItemProps) {
  return (
    <Form.Item {...props} className={cn('app-form-item !mb-3', className)}>
      {children}
    </Form.Item>
  );
}

export default AppFormItem;
