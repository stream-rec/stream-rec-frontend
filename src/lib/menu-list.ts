import {FileVideo2, HardDrive, LayoutGrid, Settings, UploadCloud, Users} from "lucide-react";
import {SidebarStrings} from "@/src/app/hooks/translations/use-sidebar-translations";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, navStrings: SidebarStrings): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: navStrings.dashboard,
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/streamers",
          label: navStrings.streamers,
          active: pathname.includes("/streamer"),
          icon: Users,
          submenus: []
        },
        {
          href: "/records",
          label: navStrings.records,
          active: pathname.includes("/records"),
          icon: FileVideo2,
          submenus: []
        },
        {
          href: "/uploads",
          label: navStrings.uploads,
          active: pathname.includes("/uploads"),
          icon: UploadCloud,
          submenus: []
        }
      ]
    },
    {
      groupLabel: navStrings.settings,
      menus: [

        // {
        //   href: "/users",
        //   label: navStrings.users,
        //   active: pathname.includes("/users"),
        //   icon: Users,
        //   submenus: []
        // },
        {
          href: "/server",
          label: navStrings.serverInfo,
          active: pathname.includes("/server"),
          icon: HardDrive,
          submenus: []
        },
        {
          href: "/settings",
          label: navStrings.settings,
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
