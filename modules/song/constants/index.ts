import { QUERY_KEY } from '@/constants';

export const songQueryKeys = {
  all: QUERY_KEY.SONG.KEY,
  getList: [QUERY_KEY.SONG.KEY, QUERY_KEY.SONG.GET_SONG_LIST],
  getDataSidebar: [QUERY_KEY.SONG.KEY, QUERY_KEY.SONG.GET_DATA_SIDEBAR],
  getDetail: [QUERY_KEY.SONG.KEY, QUERY_KEY.SONG.GET_SONG_DETAIL],
  getExistDetail: [QUERY_KEY.SONG.KEY, QUERY_KEY.SONG.GET_SONG_EXIST_DETAIL],
  getExistDetailById: [
    QUERY_KEY.SONG.KEY,
    QUERY_KEY.SONG.GET_SONG_EXIST_DETAIL_BY_ID,
  ],
};

export const SPLIT_CHARACTER = ',';

export const MP3_CONTENT_TYPE = 'audio/mpeg';
