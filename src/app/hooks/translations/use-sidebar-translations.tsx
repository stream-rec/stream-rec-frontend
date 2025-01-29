import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export type SidebarStrings = {
  dashboard: string
  streamers: string
  records: string
  uploads: string
  users: string
  settings: string
  playground: string
  serverInfo: string
  logout: string
}

export async function getSidebarTranslations() {
  const t = await getTranslations('Sidebar');
  
  return {
    dashboard: t('dashboard'),
    streamers: t('streamers'),
    records: t('records'),
    settings: t('settings'),
    uploads: t('uploads'),
    playground: t('playground'),
    serverInfo: t('serverInfo'),
    logout: t('logout'),
  } as SidebarStrings;
}

export function useSidebarTranslations() {
  const t = useTranslations('Sidebar');
  return {
    dashboard: t('dashboard'),
    streamers: t('streamers'),
    records: t('records'),
    settings: t('settings'),
    uploads: t('uploads'),
    playground: t('playground'),
    serverInfo: t('serverInfo'),
    logout: t('logout'),
  } as SidebarStrings;
}

