import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fileTypeApi } from '../api';
import { fileTypeQueryKeys } from '../constants';
import { CreateFileType } from '../types';

export function useCreateFileType() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: CreateFileType) => {
    queryClient.invalidateQueries({ queryKey: fileTypeQueryKeys.getList });
    showNotification('success', messages('message.createSuccessfully'));
    onSuccess?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: CreateFileType) =>
      fileTypeApi.createFileType(payload),
    onSuccess: handleOnSuccess,
    onError: handleError,
  });

  const createFileType = (variables: CreateFileType) => {
    mutation.mutate(variables);
  };

  return { ...mutation, createFileType };
}
