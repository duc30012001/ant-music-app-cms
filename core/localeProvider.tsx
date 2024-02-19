import { IntlGlobalProvider } from '@/helpers';
import { useLocale } from '@/hooks';
import { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';

function LocaleProvider({ children }: PropsWithChildren) {
  const { locale, messages } = useLocale();
  return (
    <IntlProvider locale={locale as string} messages={messages}>
      <IntlGlobalProvider>{children}</IntlGlobalProvider>
    </IntlProvider>
  );
}

export default LocaleProvider;
