import { useTranslate } from '@/hooks';
import { Button, ButtonProps } from 'antd';
import { FaPlus } from 'react-icons/fa';

type Props = {
  canCreate: boolean;
} & ButtonProps;

function CreateButton({ canCreate, ...props }: Props) {
  const { messages } = useTranslate();
  if (!canCreate) return null;
  return (
    <Button
      {...props}
      icon={<FaPlus />}
      type="primary"
      className="flex items-center"
    >
      {messages('common.create')}
    </Button>
  );
}

export default CreateButton;
