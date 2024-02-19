import { useTranslate } from '@/hooks';
import { Button, ButtonProps, Tooltip } from 'antd';
import { FaEye } from 'react-icons/fa';

type Props = {} & ButtonProps;

function ViewButton({ ...props }: Props) {
  const { messages } = useTranslate();
  return (
    <Tooltip title={messages('common.detail')}>
      <Button
        {...props}
        icon={<FaEye />}
        className="!border-green-600 !text-green-600"
      />
    </Tooltip>
  );
}

export default ViewButton;
