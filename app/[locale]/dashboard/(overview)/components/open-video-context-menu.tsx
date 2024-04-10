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

export function OpenVideoContextMenu({children, url, string}: OpenVideoContextMenuProps) {

  function potplayer() {
    if (url) {
      window.open(`potplayer://${url}`)
    }
  }

  function download() {
    if (url) {
      window.open(url, "_blank")
    }
  }

  return (
      <ContextMenu>
        <ContextMenuTrigger>
          {children}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset onClick={download}>
            {string.download}
          </ContextMenuItem>
          <ContextMenuItem inset onClick={potplayer}>
            {string.openWithPotPlayer}
            <ContextMenuShortcut>
              <Image src={"/icons/potplayer.svg"} alt={"potplayer icon"} width={24} height={24}/>
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
  )
}