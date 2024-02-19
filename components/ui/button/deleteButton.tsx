import { useTranslate } from '@/hooks';
import { Button, ButtonProps, Tooltip } from 'antd';
import { FaTrash } from 'react-icons/fa';

type Props = {} & ButtonProps;

function DeleteButton({ ...props }: Props) {
  const { messages } = useTranslate();
  return (
    <Tooltip title={messages('common.delete')}>
      <Button {...props} icon={<FaTrash />} danger />
    </Tooltip>
  );
}

export default DeleteButton;
