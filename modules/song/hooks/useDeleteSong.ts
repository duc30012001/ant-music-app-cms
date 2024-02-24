import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { songApi } from '../api';
import { songQueryKeys } from '../constants';
import { DeleteSong } from '../types';

export function useDeleteSong() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: DeleteSong) => {
    queryClient.invalidateQueries({ queryKey: songQueryKeys.getList });
    showNotification('success', messages('message.deleteSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: DeleteSong) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ songId }: DeleteSong) => songApi.deleteSong(songId),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const deleteSong = (variables: DeleteSong) => {
    mutation.mutate(variables);
  };

  return { ...mutation, deleteSong };
}
