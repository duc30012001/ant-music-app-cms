import { ADMIN_ROUTES } from '@/enums';
import { ReactNode } from 'react';
import { TbFileMusic, TbIcons, TbMusic, TbMusicBolt, TbUsers ,TbListDetails} from 'react-icons/tb';

export interface Route {
  id: number | string;
  label: string;
  href: ADMIN_ROUTES;
  icon: ReactNode;
  title: string;
}

export const adminRoutes: Route[] = [
  {
    id: '2',
    label: 'Bài hát',
    href: ADMIN_ROUTES.SONG,
    icon: <TbMusic />,
    title: 'Song',
  },
  {
    id: '3',
    label: 'Danh sách phát',
    href: ADMIN_ROUTES.PLAY_LIST,
    icon: <TbListDetails />,
    title: 'Playlist',
  },
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
    id: '12',
    label: 'Loại file',
    href: ADMIN_ROUTES.FILE_TYPE,
    icon: <TbFileMusic />,
    title: 'File Type',
  },
  {
    id: '1',
    label: 'Người dùng',
    href: ADMIN_ROUTES.USER,
    icon: <TbUsers />,
    title: 'User',
  },
];
