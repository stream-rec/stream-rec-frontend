import React from "react";
import {unstable_setRequestLocale} from "next-intl/server";
import {Inter} from "next/font/google";
import type {Metadata} from "next";
import {ThemeProvider} from "@/components/theme/theme-provider";
import {Toaster} from "@/components/new-york/ui/sonner";

const locales = ['en', 'zh'];
const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Stream-rec",
  description: "Automatic streaming record tool powered by Kotlin coroutines, flow, serialization, sqldelight, and ktor. 虎牙/抖音/斗鱼/Twitch/PandaTV直播，弹幕自动录制",
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function LocaleLayout({
                                       children,
                                       params: {locale}
                                     }: {
  children: Readonly<React.ReactNode>;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

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
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster richColors closeButton duration={3000}/>
      </body>
      </html>

  );
}