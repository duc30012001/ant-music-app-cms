import { ROLE } from '@/enums';
import { useAuth, useTranslate } from '@/hooks';
import { Select, SelectProps } from 'antd';

type Props = {} & SelectProps;

function UserRoleSelect({ ...props }: Props) {
  const { messages } = useTranslate();
  const {
    role: { isAdmin },
  } = useAuth();

  const options = [
    {
      label: messages('user.user'),
      value: ROLE.USER,
    },
  ];

  if (isAdmin) {
    options.push({
      label: messages('user.admin'),
      value: ROLE.ADMIN,
    });
  }

  return (
    <Select
      allowClear
      placeholder={messages('common.role')}
      {...props}
      options={options}
    />
  );
}

export default UserRoleSelect;
