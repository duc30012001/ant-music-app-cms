import Link from 'next/link';
import { footerRoutes } from '../routes';

type Props = {};

function FooterNav({}: Props) {
  return (
    <ul className="mb-20 grid gap-14 sm:grid-cols-2">
      {footerRoutes.map((item) => (
        <li key={item.id}>
          <h3 className="mb-4 text-xl font-extrabold text-title-color">
            {item.label}
          </h3>
          <ul className="flex list-none flex-col space-y-3">
            {item.children.map((child) => (
              <li key={child.id}>
                {child.href ? (
                  <Link
                    href={child.href}
                    target={child.target ?? '_self'}
                    className="font-medium hover:text-primary"
                  >
                    {child.label}
                  </Link>
                ) : (
                  <span className="font-medium">{child.label}</span>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default FooterNav;
