import { QUERY_KEY } from '@/constants';

export const appThemeQueryKeys = {
  all: QUERY_KEY.APP_THEME.KEY,
  getList: [QUERY_KEY.APP_THEME.KEY, QUERY_KEY.APP_THEME.GET_APP_THEME_LIST],
  getDetail: [
    QUERY_KEY.APP_THEME.KEY,
    QUERY_KEY.APP_THEME.GET_APP_THEME_DETAIL,
  ],
};
