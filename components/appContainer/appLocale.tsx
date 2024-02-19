import { LOCALE } from '@/enums';
import { useLocale, useTranslate } from '@/hooks';
import { Dropdown } from 'antd';
import Image from 'next/image';

const width = 40;
const height = 30;

function AppLocale() {
  const { locale, switchLocale } = useLocale();
  const { messages } = useTranslate();

  const items = [
    {
      label: (
        <p className="flex items-center justify-start gap-2 text-base font-medium text-text-color">
          <Image
            src={'/languages/vi.svg'}
            className="hidden h-full md:block"
            width={width}
            height={height}
            alt={LOCALE.VI}
          />
          {messages('language.vietnamese')}
        </p>
      ),
      key: LOCALE.VI,
    },
    {
      label: (
        <p className="flex items-center justify-start gap-2 text-base font-medium text-text-color">
          <Image
            src={'/languages/en.svg'}
            className="hidden h-full md:block"
            width={width}
            height={height}
            alt={LOCALE.EN}
          />
          {messages('language.english')}
        </p>
      ),
      key: LOCALE.EN,
    },
  ];

  const currentLocale = items.find((item) => item.key === locale);

  function onClick({ key }: { key: any }) {
    switchLocale(key);
  }

  return (
    <Dropdown
      menu={{ items: items.filter((item) => item.key !== locale), onClick }}
      trigger={['click']}
    >
      <div className="cursor-pointer rounded-3xl px-4 py-1 hover:bg-slate-100">
        {currentLocale?.label}
      </div>
    </Dropdown>
  );
}

export default AppLocale;
