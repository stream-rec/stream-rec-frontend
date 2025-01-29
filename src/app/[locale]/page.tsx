import { getTranslations } from "next-intl/server";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' });


  return {
    title: t('title')
  };
}

export default function Index() {
  return <main className="flex w-full h-full flex-col min-h-svh">
  </main>
}