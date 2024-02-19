import { useLocale } from '@/hooks';
import theme from '@/theme/themeConfig';
import { ConfigProvider } from 'antd';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

function AntdProvider({ children }: Props) {
  const { antdLocale } = useLocale();
  return (
    <ConfigProvider theme={theme} locale={antdLocale}>
      {children}
    </ConfigProvider>
  );
}

export default AntdProvider;
