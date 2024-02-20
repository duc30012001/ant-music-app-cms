import { QUERY_KEY } from '@/constants';

export const songQueryKeys = {
  all: QUERY_KEY.SONG.KEY,
  getList: [QUERY_KEY.SONG.KEY, QUERY_KEY.SONG.GET_SONG_LIST],
  getDetail: [QUERY_KEY.SONG.KEY, QUERY_KEY.SONG.GET_SONG_DETAIL],
  getExistDetail: [QUERY_KEY.SONG.KEY, QUERY_KEY.SONG.GET_SONG_EXIST_DETAIL],
};
