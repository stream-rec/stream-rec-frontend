import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger,} from "@/components/new-york/ui/context-menu"
import React from "react";
import Image from "next/image";
import {useMediaQuery} from "@/app/hooks/use-media-query";


type OpenVideoContextMenuProps = {
  children: React.ReactNode,
  url: string,
  string: OpenVideoContextMenuStrings
}

export type OpenVideoContextMenuStrings = {
  download: string,
  openWithPotPlayer: string
}

type IntentSchema = {
  url: string,
  title: string,
  icon: string | undefined,
  alt: string | undefined,
  target: string | undefined,
  showOnMobile: boolean
  ShowOnDesktop: boolean
}


export function OpenVideoContextMenu({children, url, string}: OpenVideoContextMenuProps) {

  const isMobile = useMediaQuery("(max-width: 640px)")

  const intentSchemas = [
    {
      url: "",
      title: string.download,
      target: "_blank",
      alt: "download icon",
      ShowOnDesktop: true,
      showOnMobile: true
    },
    {
      url: "potplayer://$durl",
      title: string.openWithPotPlayer,
      icon: "/icons/potplayer.svg",
      alt: "potplayer icon",
      ShowOnDesktop: true,
      showOnMobile: false
    },
    {
      url: "intent:$durl#Intent;package=com.mxtech.videoplayer.ad;S.title=$name;end",
      title: string.openWithPotPlayer.replace("PotPlayer", "MxPlayer"),
      icon: "/icons/mxplayer.svg",
      alt: "MX Player icon",
      ShowOnDesktop: false,
      showOnMobile: true
    },
    {
      url: "intent:$durl#Intent;package=com.mxtech.videoplayer.pro;S.title=$name;end",
      title: string.openWithPotPlayer.replace("PotPlayer", "MxPlayer Pro"),
      icon: "/icons/mxplayer.svg",
      alt: "MX Player icon",
      ShowOnDesktop: false,
      showOnMobile: true
    }
  ] as IntentSchema[]

  const openUrl = (prefixUrl: string, target: string | undefined) => window.open(prefixUrl.replace("$durl", url), target)


  const filteredIntents = React.useMemo(() => {
    return intentSchemas.filter(intent => {
      return (isMobile && intent.showOnMobile) || (!isMobile && intent.ShowOnDesktop)
    })
  }, [isMobile])

  return (
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {filteredIntents.map((intent, index) => (
              <ContextMenuItem key={index} inset onClick={() => openUrl(intent.url, intent.target)}>
                {intent.title}
                {intent.icon && (
                    <ContextMenuShortcut>
                      <Image src={intent.icon} alt={intent.alt || ''} width={24} height={24}/>
                    </ContextMenuShortcut>
                )}
              </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </ContextMenu>
  )
}