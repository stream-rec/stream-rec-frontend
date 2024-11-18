import {useTranslations} from "next-intl";


export type SidebarStrings = {
  dashboard: string
  streamers: string
  records: string
  uploads: string
  users: string
  settings: string
  serverInfo: string
  logout: string
}

export const useSidebarTranslations = () => {
  const t = useTranslations("Sidebar")
  return {
    dashboard: t("dashboard"),
    streamers: t("streamers"),
    records: t("records"),
    settings: t("settings"),
    uploads: t("uploads"),
    serverInfo: t("serverInfo"),
    logout: t("logout"),
  } as SidebarStrings
}