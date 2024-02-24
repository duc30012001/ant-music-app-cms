import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';

interface Props extends PropsWithChildren {
  pageProps: any;
}

function ReactQueryProvider({ pageProps, children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {children}
      </HydrationBoundary>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
