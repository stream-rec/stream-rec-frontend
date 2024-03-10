import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {createSharedPathnamesNavigation} from "next-intl/navigation";


export const locales = ['en', 'zh'];
export const localePrefix = 'always'; // Default

export const {Link, redirect, usePathname, useRouter} =
    createSharedPathnamesNavigation({locales, localePrefix});

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    defaultTranslationValues: {
      important: (chunks) => <><br/><b>{chunks}</b></>,
      code: (chunks) => <><br/><code>{chunks}</code></>
    },
    formats: {
      dateTime: {
        short: {
          year: '2-digit',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }
      },
      number: {
        precise: {
          maximumFractionDigits: 2
        }
      },
      list: {
        enumeration: {
          style: 'long',
          type: 'conjunction'
        }
      }
    },
    messages: (await import(`./messages/${locale}.json`)).default
  };
});