import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger,} from "@/components/new-york/ui/context-menu"
import React from "react";
import Image from "next/image";


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
  target: string | undefined
}


export function OpenVideoContextMenu({children, url, string}: OpenVideoContextMenuProps) {

  const intentSchemas = [
    {
      url: "",
      title: string.download,
      target: "_blank",
    },
    {
      url: "potplayer://",
      title: string.openWithPotPlayer,
      icon: "/icons/potplayer.svg",
      alt: "potplayer icon",
    }
  ] as IntentSchema[]

  const openUrl = (prefixUrl: string, target: string | undefined) => window.open(prefixUrl + url, target)

  return (
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {intentSchemas.map((intent, index) => (
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