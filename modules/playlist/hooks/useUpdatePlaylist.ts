import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistApi } from '../api';
import { playlistQueryKeys } from '../constants';
import { UpdatePlaylist } from '../types';

export function useUpdatePlaylist() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (
    data: any,
    { playlistId, onSuccess }: UpdatePlaylist
  ) => {
    queryClient.invalidateQueries({
      queryKey: playlistQueryKeys.getList,
    });
    queryClient.invalidateQueries({
      queryKey: [...playlistQueryKeys.getDetail, playlistId],
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdatePlaylist) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ playlistId, payload }: UpdatePlaylist) =>
      playlistApi.updatePlaylist(playlistId, payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updatePlaylist = (variables: UpdatePlaylist) => {
    mutation.mutate(variables);
  };

  return { ...mutation, updatePlaylist };
}
