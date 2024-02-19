import { cn } from '@/helpers';
import { Button, ButtonProps } from 'antd';
import AppModal, { AppModalProps } from './normalModal';

export type FullScreenModalProps = {
  actionProps?: ButtonProps;
  actionContent?: ButtonProps['children'];
  showAction?: boolean;
} & AppModalProps;

function FullScreenModal({
  children,
  className,
  title,
  actionProps,
  actionContent,
  showAction,

  ...props
}: FullScreenModalProps) {
  return (
    <AppModal
      {...props}
      className={cn('full-screen-modal', className)}
      title={
        <div className="mr-10 flex min-h-[2rem] items-center gap-2">
          <div className="grow">{title}</div>
          <div
            className={cn('hidden', {
              block: showAction,
            })}
          >
            <Button type="primary" {...actionProps}>
              {actionContent}
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </AppModal>
  );
}

export default FullScreenModal;
