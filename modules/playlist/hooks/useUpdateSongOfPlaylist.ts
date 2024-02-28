import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { playlistApi } from '../api';
import { playlistQueryKeys } from '../constants';
import { UpdateSongOfPlaylist } from '../types';

export function useUpdateSongOfPlaylist() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (
    data: any,
    { onSuccess, payload }: UpdateSongOfPlaylist
  ) => {
    queryClient.invalidateQueries({
      queryKey: playlistQueryKeys.getList,
    });
    queryClient.invalidateQueries({
      queryKey: [...playlistQueryKeys.getDetail, payload.playlistId],
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateSongOfPlaylist) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: UpdateSongOfPlaylist) =>
      playlistApi.updateSongOfPlaylist(payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateSongOfPlaylist = (variables: UpdateSongOfPlaylist) => {
    mutation.mutate(variables);
  };

  return { ...mutation, updateSongOfPlaylist };
}
