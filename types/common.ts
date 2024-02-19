import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { PropsWithChildren, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  Layout?: (props: PropsWithChildren) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
