import {getTranslations, unstable_setRequestLocale} from "next-intl/server";


export async function generateMetadata({params: {locale}}: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title')
  };
}

export default function Index({params: {locale}}: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <main className="flex w-full h-full flex-col min-h-svh">
  </main>
}