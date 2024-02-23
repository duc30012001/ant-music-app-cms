import { QUERY_KEY } from '@/constants';

export const themeQueryKeys = {
  all: QUERY_KEY.THEME.KEY,
  getList: [QUERY_KEY.THEME.KEY, QUERY_KEY.THEME.GET_THEME_LIST],
  getDetail: [QUERY_KEY.THEME.KEY, QUERY_KEY.THEME.GET_THEME_DETAIL],
};
