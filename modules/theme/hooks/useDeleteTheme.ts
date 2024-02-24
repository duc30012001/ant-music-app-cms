import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { themeApi } from '../api';
import { themeQueryKeys } from '../constants';
import { DeleteTheme } from '../types';

export function useDeleteTheme() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: DeleteTheme) => {
    queryClient.invalidateQueries({ queryKey: themeQueryKeys.getList });
    showNotification('success', messages('message.deleteSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: DeleteTheme) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ themeId }: DeleteTheme) => themeApi.deleteTheme(themeId),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const deleteTheme = (variables: DeleteTheme) => {
    mutation.mutate(variables);
  };

  return { ...mutation, deleteTheme };
}
