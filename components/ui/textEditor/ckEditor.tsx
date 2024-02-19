// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomBuildEditor from 'ckeditor5-custom-build/build/ckeditor';
import { uploadPlugin } from './adapter';

export interface CustomEditorProps {
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  value?: string;
}

const CustomEditor = ({ onChange, value }: CustomEditorProps) => {
  return (
    <CKEditor
      config={{
        extraPlugins: [uploadPlugin],
        toolbar: {
          shouldNotGroupWhenFull: true,
        },
      }}
      editor={CustomBuildEditor}
      onChange={(event, editor) => {
        onChange?.(editor.getData());
      }}
      data={value}
    />
  );
};

export default CustomEditor;
