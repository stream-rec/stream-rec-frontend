import createMiddleware from 'next-intl/middleware';
import { localePrefix, routing } from "@/src/i18n/routing";
import { auth } from "@/auth"
import { BASE_PATH } from './lib/routes';

const publicPages = ['/', '/login'];

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: routing.locales,
  localePrefix: localePrefix,
  // Used when no locale matches
  defaultLocale: 'en',
})

export default auth((req) => {

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  console.log("req.nextUrl.pathname:", req.nextUrl.pathname)

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // for public pages, pass through intlMiddleware
  if (isPublicPage) {
    console.log("public page:", req.nextUrl.pathname)
    return intlMiddleware(req);
  }
  // for protected pages, redirect to login page if not logged
  else if (!req.auth && req.nextUrl.pathname !== "/login") {
    console.log("not logged in, protected page:", req.nextUrl.pathname)
    // if the user is already on the login page, pass through intlMiddleware
    if (req.nextUrl.pathname === BASE_PATH + '/login') { 
      console.log("inside login page")
      return intlMiddleware(req);
    }
    // find locale from pathname
    const locale = routing.locales.find(l => req.nextUrl.pathname.startsWith(`/${l}`));
    const loginPath = locale ? `/${locale}/login` : '/login';
    const finalPath = BASE_PATH + loginPath
    console.log("finalPath:", finalPath)
    return Response.redirect(new URL(finalPath, req.nextUrl.origin))
  }
  console.log("logged in, protected page:", req.nextUrl.pathname)
  // pass through intlMiddleware for logged in users
  return intlMiddleware(req);
})


export const config = {
  matcher: [
    "/((?!api|icons|_next/static|_next/image|favicon.ico|.*\\.svg).*)"
  ]
}