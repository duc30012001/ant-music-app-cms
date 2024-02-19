import { AppLogoWithText } from '@/components/appLogo';

type Props = {};

const logoHeight = 50;

function Logo({}: Props) {
  return (
    <AppLogoWithText size={logoHeight} className="hidden text-3xl md:block" />
  );
}

export default Logo;
