import { useTranslate } from '@/hooks';
import { TranslationKey } from '@/locales';
import { PropsWithChildren } from 'react';

type IntlType = {
  messages: (key: TranslationKey) => string;
};

let intl: undefined | IntlType;

export function IntlGlobalProvider({ children }: PropsWithChildren) {
  intl = useTranslate();
  // Keep the 'intl' service reference
  return children;
}

export const appIntl = () => {
  return intl as IntlType;
};
