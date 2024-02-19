import { Editor } from '@ckeditor/ckeditor5-core';
import {
  FileLoader,
  UploadAdapter,
} from '@ckeditor/ckeditor5-upload/src/filerepository';
import { uploadFileToBucket } from './api';

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;

          if (file) {
            const url = await uploadFileToBucket(file);
            resolve({
              default: url,
            });
          } else {
            reject('Upload error');
          }
        } catch (error) {
          reject('Upload error');
        }
      });
    },
    abort: () => {},
  };
}

export function uploadPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}
