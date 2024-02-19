import { ReactNode } from 'react';
import { BiSolidMoviePlay } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa6';
import { GrChannel } from 'react-icons/gr';
import { MdSubscriptions } from 'react-icons/md';

export interface Statistical {
  id: number;
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export const statisticalData: Statistical[] = [
  {
    id: 1,
    title: 'Channels',
    value: '50+',
    icon: <GrChannel />,
    color: '#ffc821',
  },
  {
    id: 2,
    title: 'Views',
    value: '500M',
    icon: <FaEye />,
    color: '#ff7f50',
  },
  {
    id: 3,
    title: 'Subscriptions',
    value: '10M',
    icon: <MdSubscriptions />,
    color: '#ff6348',
  },
  {
    id: 4,
    title: 'Series',
    value: '100+',
    icon: <BiSolidMoviePlay />,
    color: '#ff6b81',
  },
];

export interface Series {
  id: number;
  thumbnail: string;
  title: string;
}

export const seriesData: Series[] = [
  {
    id: 1,
    thumbnail:
      'https://wallpapers.com/images/hd/oggy-and-the-cockroaches-cast-poster-egyajcb1lyvndl39.jpg',
    title: 'Oggy and the Cockroaches',
  },
  {
    id: 2,
    thumbnail:
      'https://e0.pxfuel.com/wallpapers/646/835/desktop-wallpaper-larva-2016-the-best-friends-and-love-very-funny-cartoon.jpg',
    title: 'Larva',
  },
  {
    id: 3,
    thumbnail:
      'https://www.usatoday.com/gcdn/-mm-/8036eea2bfb0a97cde00d9c8bf6204f489dc9522/c=164-230-2707-1667/local/-/media/2017/06/22/USATODAY/USATODAY/636336899799890061-CARS-3-a015-71hcs.sel16.486.jpg',
    title: 'Cars',
  },
  {
    id: 4,
    thumbnail:
      'https://fictionhorizon.com/wp-content/uploads/2021/10/Transformers-watch-order.jpg',
    title: 'Transformers',
  },
  {
    id: 5,
    thumbnail: 'https://i.ytimg.com/vi/dUTGTmpoMV8/maxresdefault.jpg',
    title: 'Fruity Robo',
  },
  {
    id: 6,
    thumbnail:
      'https://wallpapers.com/images/featured/minions-3wxim1i2egqb5my9.jpg',
    title: 'Minions',
  },
];
