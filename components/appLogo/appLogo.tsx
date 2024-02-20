import logoImage from '@/assets/logo/logo.png';
import { DEFAULT_ROUTE } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export type AppLogoProps = {
  height?: number;
  width?: number;
};

function AppLogo({ height = 50, width = 50 }: AppLogoProps) {
  return (
    <Link href={DEFAULT_ROUTE}>
      <Image src={logoImage} alt="logo" height={height} width={width} />
    </Link>
  );
}

export default AppLogo;
