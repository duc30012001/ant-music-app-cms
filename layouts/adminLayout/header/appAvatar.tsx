import { useAuth, useTranslate } from '@/hooks';
import { Avatar, Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { MdLogout } from 'react-icons/md';

type Props = {};

function AppAvatar({}: Props) {
  const { profile, logout } = useAuth();
  const { messages } = useTranslate();

  // const avatarPlaceholder = profile?.name?.[0]?.toUpperCase() ?? 'U';
  const avatarPlaceholder = 'U';

  const items: ItemType[] = [
    {
      label: (
        <div className="flex max-w-xs items-center text-base">
          <Avatar size={40} className="flex-none cursor-pointer !bg-primary">
            {avatarPlaceholder}
          </Avatar>
          <div className="ml-3 truncate">
            {/* <p className="truncate">{profile.name}</p> */}
            <p className="truncate">{profile?.email}</p>
          </div>
        </div>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div className="flex items-center gap-2 pl-2 text-base text-red-600">
          {' '}
          <MdLogout />
          {messages('userProfile.logout')}
        </div>
      ),
      key: '3',
    },
  ];

  function onClick({ key }: { key: string }) {
    if (key === '3') {
      logout();
    }
  }
  return (
    <Dropdown trigger={['click']} menu={{ items, onClick }}>
      <Avatar size={40} className="ml-2 cursor-pointer !bg-primary">
        {avatarPlaceholder}
      </Avatar>
    </Dropdown>
  );
}

export default AppAvatar;
