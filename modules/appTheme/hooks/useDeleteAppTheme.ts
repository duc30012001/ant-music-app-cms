import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appThemeApi } from '../api';
import { appThemeQueryKeys } from '../constants';
import { DeleteAppTheme } from '../types';

export function useDeleteAppTheme() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: DeleteAppTheme) => {
    queryClient.invalidateQueries({ queryKey: appThemeQueryKeys.getList });
    showNotification('success', messages('message.deleteSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: DeleteAppTheme) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ appThemeId }: DeleteAppTheme) =>
      appThemeApi.deleteAppTheme(appThemeId),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const deleteAppTheme = (variables: DeleteAppTheme) => {
    mutation.mutate(variables);
  };

  return { ...mutation, deleteAppTheme };
}
