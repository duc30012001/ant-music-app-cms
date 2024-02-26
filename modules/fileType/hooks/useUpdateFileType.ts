import { handleError, showNotification } from '@/helpers';
import { useAuth, useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileTypeApi } from '../api';
import { fileTypeQueryKeys } from '../constants';
import { UpdateFileType } from '../types';

export function useUpdateFileType() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const { messages } = useTranslate();

  const handleSuccess = (
    data: any,
    { fileTypeId, onSuccess }: UpdateFileType
  ) => {
    queryClient.invalidateQueries({
      queryKey: fileTypeQueryKeys.getList,
    });
    queryClient.invalidateQueries({
      queryKey: [...fileTypeQueryKeys.getDetail, fileTypeId],
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateFileType) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ fileTypeId, payload }: UpdateFileType) =>
      fileTypeApi.updateFileType(fileTypeId, payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateFileType = (variables: UpdateFileType) => {
    mutation.mutate(variables);
  };

  return { ...mutation, updateFileType };
}
