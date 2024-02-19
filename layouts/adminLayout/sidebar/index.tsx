import { Layout, SiderProps } from 'antd';
import SidebarMenu from './sidebarMenu';

type Props = {} & SiderProps;

const { Sider } = Layout;

function Sidebar({ ...props }: Props) {
  return (
    <Sider
      collapsible
      width={280}
      collapsedWidth="0"
      theme="light"
      breakpoint="xxl"
      {...props}
    >
      <div className="my-2 h-[calc(100vh-5rem)] overflow-auto pb-6">
        <SidebarMenu />
      </div>
    </Sider>
  );
}

export default Sidebar;
