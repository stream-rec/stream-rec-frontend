import createMiddleware from 'next-intl/middleware';
import {localePrefix} from "@/i18n";
import {NextRequest} from "next/server";


export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split('/')

  // Redirect to login page if no token is present or if the token is expired
  if (!isAuthenticated(request) && segments.join("/") !== "login") {
    request.nextUrl.pathname = `/${locale}/login`

  }

  const handleI18nRouting = createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'zh'],
    localePrefix,
    // Used when no locale matches
    defaultLocale: 'en',
  })


  const response = handleI18nRouting(request)
  return response;
}

const isAuthenticated = (request: NextRequest) => {
  const token = request.cookies.get("accessToken")?.value
  const tokenValidUntil = request.cookies.get("validUntil")?.value

  return token && tokenValidUntil && parseInt(tokenValidUntil) > Date.now()
}


export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en)/:path*',
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
}