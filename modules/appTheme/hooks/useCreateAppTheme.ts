import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appThemeApi } from '../api';
import { appThemeQueryKeys } from '../constants';
import { CreateAppTheme } from '../types';

export function useCreateAppTheme() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: CreateAppTheme) => {
    queryClient.invalidateQueries({ queryKey: appThemeQueryKeys.getList });
    showNotification('success', messages('message.createSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: CreateAppTheme) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: CreateAppTheme) =>
      appThemeApi.createAppTheme(payload),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const createAppTheme = (variables: CreateAppTheme) => {
    mutation.mutate(variables);
  };

  return { ...mutation, createAppTheme };
}
