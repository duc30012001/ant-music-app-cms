import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { themeApi } from '../api';
import { themeQueryKeys } from '../constants';
import { UpdateThemeLocation } from '../types';

export function useUpdateThemeLocation() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { onSuccess }: UpdateThemeLocation) => {
    queryClient.invalidateQueries({
      queryKey: themeQueryKeys.getList,
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: UpdateThemeLocation) =>
      themeApi.updateThemeLocation(payload),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const updateThemeLocation = (payload: UpdateThemeLocation) => {
    mutation.mutate(payload);
  };

  return { ...mutation, updateThemeLocation };
}
