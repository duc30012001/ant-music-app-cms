import { ADMIN_ROUTES } from '@/enums';
import { FormProps } from 'antd';

export const COOKIES_KEY = {
  TOKEN: 'at',
  REFRESH_TOKEN: 'rt',
  LOCALE: 'locale',
};

export const PAGE_SIZE = 20;

export const MAX_FILE_RENDER = 1000;

export const FORM_LAYOUT: FormProps = {
  labelCol: {
    xs: 9,
    md: 8,
    lg: 7,
  },
  wrapperCol: {
    xs: 15,
    md: 16,
    lg: 17,
  },
  colon: false,
  labelAlign: 'left',
};

export const FORM_LAYOUT_VERTICAL: FormProps = {
  labelCol: {
    xs: 24,
    md: 24,
    lg: 24,
  },
  wrapperCol: {
    xs: 24,
    md: 24,
    lg: 24,
  },
  colon: false,
  labelAlign: 'left',
};

export const ONE_DAY = 60 * 60 * 24;

export const DEFAULT_ROUTE = ADMIN_ROUTES.SONG;
