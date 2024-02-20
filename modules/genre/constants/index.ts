import { QUERY_KEY } from '@/constants';

export const genreQueryKeys = {
  all: QUERY_KEY.GENRE.KEY,
  getList: [QUERY_KEY.GENRE.KEY, QUERY_KEY.GENRE.GET_GENRE_LIST],
  getDetail: [QUERY_KEY.GENRE.KEY, QUERY_KEY.GENRE.GET_GENRE_DETAIL],
};
