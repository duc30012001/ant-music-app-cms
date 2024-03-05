import { handleError, showNotification } from '@/helpers';
import { useAuth, useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appThemeApi } from '../api';
import { appThemeQueryKeys } from '../constants';
import { UpdateAppTheme } from '../types';

export function useUpdateAppTheme() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const { messages } = useTranslate();

  const handleSuccess = (
    data: any,
    { appThemeId, onSuccess }: UpdateAppTheme
  ) => {
    queryClient.invalidateQueries({
      queryKey: appThemeQueryKeys.getList,
    });
    queryClient.invalidateQueries({
      queryKey: [...appThemeQueryKeys.getDetail, appThemeId],
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateAppTheme) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ appThemeId, payload }: UpdateAppTheme) =>
      appThemeApi.updateAppTheme(appThemeId, payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateAppTheme = (variables: UpdateAppTheme) => {
    mutation.mutate(variables);
  };

  return { ...mutation, updateAppTheme };
}
