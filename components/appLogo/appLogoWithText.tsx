import logoImage from '@/assets/logo/logo.png';
import { defaultConfig } from '@/constants';
import { PUBLIC_ROUTES } from '@/enums';
import { cn } from '@/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { AppLogoProps } from './appLogo';

type Props = {
  className?: string;
  wrapperClassName?: string;
  size?: number;
} & AppLogoProps;

function AppLogoWithText({ className, wrapperClassName, size = 70 }: Props) {
  const src = logoImage;
  const companyName = defaultConfig.APP_SHORT_NAME;

  return (
    <Link
      href={PUBLIC_ROUTES.HOME}
      className={cn('flex w-fit items-center gap-2', wrapperClassName)}
    >
      <Image src={src} alt="logo" height={size} width={size} />
      <h2
        className={cn(
          'logo-font text-title-color text-4xl uppercase',
          className
        )}
      >
        {companyName}
      </h2>
    </Link>
  );
}

export default AppLogoWithText;
