import { ButtonIcon } from '@/components/appContainer';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import AppAvatar from './appAvatar';
import Logo from './appLogo';

type Props = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const { Header: AntdHeader } = Layout;

function Header({ collapsed, toggleCollapsed }: Props) {
  return (
    <AntdHeader className="flex items-center justify-between border-b !bg-white !px-5 shadow-md">
      <div className="flex items-center gap-5">
        <Logo />
        <ButtonIcon
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed}
        />
      </div>
      <div className="flex items-center justify-end gap-5">
        {/* <LocaleSelect /> */}
        <AppAvatar />
      </div>
    </AntdHeader>
  );
}

export default Header;
