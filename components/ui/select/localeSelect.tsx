import { LOCALE } from '@/enums';
import { useLocale, useTranslate } from '@/hooks';
import { Select, SelectProps } from 'antd';
import Image from 'next/image';

interface LocaleSelectProps extends SelectProps {
  width?: number | string;
}

export default function LocaleSelect({
  width = 150,
  ...props
}: LocaleSelectProps) {
  const { locale, switchLocale } = useLocale();
  const { messages } = useTranslate();

  const options = [
    {
      label: (
        <p className="flex items-center justify-start gap-2">
          <Image
            height={15}
            width={30}
            src={'/languages/vi.svg'}
            alt={LOCALE.VI}
          />
          {messages('language.vietnamese')}
        </p>
      ),
      value: LOCALE.VI,
    },
    {
      label: (
        <p className="flex items-center justify-start gap-2">
          <Image
            height={15}
            width={30}
            src={'/languages/en.svg'}
            alt={LOCALE.EN}
          />
          {messages('language.english')}
        </p>
      ),
      value: LOCALE.EN,
    },
  ];

  return (
    <Select
      options={options}
      onChange={(value: LOCALE) => switchLocale(value)}
      value={locale as LOCALE}
      style={{ width }}
      {...props}
    />
  );
}
