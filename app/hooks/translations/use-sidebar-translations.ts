import {useTranslations} from "next-intl";
import {SidebarStrings} from "@/components/dashboard/sidebar";

export const useSidebarTranslations = () => {
  const t = useTranslations("Sidebar")
  return {
    dashboard: t("dashboard"),
    streamers: t("streamers"),
    records: t("records"),
    settings: t("settings"),
    uploads: t("uploads"),
    logout: t("logout"),
  } as SidebarStrings
}