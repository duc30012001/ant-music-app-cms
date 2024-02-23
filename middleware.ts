import { NextRequest, NextResponse } from 'next/server';
import { COOKIES_KEY, DEFAULT_ROUTE } from './constants';
import { ADMIN_ROUTES } from './enums';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const cookieToken = req.cookies.get(COOKIES_KEY.REFRESH_TOKEN)?.value;
  const cookieLocale = req.cookies.get(COOKIES_KEY.LOCALE)?.value;

  if (cookieToken && req.nextUrl.pathname === ADMIN_ROUTES.AUTH) {
    const url = req.nextUrl.clone();
    url.pathname = DEFAULT_ROUTE;
    return NextResponse.redirect(url);
  }

  if (!cookieToken && req.nextUrl.pathname !== ADMIN_ROUTES.AUTH) {
    const url = req.nextUrl.clone();
    url.pathname = ADMIN_ROUTES.AUTH;
    return NextResponse.redirect(url);
  }

  if (cookieLocale && req.nextUrl.locale !== cookieLocale) {
    const newURL = `/${cookieLocale}${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(new URL(newURL, req.url));
  }
}
