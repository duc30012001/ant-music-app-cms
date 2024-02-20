import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { genreApi } from '../api';
import { genreQueryKeys } from '../constants';
import { CreateGenre } from '../types';

export function useCreateGenre() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: CreateGenre) => {
    queryClient.invalidateQueries({ queryKey: genreQueryKeys.getList });
    showNotification('success', messages('message.createSuccessfully'));
    onSuccess?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: CreateGenre) => genreApi.createGenre(payload),
    onSuccess: handleOnSuccess,
    onError: handleError,
  });

  const createGenre = (variables: CreateGenre) => {
    mutation.mutate(variables);
  };

  return { ...mutation, createGenre };
}
