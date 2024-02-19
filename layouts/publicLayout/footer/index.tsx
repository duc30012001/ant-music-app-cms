import { Container } from '@/components/appContainer';
import { AppLogoWithText } from '@/components/appLogo';
import { defaultConfig } from '@/constants';
import { PUBLIC_ROUTES } from '@/enums';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FaLocationDot } from 'react-icons/fa6';
import { MdLocalPhone, MdOutlineEmail } from 'react-icons/md';
import { publicRoutes } from '../routes';

type Props = {};

function PublicFooter({}: Props) {
  const currentYear = dayjs().format('YYYY');
  return (
    <footer className="relative bg-background py-20 text-text-color">
      <Container className="max-w-screen-xl">
        <ul className="grid grid-cols-2 gap-10 xl:grid-cols-4 xl:gap-20">
          <li className="col-span-2 grid justify-between gap-x-10 gap-y-2 sm:grid-cols-2 xl:flex xl:flex-col xl:gap-y-0">
            <div>
              <AppLogoWithText size={55} className="text-3xl" />
              <p className="mt-2 text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim in
                libero molestias ducimus excepturi eaque laudantium velit
                pariatur tempora rerum.
              </p>
            </div>
            <p className="sm:mt-12 sm:text-left xl:mt-0">
              <span>
                ©{currentYear} {defaultConfig.APP_SHORT_NAME}. All Rights
                Reserved.
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
          </li>

          <li>
            <h3 className="mb-4 text-xl font-extrabold text-title-color">
              Get In Touch
            </h3>
            <ul className="grid gap-2">
              <li className="flex gap-2">
                <FaLocationDot className="mt-1 min-w-5 text-xl" />
                <p>
                  2nd Floor, CT1A Sevin Office, 609 Truong Dinh, Thinh Liet,
                  Hoang Mai, Hanoi
                </p>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineEmail className="min-w-5 text-xl" />
                <p>contact@ant-media.net</p>
              </li>
              <li className="flex items-center gap-2">
                <MdLocalPhone className="min-w-5 text-xl" />
                <p>+84-922-98-5555</p>
              </li>
            </ul>
          </li>

          <li>
            <h3 className="mb-4 text-xl font-extrabold text-title-color">
              Get Started
            </h3>
            <ul className="grid gap-2">
              {publicRoutes.map((item) => {
                const { id, href, label } = item;
                return (
                  <li key={id}>
                    <Link
                      href={href}
                      className="font-medium hover:text-primary"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={PUBLIC_ROUTES.CONTACT}
                  className="font-medium hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </Container>
    </footer>
  );
}

export default PublicFooter;
