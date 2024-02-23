import { handleError, showNotification } from '@/helpers';
import { useAuth, useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { genreApi } from '../api';
import { genreQueryKeys } from '../constants';
import { UpdateGenre } from '../types';

export function useUpdateGenre() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { genreId, onSuccess }: UpdateGenre) => {
    queryClient.invalidateQueries({
      queryKey: genreQueryKeys.getList,
    });
    queryClient.invalidateQueries({
      queryKey: [...genreQueryKeys.getDetail, genreId],
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const mutation = useMutation({
    mutationFn: ({ genreId, payload }: UpdateGenre) =>
      genreApi.updateGenre(genreId, payload),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const updateGenre = (variables: UpdateGenre) => {
    mutation.mutate(variables);
  };

  return { ...mutation, updateGenre };
}
