import { LocaleSelect } from '@/components/ui/select';
import { PropsWithChildren } from 'react';

type Props = {};

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <section>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="fixed right-5 top-5">
          <LocaleSelect />
        </div>
        <div className="min-h w-full max-w-md rounded-lg px-4 py-3">
          {children}
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
