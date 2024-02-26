import { handleError, showNotification } from '@/helpers';
import { useAuth, useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { themeApi } from '../api';
import { themeQueryKeys } from '../constants';
import { UpdateTheme } from '../types';

export function useUpdateTheme() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { themeId, onSuccess }: UpdateTheme) => {
    queryClient.invalidateQueries({
      queryKey: themeQueryKeys.getList,
    });
    queryClient.invalidateQueries({
      queryKey: [...themeQueryKeys.getDetail, themeId],
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateTheme) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ themeId, payload }: UpdateTheme) =>
      themeApi.updateTheme(themeId, payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateTheme = (variables: UpdateTheme) => {
    mutation.mutate(variables);
  };

  return { ...mutation, updateTheme };
}
