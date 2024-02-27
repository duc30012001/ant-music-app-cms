import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistApi } from '../api';
import { playlistQueryKeys } from '../constants';
import { AddSongToPlaylist } from '../types';

export function useAddSongToPlaylist() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: AddSongToPlaylist) => {
    queryClient.invalidateQueries({ queryKey: playlistQueryKeys.getList });
    showNotification('success', messages('message.createSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: AddSongToPlaylist) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: AddSongToPlaylist) =>
      playlistApi.addSongToPlaylist(payload),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const addSongToPlaylist = (variables: AddSongToPlaylist) => {
    mutation.mutate(variables);
  };

  return { ...mutation, addSongToPlaylist };
}
