import createMiddleware from 'next-intl/middleware';
import { localePrefix, routing } from "@/src/i18n/routing";
import { auth } from "@/auth"

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
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  // for public pages, pass through intlMiddleware
  if (isPublicPage) {
    return intlMiddleware(req);
  }
  // for protected pages, redirect to login page
  else if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  // pass through intlMiddleware for logged in users
  return intlMiddleware(req);
})


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}