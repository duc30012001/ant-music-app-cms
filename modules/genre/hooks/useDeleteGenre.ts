import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { genreApi } from '../api';
import { genreQueryKeys } from '../constants';
import { DeleteGenre } from '../types';

export function useDeleteGenre() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: DeleteGenre) => {
    queryClient.invalidateQueries({ queryKey: genreQueryKeys.getList });
    showNotification('success', messages('message.deleteSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: DeleteGenre) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ genreId }: DeleteGenre) => genreApi.deleteGenre(genreId),
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  });

  const deleteGenre = (variables: DeleteGenre) => {
    mutation.mutate(variables);
  };

  return { ...mutation, deleteGenre };
}
