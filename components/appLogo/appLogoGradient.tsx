import logoImage from '@/assets/logo/logo.png';
import { DEFAULT_ROUTE, defaultConfig } from '@/constants';
import { cn } from '@/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { AppLogoProps } from './appLogo';

type Props = {
  className?: string;
  wrapperClassName?: string;
  size?: number;
} & AppLogoProps;

function AppLogoGradient({ className, wrapperClassName, size = 70 }: Props) {
  const src = logoImage;
  const companyName = defaultConfig.APP_SHORT_NAME;

  return (
    <Link
      href={DEFAULT_ROUTE}
      className={cn('flex w-fit items-center gap-2', wrapperClassName)}
    >
      <Image src={src} alt="logo" height={size} width={size} />
      <h2
        className={cn('gradient-text logo-font text-4xl uppercase', className)}
      >
        {companyName}
      </h2>
    </Link>
  );
}

export default AppLogoGradient;
