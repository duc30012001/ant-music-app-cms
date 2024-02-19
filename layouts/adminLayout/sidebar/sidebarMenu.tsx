import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Route, adminRoutes } from '../routes';

type Props = {};

type MenuItem = Required<MenuProps>['items'][number];

function SidebarMenu({}: Props) {
  const pathname = usePathname();
  // const { messages } = useTranslate();
  //   const {
  //     role: { isAdmin },
  //   } = useAuth();

  //   const { dataPermissionObject } = useUserFeature();

  function getChildrenRoutes(children: Route[]) {
    return children;
    // if (isAdmin) return children;

    // const result = children.filter(
    //   (item) => dataPermissionObject[item.href]?.view === true
    // );
    // return result;
  }

  const items = adminRoutes.map((item) => {
    const parentItem: MenuItem = {
      key: item.href,
      label: (
        <Link href={item.href} className="font-medium">
          {item.label}
        </Link>
      ),
      icon: <i className="!text-xl">{item.icon}</i>,
      //   children: getChildrenRoutes(item.children).map((child) => ({
      //     key: child.href,
      //     label: (
      //       <Link href={child.href} className="font-medium">
      //         {messages(child.label)}
      //       </Link>
      //     ),
      //     icon: child.icon,
      //   })),
    };

    return parentItem;
  });

  return <Menu items={items} mode="inline" selectedKeys={[pathname]} />;
}

export default SidebarMenu;
