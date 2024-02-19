import bibi from '@/assets/platforms/bibi.webp';
import cn from '@/assets/platforms/cn.svg';
import disney from '@/assets/platforms/disney.svg';
import epidemic from '@/assets/platforms/epidemic.svg';
import facebook from '@/assets/platforms/facebook.svg';
import netflix from '@/assets/platforms/netflix.svg';
import pixar from '@/assets/platforms/pixar.svg';
import tiktok from '@/assets/platforms/tiktok.svg';
import vtv from '@/assets/platforms/vtv.svg';
import warner from '@/assets/platforms/warner.svg';
import xilam from '@/assets/platforms/xilam.png';
import youtube from '@/assets/platforms/youtube.svg';

export interface IPartner {
  id: number;
  logo: string;
}

export const partners: IPartner[] = [
  {
    id: 1,
    logo: youtube,
  },
  {
    id: 11,
    logo: pixar,
  },
  {
    id: 12,
    logo: xilam,
  },
  {
    id: 9,
    logo: netflix,
  },
  {
    id: 6,
    logo: cn,
  },
  {
    id: 7,
    logo: disney,
  },
  {
    id: 3,
    logo: facebook,
  },
  {
    id: 4,
    logo: bibi,
  },
  {
    id: 5,
    logo: vtv,
  },
  {
    id: 2,
    logo: epidemic,
  },
  {
    id: 8,
    logo: warner,
  },
  {
    id: 10,
    logo: tiktok,
  },
];
