import {ModeToggle} from "@/components/theme/mode-toggle";
import {SheetMenu} from "@/components/dashboard/sheet-menu";
import {SidebarStrings} from "@/components/dashboard/sidebar";

interface NavbarProps {
  title: string;
  navStrings: SidebarStrings;
}

export function Navbar({title, navStrings}: NavbarProps) {
  return (
      <header
          className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
        <div className="mx-4 sm:mx-8 flex h-14 items-center">
          <div className="flex items-center space-x-4 lg:space-x-0">
            <SheetMenu navStrings={navStrings}/>
            <h1 className="font-bold">{title}</h1>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <ModeToggle/>
          </div>
          {/*<div className="flex flex-1 items-center space-x-2 justify-end">*/}
          {/*  <ModeToggle/>*/}
          {/*  /!*<UserNav/>*!/*/}
          {/*</div>*/}
        </div>
      </header>
  );
}
