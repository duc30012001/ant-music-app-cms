import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function AppContent({ children }: Props) {
  return (
    <div className="grow overflow-hidden rounded-2xl border-0 bg-white">
      {children}
    </div>
  );
}

export default AppContent;
