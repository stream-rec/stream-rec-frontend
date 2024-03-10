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
  description: "Automatic streaming record tool using Kotlin coroutines, flow, sqldelight, and ktor. 虎牙/抖音直播自动录制",
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
        <link rel="icon" href="/stream-rec.png" sizes="any"/>
        <link
            rel="icon"
            href="/stream-rec.png?<generated>"
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
      <Toaster richColors closeButton duration={5000}/>
      </body>
      </html>

  );
}