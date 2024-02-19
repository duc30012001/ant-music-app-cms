import { ReactNode } from 'react';
import AppModal, { AppModalProps } from './normalModal';

export type AppConfirmProps = {
  typeDelete?: boolean;
  paragraph: ReactNode;
  modalTitle: ReactNode;
} & Omit<AppModalProps, 'children'>;

const AppConfirm = ({
  open,
  onOk,
  onCancel,
  paragraph = '',
  typeDelete = true,
  modalTitle,
  ...props
}: AppConfirmProps) => {
  return (
    <AppModal
      {...props}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      title={modalTitle}
      okButtonProps={{
        danger: typeDelete,
        ghost: typeDelete,
      }}
      cancelButtonProps={{
        type: !typeDelete ? 'default' : 'primary',
        ghost: true,
      }}
    >
      {paragraph}
    </AppModal>
  );
};

export default AppConfirm;
