import { cn } from '@/helpers';
import dynamic from 'next/dynamic';
import { CustomEditorProps } from './ckEditor';

const CustomEditor = dynamic(
  () => {
    return import('./ckEditor');
  },
  { ssr: false }
);

type Props = CustomEditorProps & { className?: string };

function TextEditor({ className, onChange, value = '' }: Props) {
  return (
    <div className={cn('ck-container', className)}>
      <CustomEditor onChange={onChange} value={value} />
    </div>
  );
}

export default TextEditor;
