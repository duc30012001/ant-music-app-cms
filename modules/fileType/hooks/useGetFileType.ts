import { useQuery } from '@tanstack/react-query';
import { fileTypeApi } from '../api';
import { fileTypeQueryKeys } from '../constants';
import { DataFilterFileType, FileTypeData } from '../types';

export function useFileTypeList(params: Partial<DataFilterFileType>) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...fileTypeQueryKeys.getList, params],
    queryFn: () => fileTypeApi.getList(params),
    placeholderData: (previousData) => previousData,
  });

  return {
    ...restResponse,
    dataFileType: data?.data?.docs ?? [],
    totalRecord: data?.data?.meta?.total ?? 0,
  };
}

export function useFileTypeDetail(fileTypeId: FileTypeData['id']) {
  const { data, ...restResponse } = useQuery({
    queryKey: [...fileTypeQueryKeys.getDetail, fileTypeId],
    queryFn: () => fileTypeApi.getDetail(fileTypeId),
    placeholderData: (previousData) => previousData,
    enabled: Boolean(fileTypeId),
  });

  return {
    ...restResponse,
    dataFileTypeDetail: data?.data?.docs?.data ?? ({} as FileTypeData),
  };
}
