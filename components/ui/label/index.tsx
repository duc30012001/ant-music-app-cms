import { cn } from '@/helpers';
import React, { ReactNode } from 'react';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label?: ReactNode;
  required?: boolean;
}

export default function Label({
  label,
  className,
  required,
  ...props
}: LabelProps) {
  if (!label) return null;

  return (
    <label
      {...props}
      className={cn(`block font-semibold text-text-color`, className)}
    >
      {label} {required && <span className="text-red-600">*</span>}
    </label>
  );
}
