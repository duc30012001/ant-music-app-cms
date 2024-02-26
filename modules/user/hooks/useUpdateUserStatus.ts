import { QUERY_KEY } from '@/constants';
import { USER_STATUS } from '@/enums';
import { handleError, showNotification } from '@/helpers';
import { useTranslate } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api';
import { OnUpdateStatusUserType, UpdateStatusUser } from '../types';

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  const { messages } = useTranslate();

  const handleSuccess = (data: any, { onSuccess }: UpdateStatusUser) => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.USER.KEY, QUERY_KEY.USER.GET_USER_LIST],
    });
    showNotification('success', messages('message.updateSuccessfully'));
    onSuccess?.();
  };

  const handleOnError = (error: any, { onError }: UpdateStatusUser) => {
    handleError(error);
    onError?.();
  };

  const mutation = useMutation({
    mutationFn: ({ userId, payload }: UpdateStatusUser) =>
      userApi.updateUserStatus(userId, payload),
    onSuccess: handleSuccess,
    onError: handleOnError,
  });

  const updateUserStatus: OnUpdateStatusUserType = (userId, value) => {
    const status = value ? USER_STATUS.OPEN : USER_STATUS.LOCK;
    const payload = { status };
    mutation.mutate({ userId, payload });
  };

  return { ...mutation, updateUserStatus };
}
