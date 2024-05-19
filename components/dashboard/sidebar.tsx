import Link from "next/link";

import {cn} from "@/lib/utils";
import {Button} from "@/components/new-york/ui/button";
import {Menu} from "@/components/dashboard/menu";
import {SidebarToggle} from "@/components/dashboard/sidebar-toggle";
import {useStore} from "zustand";
import {useSidebarToggle} from "@/app/hooks/use-sidebar-toggle";
import StreamRecIcon from "@/components/Logo";


export type SidebarStrings = {
  dashboard: string
  streamers: string
  records: string
  uploads: string
  users: string
  settings: string
  logout: string
}

export function Sidebar({navStrings}: { navStrings: SidebarStrings }) {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
      <aside
          className={cn(
              "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
              sidebar?.isOpen === false ? "w-[90px]" : "w-72"
          )}
      >
        <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen}/>
        <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
          <Button
              className={cn(
                  "transition-transform ease-in-out duration-300 mb-1",
                  sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
              )}
              variant="link"
              asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 mr-4">
                <StreamRecIcon fill="#e3e3e5"/>
              </div>
              <h1
                  className={cn(
                      "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                      sidebar?.isOpen === false
                          ? "-translate-x-96 opacity-0 hidden"
                          : "translate-x-0 opacity-100"
                  )}
              >
                Stream-rec
              </h1>
            </Link>
          </Button>
          <Menu isOpen={sidebar?.isOpen} navStrings={navStrings}/>
        </div>
      </aside>
  );
}
