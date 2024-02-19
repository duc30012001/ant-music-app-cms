import { AppLogo } from '@/components/appLogo';
import { defaultConfig } from '@/constants';
import dayjs from 'dayjs';

type Props = {};

const APP_SHORT_NAME = process.env.APP_SHORT_NAME ?? '';

function CopyRight({}: Props) {
  const currentYear = dayjs().format('YYYY');
  return (
    <div className="my-10 grid gap-14 sm:grid-cols-2 lg:flex-row lg:justify-between">
      <p className="text-center sm:text-left">
        <span>
          ©{currentYear} {APP_SHORT_NAME}. All Rights Reserved.
        </span>
        <br />
        <span>
          Owned by{' '}
          <a
            href={defaultConfig.ANT_GROUP_WEBSITE}
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
          >
            ANT Group
          </a>
        </span>
      </p>
      <AppLogo />
    </div>
  );
}

export default CopyRight;
