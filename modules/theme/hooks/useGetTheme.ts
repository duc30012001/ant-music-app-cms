import { useQuery } from '@tanstack/react-query';
import { themeApi } from '../api';
import { themeQueryKeys } from '../constants';
import { DataFilterTheme, ThemeData } from '../types';

export function useThemeList(params: Partial<DataFilterTheme>) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...themeQueryKeys.getList, params],
    queryFn: () => themeApi.getList(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataTheme: data?.data?.docs ?? [],
    totalRecord: data?.data?.meta?.total ?? 0,
  };
}

export function useThemeDetail(themeId: ThemeData['id']) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...themeQueryKeys.getDetail, themeId],
    queryFn: () => themeApi.getDetail(themeId),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(themeId),
  });

  return {
    ...restResponse,
    dataThemeDetail: data?.data?.docs?.data ?? ({} as ThemeData),
  };
}
