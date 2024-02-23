import axiosClient from '@/apiClient';
import { encrypt, showNotification } from '@/helpers';
import { Data, GetSignedUrlPayload } from '@/pages/api/upload/get-signed-url';

const URL = 'https://storage.googleapis.com/';

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

export async function uploadFileToBucket(file: File): Promise<string> {
  const data: GetSignedUrlPayload = {
    fileName: file.name,
    contentType: file.type,
  };

  const payload = { data: encrypt(data) };

  try {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size must be less than ${MAX_FILE_SIZE_MB} MB`);
    }

    const response = await axiosClient.post<Data>(
      '/upload/get-signed-url',
      payload
    );

    const { signedUrl, key } = response.data;

    const fileURL = URL + key;

    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedUrl, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(fileURL);
        } else {
          reject(new Error(`Failed to upload file. Status: ${xhr.status}`));
        }
      };
      xhr.onerror = () => {
        reject(new Error('Failed to upload file. Network error.'));
      };
      xhr.send(file);
    });

    return fileURL;
  } catch (error) {
    const message = 'error';
    // const message = handleGetErrorMessage(error);
    showNotification('error', message);
    return '';
  }
}
