import { COOKIES_KEY } from '@/constants';
import { LOCALE } from '@/enums';
import {
  INestedMessages,
  enMessages,
  flattenMessages,
  viMessages,
} from '@/locales';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const DEFAULT_LOCALE: LOCALE = LOCALE.VI;

const messages: Record<LOCALE, INestedMessages> = {
  vi: viMessages,
  en: enMessages,
};

export const useLocale = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  // const routerLocale = router.locale as LOCALE | undefined;

  // const locale = routerLocale ?? DEFAULT_LOCALE;

  const locale = DEFAULT_LOCALE;

  const flattenedMessages = useMemo(
    () => flattenMessages(messages[locale as keyof typeof messages]),
    [locale]
  );

  const switchLocale = (locale: LOCALE) => {
    router.push({ pathname, query }, asPath, { locale });
    Cookies.set(COOKIES_KEY.LOCALE, locale);
  };

  return {
    locale,
    switchLocale,
    messages: flattenedMessages,
    antdLocale: locale === LOCALE.VI ? viVN : enUS,
  };
};
