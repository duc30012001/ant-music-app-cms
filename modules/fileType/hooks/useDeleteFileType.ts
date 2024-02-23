import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileTypeApi } from '../api';
import { fileTypeQueryKeys } from '../constants';
import { DeleteFileType } from '../types';

export function useDeleteFileType() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: DeleteFileType) => {
    queryClient.invalidateQueries({ queryKey: fileTypeQueryKeys.getList });
    showNotification('success', messages('message.deleteSuccessfully'));
    onSuccess?.();
  };

  const mutation = useMutation({
    mutationFn: ({ fileTypeId }: DeleteFileType) =>
      fileTypeApi.deleteFileType(fileTypeId),
    onSuccess: handleOnSuccess,
    onError: handleError,
  });

  const deleteFileType = (variables: DeleteFileType) => {
    mutation.mutate(variables);
  };

  return { ...mutation, deleteFileType };
}
