import { EMAIL_URL } from '@/constants';
import { PUBLIC_ROUTES } from '@/enums';
import { ReactNode } from 'react';

const email = process.env.EMAIL;

export type publicRoutesType = {
  id: number | string;
  label: ReactNode;
  href: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
};

export const publicRoutes: publicRoutesType[] = [
  {
    id: 1,
    label: 'About Us',
    href: PUBLIC_ROUTES.ABOUT_US,
  },
  {
    id: 2,
    label: 'Products',
    href: PUBLIC_ROUTES.PRODUCTS,
  },
  {
    id: 3,
    label: 'Videos',
    href: PUBLIC_ROUTES.VIDEOS,
  },
];

export type footerRoutesType = {
  id: number | string;
  label: ReactNode;
  children: publicRoutesType[];
};

export const footerRoutes: footerRoutesType[] = [
  {
    id: 1,
    label: 'Get Started',
    children: [
      {
        id: '1-1',
        label: 'About us',
        href: PUBLIC_ROUTES.ABOUT_US,
      },
      {
        id: '1-4',
        label: 'Products',
        href: PUBLIC_ROUTES.PRODUCTS,
      },
      {
        id: '1-2',
        label: 'Videos',
        href: PUBLIC_ROUTES.VIDEOS,
      },
      {
        id: '1-3',
        label: 'Contact Us',
        href: PUBLIC_ROUTES.CONTACT,
      },
    ],
  },
  {
    id: 2,
    label: 'Support',
    children: [
      {
        id: '2-1',
        label: 'Email: ' + email,
        href: EMAIL_URL,
        target: '_blank',
      },
    ],
  },
];
