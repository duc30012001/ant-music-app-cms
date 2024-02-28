import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistApi } from '../api';
import { playlistQueryKeys } from '../constants';
import { CreatePlaylist } from '../types';

export function useCreatePlaylist() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: CreatePlaylist) => {
    queryClient.invalidateQueries({ queryKey: playlistQueryKeys.getList });
    showNotification('success', messages('message.createSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: CreatePlaylist) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: CreatePlaylist) =>
      playlistApi.createPlaylist(payload),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const createPlaylist = (variables: CreatePlaylist) => {
    mutation.mutate(variables);
  };

  return { ...mutation, createPlaylist };
}
