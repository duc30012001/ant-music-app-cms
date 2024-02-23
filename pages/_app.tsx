// import { ThemeProvider } from 'next-themes';

import { PlaySongProvider } from '@/components/appPlaySong';
import AppToast from '@/components/appToast';
import { AntdProvider, LocaleProvider, ReactQueryProvider } from '@/core';
import { AdminLayout } from '@/layouts';
import '@/styles/globals.css';
import { AppPropsWithLayout } from '@/types';
import { Inter, Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import NextNProgress from 'nextjs-progressbar';

const inter = Inter({ subsets: ['latin'] });

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const boston = localFont({
  src: '../fonts/boston.otf',
  variable: '--font-boston',
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const AppLayout = (Component.Layout ?? AdminLayout) as React.ElementType;
  return (
    <ReactQueryProvider pageProps={pageProps}>
      {/* <ThemeProvider attribute="class"> */}
      <main
        className={`${boston.variable} ${openSans.variable} ${openSans.className} ${inter.className}`}
      >
        <LocaleProvider>
          <AntdProvider>
            <PlaySongProvider>
              <AppLayout>
                <NextNProgress
                  options={{
                    showSpinner: false,
                  }}
                  // color={process.env.PRIMARY_COLOR}
                />
                <Component {...pageProps} />
                <AppToast />
              </AppLayout>
            </PlaySongProvider>
          </AntdProvider>
        </LocaleProvider>
      </main>
      {/* </ThemeProvider> */}
    </ReactQueryProvider>
  );
}
