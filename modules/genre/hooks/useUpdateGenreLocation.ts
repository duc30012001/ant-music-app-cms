import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { genreApi } from '../api';
import { genreQueryKeys } from '../constants';
import { UpdateGenreLocation } from '../types';

export function useUpdateGenreLocation() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { onSuccess }: UpdateGenreLocation) => {
    queryClient.invalidateQueries({
      queryKey: genreQueryKeys.getList,
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: UpdateGenreLocation) =>
      genreApi.updateGenreLocation(payload),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const updateGenreLocation = (payload: UpdateGenreLocation) => {
    mutation.mutate(payload);
  };

  return { ...mutation, updateGenreLocation };
}
