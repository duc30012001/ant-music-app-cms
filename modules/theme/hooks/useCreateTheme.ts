import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { themeApi } from '../api';
import { themeQueryKeys } from '../constants';
import { CreateTheme } from '../types';

export function useCreateTheme() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: CreateTheme) => {
    queryClient.invalidateQueries({ queryKey: themeQueryKeys.getList });
    showNotification('success', messages('message.createSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: CreateTheme) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: CreateTheme) => themeApi.createTheme(payload),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const createTheme = (variables: CreateTheme) => {
    mutation.mutate(variables);
  };

  return { ...mutation, createTheme };
}
