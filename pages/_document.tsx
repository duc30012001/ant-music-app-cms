import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo128.png" sizes="128x128" />
        <link
          rel="apple-touch-icon-precomposed"
          href="/logo128.png"
          sizes="128x128"
        />
        <link
          rel="msapplication-square128x128logo"
          href="/logo128.png"
          sizes="128x128"
        />
        <link rel="icon" href="/logo64.png" sizes="64x64" />
        <link
          rel="apple-touch-icon-precomposed"
          href="/logo64.png"
          sizes="64x64"
        />
        <link
          rel="msapplication-square64x64logo"
          href="/logo64.png"
          sizes="64x64"
        />
        <link rel="icon" href="/logo32.png" sizes="32x32" />
        <link
          rel="apple-touch-icon-precomposed"
          href="/logo32.png"
          sizes="32x32"
        />
        <link
          rel="msapplication-square32x32logo"
          href="/logo32.png"
          sizes="32x32"
        />
        <link rel="icon" href="/logo16.png" sizes="16x16" />
        <link
          rel="apple-touch-icon-precomposed"
          href="/logo16.png"
          sizes="16x16"
        />
        <link
          rel="msapplication-square16x16logo"
          href="/logo16.png"
          sizes="16x16"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;
