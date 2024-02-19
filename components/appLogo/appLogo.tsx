import logoImage from '@/assets/logo/logo.png';
import { PUBLIC_ROUTES } from '@/enums';
import Image from 'next/image';
import Link from 'next/link';

export type AppLogoProps = {
  height?: number;
  width?: number;
};

function AppLogo({ height = 50, width = 50 }: AppLogoProps) {
  return (
    <Link href={PUBLIC_ROUTES.HOME}>
      <Image src={logoImage} alt="logo" height={height} width={width} />
    </Link>
  );
}

export default AppLogo;
