import React, { HTMLInputTypeAttribute } from 'react';
import { Control, useController } from 'react-hook-form';
import { Input } from '../input';
import { InputChangeEvent } from '../input/input';
import Label from '../label';
import ErrorMessage from './errorMessage';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  control: Control<any>;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

function InputField({
  name,
  label,
  control,
  required,
  onChange: externalOnChange,
  ...props
}: Props) {
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
      <Input
        name={name}
        value={value}
        onChange={(event: InputChangeEvent) => {
          onChange(event);
          externalOnChange?.(event);
        }}
        onBlur={onBlur}
        htmlRef={ref}
        {...props}
      />
      <ErrorMessage message={error?.message} />
    </div>
  );
}

export default InputField;
