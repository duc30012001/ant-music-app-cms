import { useActive } from '@/hooks';
import { ReactNode } from 'react';
import { FaBars } from 'react-icons/fa';
import AppContent from './appContent';
import AppSidebar from './appSidebar';
import ButtonIcon from './buttonIcon';
import Container from './container';

type Props = {
  children: ReactNode;
  appTitle?: ReactNode;
  sidebarContent?: ReactNode;
};

function AppContainer({ children, appTitle, sidebarContent }: Props) {
  const { isActive, active, inActive } = useActive();
  return (
    <Container widthFull className="p-0">
      <div className="mb-4 flex items-center gap-2">
        {sidebarContent && (
          <ButtonIcon
            className="lg:hidden"
            icon={<FaBars />}
            onClick={active}
          />
        )}
        <h2 className="grow text-base font-bold">{appTitle}</h2>
      </div>
      <div className="flex gap-7">
        {sidebarContent && (
          <AppSidebar
            sidebarContent={sidebarContent}
            open={isActive}
            onClose={inActive}
            appTitle={appTitle}
          />
        )}
        <AppContent>{children}</AppContent>
      </div>
    </Container>
  );
}

export default AppContainer;
