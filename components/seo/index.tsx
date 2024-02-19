import Head from 'next/head';

export type SeoData = {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  keyword: string;
};

export type Props = {
  data: SeoData;
};

export default function Seo({ data }: Props) {
  const { thumbnailUrl, title, url, description, keyword } = data;
  return (
    <Head>
      {/* <!-- Primary Meta Tags --> */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnailUrl} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={thumbnailUrl} />

      {/* <!-- Meta Tags Generated with https://metatags.io --> */}
    </Head>
  );
}
