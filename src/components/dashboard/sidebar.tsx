import {Link} from "@/src/i18n/routing";

import {cn} from "@/src/lib/utils";
import {Button} from "@/src/components/new-york/ui/button";
import {Menu} from "@/src/components/dashboard/menu";
import {SidebarToggle} from "@/src/components/dashboard/sidebar-toggle";
import {useStore} from "zustand";
import {useSidebarToggle} from "@/src/app/hooks/use-sidebar-toggle";
import StreamRecIcon from "@/src/components/Logo";
import {SidebarStrings} from "@/src/app/hooks/translations/use-sidebar-translations";


export function Sidebar({navStrings}: { navStrings: SidebarStrings }) {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

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
              <div className="w-10 h-10 mr-1">
                <StreamRecIcon/>
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
