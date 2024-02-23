import { FORM_LAYOUT, FORM_LAYOUT_VERTICAL } from '@/constants';
import { cn } from '@/helpers';
import { useTranslate } from '@/hooks';
import { Button, ButtonProps, Form, FormProps } from 'antd';
import { ReactNode } from 'react';

export type AppFormProps = {
  children: ReactNode;
  submitText?: ReactNode;
  showSubmit?: boolean;
  submitProps?: ButtonProps;
} & Omit<FormProps, 'name'>;

function AppForm({
  children,
  submitText,
  showSubmit = true,
  submitProps,
  ...props
}: AppFormProps) {
  const { messages } = useTranslate();
  const formLayout =
    props.layout === 'vertical' ? FORM_LAYOUT_VERTICAL : FORM_LAYOUT;
  return (
    <Form {...formLayout} {...props}>
      {children}
      <div
        className={cn('text-right', {
          hidden: !showSubmit,
        })}
      >
        <Button type="primary" {...submitProps} htmlType="submit">
          {submitText ?? messages('common.submit')}
        </Button>
      </div>
    </Form>
  );
}

export default AppForm;
