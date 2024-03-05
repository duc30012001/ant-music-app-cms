import { useQuery } from '@tanstack/react-query';
import { appThemeApi } from '../api';
import { appThemeQueryKeys } from '../constants';
import { AppThemeData, DataFilterAppTheme } from '../types';

export function useAppThemeList(params: Partial<DataFilterAppTheme>) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...appThemeQueryKeys.getList, params],
    queryFn: () => appThemeApi.getList(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataAppTheme: data?.data?.docs ?? [],
    totalRecord: data?.data?.meta?.total ?? 0,
  };
}

export function useAppThemeDetail(appThemeId: AppThemeData['id']) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...appThemeQueryKeys.getDetail, appThemeId],
    queryFn: () => appThemeApi.getDetail(appThemeId),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(appThemeId),
  });

  return {
    ...restResponse,
    dataAppThemeDetail: data?.data?.docs?.data ?? ({} as AppThemeData),
  };
}
