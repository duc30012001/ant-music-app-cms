import { handleError, showNotification } from '@/helpers';
import { useAuth, useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api';
import { userQueryKeys } from '../constants';
import { UpdateUser } from '../types';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { userId, onSuccess }: UpdateUser) => {
    queryClient.invalidateQueries({
      queryKey: userQueryKeys.getList,
    });
    queryClient.invalidateQueries({
      queryKey: [...userQueryKeys.getDetail, userId],
    });
    if (profile?.idUser === userId) {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.getInfo,
      });
    }
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateUser) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ userId, payload }: UpdateUser) =>
      userApi.updateUser(userId, payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateUser = (variables: UpdateUser) => {
    mutation.mutate(variables);
  };

  return { ...mutation, updateUser };
}
