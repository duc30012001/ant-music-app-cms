import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { songApi } from '../api';
import { songQueryKeys } from '../constants';
import { UpdateSong } from '../types';

export function useUpdateSong() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { songId, onSuccess }: UpdateSong) => {
    queryClient.invalidateQueries({
      queryKey: songQueryKeys.getList,
    });
    queryClient.invalidateQueries({
      queryKey: [...songQueryKeys.getDetail, songId],
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateSong) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ songId, payload }: UpdateSong) =>
      songApi.updateSong(songId, payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateSong = (variables: UpdateSong) => {
    mutation.mutate(variables);
  };

  return { ...mutation, updateSong };
}
