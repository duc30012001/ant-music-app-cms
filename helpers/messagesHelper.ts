import { ToastOptions, TypeOptions, toast } from 'react-toastify';

export const showNotification = (
  type: TypeOptions,
  message: string,
  toastOptions?: ToastOptions
) => {
  const options = {
    ...toastOptions,
    type,
  };
  toast(message, { ...options, toastId: message });
};
