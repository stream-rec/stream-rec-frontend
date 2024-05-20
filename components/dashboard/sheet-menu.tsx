import {Link} from "@/i18n";
import {MenuIcon} from "lucide-react";

import {Button} from "@/components/new-york/ui/button";
import {Menu} from "@/components/dashboard/menu";
import {Sheet, SheetContent, SheetHeader, SheetTrigger,} from "@/components/new-york/ui/sheet";
import {SidebarStrings} from "@/components/dashboard/sidebar";
import StreamRecIcon from "@/components/Logo";

export function SheetMenu({navStrings}: { navStrings: SidebarStrings }) {
  return (
      <Sheet>
        <SheetTrigger className="lg:hidden" asChild>
          <Button className="h-8" variant="outline" size="icon">
            <MenuIcon size={20}/>
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
          <SheetHeader>
            <Button
                className="flex justify-center items-center pb-2 pt-1"
                variant="link"
                asChild
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 mr-1">
                  <StreamRecIcon/>
                </div>
                <h1 className="font-bold text-lg">Stream-rec</h1>
              </Link>
            </Button>
          </SheetHeader>
          <Menu navStrings={navStrings} isOpen/>
        </SheetContent>
      </Sheet>
  );
}
