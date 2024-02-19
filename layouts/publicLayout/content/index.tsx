import { Container } from '@/components/appContainer';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

function PublicContent({ children }: Props) {
  return (
    <div className="bg-bg pt-[72px] text-text-color">
      <Container className="px-0 py-0" widthFull>
        {children}
      </Container>
    </div>
  );
}

export default PublicContent;
