import { LOCALE } from '@/enums';
import { useTranslate } from '@/hooks';
import { Col } from 'antd';
import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title?: boolean;
  locale?: LOCALE;
};

function FormMultiLangCol({
  children,
  title = true,
  locale = LOCALE.VI,
}: Props) {
  const { messages } = useTranslate();

  const options = {
    [LOCALE.EN]: {
      label: messages('common.en'),
      icon: '/languages/en.svg',
    },
    [LOCALE.VI]: {
      label: messages('common.vi'),
      icon: '/languages/vi.svg',
    },
  };

  return (
    <Col xs={24} lg={12}>
      {title && (
        <h3 className="mb-2 flex items-center gap-1 text-base font-semibold">
          <Image
            height={30}
            width={30}
            src={options[locale].icon}
            alt={options[locale].label}
          />
          {options[locale].label}
        </h3>
      )}
      {children}
    </Col>
  );
}

export default FormMultiLangCol;
