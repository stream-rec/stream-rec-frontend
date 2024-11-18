import {Navbar} from "@/src/components/dashboard/navbar";
import React from "react";
import {useSidebarTranslations} from "@/src/app/hooks/translations/use-sidebar-translations";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({title, children}: ContentLayoutProps) {

  const sidebarStrings = useSidebarTranslations();
  return (
      <div>
        <Navbar title={title} navStrings={sidebarStrings}/>
        <div className="pt-8 pb-8 px-4 sm:px-8">{children}</div>
      </div>
  );
}
