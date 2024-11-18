import React from "react";
import {Inter} from "next/font/google";
import type {Metadata} from "next";
import {ThemeProvider} from "@/src/components/theme/theme-provider";
import {Toaster} from "@/src/components/new-york/ui/sonner";
import {getServerSession} from "next-auth";
import {routing} from "@/src/i18n/routing";
import {notFound} from "next/navigation";
import {getMessages, setRequestLocale} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import SessionProvider from "@/src/components/session/SessionProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Stream-rec",
  description: "Automated stream recording solution. 虎牙/抖音/斗鱼/Twitch/PandaTV直播，弹幕自动录制",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
                                             children,
                                             params: {locale}
                                           }: {
  children: Readonly<React.ReactNode>;
  params: { locale: string };
}) {

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const session = await getServerSession();

  let s = process.env['APP_CONTEXT'] ?? '';
  s = s.trim();
  const APP_CONTEXT = s.startsWith('/') ? s.substring(1) : s;


  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (

      <html lang={locale}>
      <head>
        <link rel="icon" href="/stream-rec.svg" sizes="any"/>
        <link
            rel="icon"
            href="/stream-rec.svg?<generated>"
            type="image/<generated>"
            sizes="<generated>"
        />
        <title>Stream-rec</title>
        <script>

        </script>
      </head>
      <body className={inter.className}>
      <SessionProvider session={session} basePath={APP_CONTEXT}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </SessionProvider>
      <Toaster richColors closeButton duration={3000}/>
      </body>
      </html>

  );
}