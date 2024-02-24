import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileTypeApi } from '../api';
import { fileTypeQueryKeys } from '../constants';
import { UpdateFileTypeLocation } from '../types';

export function useUpdateFileTypeLocation() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { onSuccess }: UpdateFileTypeLocation) => {
    queryClient.invalidateQueries({
      queryKey: fileTypeQueryKeys.getList,
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateFileTypeLocation) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: UpdateFileTypeLocation) =>
      fileTypeApi.updateFileTypeLocation(payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateFileTypeLocation = (payload: UpdateFileTypeLocation) => {
    mutation.mutate(payload);
  };

  return { ...mutation, updateFileTypeLocation };
}
