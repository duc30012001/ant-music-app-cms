import { ScrollToTopButton } from '@/components/ui/button';
import { PropsWithChildren } from 'react';
import PublicContent from './content';
import PublicFooter from './footer';
import PublicHeader from './header';

interface Props extends PropsWithChildren {}

function PublicLayout({ children }: Props) {
  return (
    <div>
      <PublicHeader />
      <PublicContent>{children}</PublicContent>
      <ScrollToTopButton />
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
