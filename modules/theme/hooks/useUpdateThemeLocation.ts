import { QUERY_KEY } from '@/constants';
import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { themeApi } from '../api';
import { UpdateThemeLocation } from '../types';

export function useUpdateThemeLocation() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { onSuccess }: UpdateThemeLocation) => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.USER.KEY, QUERY_KEY.USER.GET_USER_LIST],
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
