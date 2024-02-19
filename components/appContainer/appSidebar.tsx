import { Drawer, DrawerProps } from 'antd';
import { ReactNode } from 'react';

type Props = {
  sidebarContent: ReactNode;
  appTitle?: ReactNode;
} & Pick<DrawerProps, 'open' | 'onClose'>;

function AppSidebar({ sidebarContent, open, onClose, appTitle }: Props) {
  return (
    <>
      <div className="hidden w-72 flex-none overflow-hidden rounded-2xl bg-white px-5 py-3 lg:block">
        {sidebarContent}
      </div>
      <Drawer open={open} onClose={onClose} title={appTitle}>
        {sidebarContent}
      </Drawer>
    </>
  );
}

export default AppSidebar;
