import { ADMIN_ROUTES } from '@/enums';
import { ReactNode } from 'react';
import { TbMusicBolt, TbIcons, TbUsers } from 'react-icons/tb';

export interface Route {
  id: number | string;
  label: string;
  href: ADMIN_ROUTES;
  icon: ReactNode;
  title: string;
}

export const adminRoutes: Route[] = [
  {
    id: '10',
    label: 'Thể loại',
    href: ADMIN_ROUTES.GENRE,
    icon: <TbMusicBolt />,
    title: 'Genre',
  },
  {
    id: '11',
    label: 'Chủ đề',
    href: ADMIN_ROUTES.THEME,
    icon: <TbIcons />,
    title: 'Theme',
  },
  {
    id: '1',
    label: 'Người dùng',
    href: ADMIN_ROUTES.USER,
    icon: <TbUsers />,
    title: 'User',
  },
];
