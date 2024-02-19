import { AppLocale, Container } from '@/components/appContainer';
import { AppLogoWithText } from '@/components/appLogo';
import { Button } from '@/components/ui/button';
import { PUBLIC_ROUTES } from '@/enums';
import { cn } from '@/helpers';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import NavbarMobile from './navbarMobile';

type Props = {};

function PublicHeader({}: Props) {
  // const { theme, setTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full border-slate-50/[0.06] bg-bg transition-all',
        {
          'shadow-md': scrollY > 0,
        }
      )}
    >
      <Container className="flex items-center justify-between gap-5 px-3 py-3 lg:px-5 lg:pl-3">
        <NavbarMobile className="block lg:hidden" />
        <AppLogoWithText
          wrapperClassName="grow sm:grow-0"
          className="hidden text-3xl sm:block"
          size={60}
        />
        <Navbar className="hidden lg:flex" />
        {/* <Button
          onClick={() =>
            setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT)
          }
          className="text-light dark:text-dark"
        >
          {theme}
        </Button> */}
        <div className="flex items-center justify-center gap-3">
          <AppLocale />
          <Link href={PUBLIC_ROUTES.CONTACT}>
            <Button primary>Contact Us</Button>
          </Link>
        </div>
      </Container>
    </nav>
  );
}

export default PublicHeader;
