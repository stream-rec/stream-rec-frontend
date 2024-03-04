import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import {Toaster} from "@/components/new-york/ui/sonner";
import {ThemeProvider} from "@/components/theme/theme-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Stream-rec",
  description: "Automatic streaming record tool using Kotlin coroutines, flow, sqldelight, and ktor. 虎牙/抖音直播自动录制",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <link rel="icon" href="/stream-rec.png" sizes="any"/>
        <link
            rel="icon"
            href="/stream-rec.png?<generated>"
            type="image/<generated>"
            sizes="<generated>"
        />
        <title>Stream-rec</title>
      </head>
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <main>{children}</main>
      </ThemeProvider>
      <Toaster richColors closeButton duration={5000}/>
      </body>
      </html>
  );
}
