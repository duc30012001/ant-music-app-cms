import { AppLogoWithText } from '@/components/appLogo';
import { Drawer } from 'antd';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Menu from './menu';

type Props = {
  className?: string;
};

function NavbarMobile({ className }: Props) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={className}>
      <i onClick={showDrawer} className="text-2xl">
        <FaBars />
      </i>
      <Drawer
        title={<AppLogoWithText />}
        placement="right"
        onClose={onClose}
        open={open}
        destroyOnClose
      >
        <ul className="flex flex-col">
          <Menu />
        </ul>
      </Drawer>
    </div>
  );
}

export default NavbarMobile;
