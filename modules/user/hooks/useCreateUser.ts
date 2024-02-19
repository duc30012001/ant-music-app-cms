import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api';
import { userQueryKeys } from '../constants';
import { CreateUser } from '../types';

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleOnSuccess = (data: any, { onSuccess }: CreateUser) => {
    queryClient.invalidateQueries({ queryKey: userQueryKeys.getList });
    showNotification('success', messages('message.createSuccessfully'));
    onSuccess?.();
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: CreateUser) => userApi.createUser(payload),
    onSuccess: handleOnSuccess,
    onError: handleError,
  });

  const createUser = (variables: CreateUser) => {
    mutation.mutate(variables);
  };

  return { ...mutation, createUser };
}
