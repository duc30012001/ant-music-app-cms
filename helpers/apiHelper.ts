import { appIntl } from './intl';
import { showNotification } from './messagesHelper';

export function handleGetErrorMessage(error: any) {
  const { messages } = appIntl();

  const statusCode = Number(error?.response?.status);

  if (statusCode === 500) {
    return messages('message.somethingWentWrong');
  }

  let message =
    error?.data?.message ||
    error?.response?.data?.message ||
    error?.message ||
    error;

  if (typeof message !== 'string') {
    message = messages('message.somethingWentWrong');
  }

  return messages(message);
}

export function handleError(error: any) {
  const message = handleGetErrorMessage(error);
  showNotification('error', message);
}
