import { Space } from 'antd';
import { MouseEventHandler } from 'react';
import DeleteButton from './deleteButton';
import UpdateButton from './updateButton';
import ViewButton from './viewButton';

type Props = {
  showView?: boolean;
  showUpdate?: boolean;
  showDelete?: boolean;
  onView?: MouseEventHandler<HTMLElement>;
  onUpdate?: MouseEventHandler<HTMLElement>;
  onDelete?: MouseEventHandler<HTMLElement>;
};

function ActionButton({
  showView = false,
  showUpdate = false,
  showDelete = false,
  onView,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <Space>
      {showView && <ViewButton onClick={onView} />}
      {showUpdate && <UpdateButton onClick={onUpdate} />}
      {showDelete && <DeleteButton onClick={onDelete} />}
    </Space>
  );
}

export default ActionButton;
