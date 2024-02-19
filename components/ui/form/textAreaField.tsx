import { Control, useController } from 'react-hook-form';
import { TextArea } from '../input';
import { TextAreaProps } from '../input/textArea';
import Label from '../label';
import ErrorMessage from './errorMessage';

interface Props extends TextAreaProps {
  name: string;
  label?: string;
  control: Control<any>;
  required?: boolean;
}

function TextAreaField({ name, label, control, required, ...props }: Props) {
  const {
    field: { onBlur, onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={'mb-4 flex flex-col'}>
      <Label htmlFor={name} label={label} required={required} />
      <TextArea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        htmlRef={ref}
        {...props}
      />
      <ErrorMessage message={error?.message} />
    </div>
  );
}

export default TextAreaField;
