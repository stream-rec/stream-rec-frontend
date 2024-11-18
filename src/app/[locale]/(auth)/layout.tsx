import React from "react";

export default function AuthLayout({children}: { children: Readonly<React.ReactNode>; }) {

  return <div className={"w-screen h-screen bg-gradient-to-r from-[#a6c0fe] to-[#f68084]"}>
    {children}
  </div>
}