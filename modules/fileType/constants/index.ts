import { QUERY_KEY } from '@/constants';

export const fileTypeQueryKeys = {
  all: QUERY_KEY.FILE_TYPE.KEY,
  getList: [QUERY_KEY.FILE_TYPE.KEY, QUERY_KEY.FILE_TYPE.GET_FILE_TYPE_LIST],
  getDetail: [
    QUERY_KEY.FILE_TYPE.KEY,
    QUERY_KEY.FILE_TYPE.GET_FILE_TYPE_DETAIL,
  ],
};
