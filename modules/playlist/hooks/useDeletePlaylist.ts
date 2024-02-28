import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistApi } from '../api';
import { playlistQueryKeys } from '../constants';
import { DeletePlaylist } from '../types';

export function useDeletePlaylist() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: DeletePlaylist) => {
    queryClient.invalidateQueries({ queryKey: playlistQueryKeys.getList });
    showNotification('success', messages('message.deleteSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: DeletePlaylist) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ playlistId }: DeletePlaylist) =>
      playlistApi.deletePlaylist(playlistId),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const deletePlaylist = (variables: DeletePlaylist) => {
    mutation.mutate(variables);
  };

  return { ...mutation, deletePlaylist };
}
