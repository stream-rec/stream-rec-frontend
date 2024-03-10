import createMiddleware from 'next-intl/middleware';
import {localePrefix} from "@/i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh'],
  localePrefix,
  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en)/:path*',
    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};