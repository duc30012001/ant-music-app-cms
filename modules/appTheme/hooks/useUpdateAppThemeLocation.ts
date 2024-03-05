import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appThemeApi } from '../api';
import { appThemeQueryKeys } from '../constants';
import { UpdateAppThemeLocation } from '../types';

export function useUpdateAppThemeLocation() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { onSuccess }: UpdateAppThemeLocation) => {
    queryClient.invalidateQueries({
      queryKey: appThemeQueryKeys.getList,
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateAppThemeLocation) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: UpdateAppThemeLocation) =>
      appThemeApi.updateAppThemeLocation(payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateAppThemeLocation = (payload: UpdateAppThemeLocation) => {
    mutation.mutate(payload);
  };

  return { ...mutation, updateAppThemeLocation };
}
