import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { songApi } from '../api';
import { songQueryKeys } from '../constants';
import { CreateSong } from '../types';

export function useCreateSong() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: CreateSong) => {
    queryClient.invalidateQueries({ queryKey: songQueryKeys.getList });
    showNotification('success', messages('message.createSuccessfully'));
    onSuccess?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: CreateSong) => songApi.createSong(payload),
    onSuccess: handleOnSuccess,
    onError: handleError,
  });

  const createSong = (variables: CreateSong) => {
    mutation.mutate(variables);
  };

  return { ...mutation, createSong };
}
