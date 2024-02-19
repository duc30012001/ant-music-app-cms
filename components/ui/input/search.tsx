import { cn } from '@/helpers';
import { useTranslate } from '@/hooks';
import { Input, InputProps } from 'antd';
import _ from 'lodash';
import { ChangeEventHandler } from 'react';

export type OnSearchType = ChangeEventHandler<HTMLInputElement>;

type Props = {
  onChange?: OnSearchType;
  wrapperClassName?: string;
} & InputProps;

export default function AppSearch({
  onChange = () => {},
  wrapperClassName,
  ...props
}: Props) {
  const { messages } = useTranslate();

  const debounceSearchChange = _.debounce(onChange, 300);
  return (
    <div className={cn('w-full lg:w-48', wrapperClassName)}>
      <Input
        onChange={(e) => debounceSearchChange(e)}
        placeholder={messages('form.searchPlaceholder')}
        {...props}
      />
    </div>
  );
}
