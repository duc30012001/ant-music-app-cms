import { useTranslate } from '@/hooks';
import { Button, ButtonProps, Tooltip } from 'antd';
import { FaPen } from 'react-icons/fa';

type Props = {} & ButtonProps;

function UpdateButton({ ...props }: Props) {
  const { messages } = useTranslate();
  return (
    <Tooltip title={messages('common.update')}>
      <Button {...props} type="primary" ghost icon={<FaPen />} />
    </Tooltip>
  );
}

export default UpdateButton;
