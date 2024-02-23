/** @type {import('next').NextConfig} */
// import i18n from './next-i18next.config';
// const { i18n } = require('./next-i18next.config');

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
    ];
  },
  env: {
    API_URL: process.env.API_URL,
    WEBSITE_URL: process.env.WEBSITE_URL,
    ANT_GROUP_WEBSITE: process.env.ANT_GROUP_WEBSITE,
    EMAIL: process.env.EMAIL,
    APP_NAME: process.env.APP_NAME,
    APP_SHORT_NAME: process.env.APP_SHORT_NAME,
    SLOGAN: process.env.SLOGAN,
    APP_IMAGE: process.env.APP_IMAGE,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
    APP_KEYWORDS: process.env.APP_KEYWORDS,
    ANT_GROUP_WEBSITE: process.env.ANT_GROUP_WEBSITE,
    PRIMARY_COLOR: process.env.PRIMARY_COLOR,
    TEXT_COLOR: process.env.TEXT_COLOR,
    BACKGROUND_COLOR: process.env.BACKGROUND_COLOR,
    BUCKET_NAME: process.env.BUCKET_NAME,
    PROJECT_ID: process.env.PROJECT_ID,
    CERT_PATH: process.env.CERT_PATH,
    FOLDER_FILE: process.env.FOLDER_FILE,
    NODEMAILER_SENDER: process.env.NODEMAILER_SENDER,
    NODEMAILER_RECEIVER: process.env.NODEMAILER_RECEIVER,
    NODEMAILER_RECEIVER_CC: process.env.NODEMAILER_RECEIVER_CC,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
    SECRET_KEY: process.env.SECRET_KEY,
  },
  reactStrictMode: true,
  images: {
    // domains: [
    //   'ant-group.net',
    //   'wallpapers.com',
    //   'storage.googleapis.com',
    //   'xilam.com',
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ant-group.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'wallpapers.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'xilam.com',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 1500000,
  },
  transpilePackages: [
    'antd',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
  ],
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    localeDetection: false,
  },
};

export default nextConfig;
