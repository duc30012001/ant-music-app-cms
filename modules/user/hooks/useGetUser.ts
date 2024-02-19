import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';
import { userQueryKeys } from '../constants';
import { DataFilterUser, UserData } from '../types';

export function useUserList(params: Partial<DataFilterUser>) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...userQueryKeys.getList, params],
    queryFn: () => userApi.getList(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataUser: data?.data?.docs ?? [],
    totalRecord: data?.data?.meta?.total ?? 0,
  };
}

export function useUserDetail(userId: UserData['id']) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...userQueryKeys.getDetail, userId],
    queryFn: () => userApi.getDetail(userId),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(userId),
  });

  return {
    ...restResponse,
    dataUserDetail: data?.data?.docs?.data ?? ({} as UserData),
  };
}
