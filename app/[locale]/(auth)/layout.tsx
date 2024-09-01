import {unstable_setRequestLocale} from "next-intl/server";
import React from "react";

export default function AuthLayout({children, params: {locale}}: { children: Readonly<React.ReactNode>; params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return <>
    <div className={"w-screen h-screen bg-gradient-to-r from-[#a6c0fe] to-[#f68084]"}>
      {children}
    </div>
  </>
}