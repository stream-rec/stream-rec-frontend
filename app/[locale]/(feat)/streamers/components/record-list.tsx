'use client';
import React from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/new-york/ui/collapsible";
import {Button} from "@/components/new-york/ui/button";

import {StreamerCardProps} from "@/app/[locale]/(feat)/streamers/components/streamer-card";
import {CaretDownIcon, CaretUpIcon} from "@radix-ui/react-icons";
import {toStreamerCard} from "@/app/[locale]/(feat)/streamers/components/streamer-list-wrapper";
import {OpenVideoContextMenuStrings} from "@/app/[locale]/(feat)/streamers/components/open-video-context-menu";
import {updateStatus} from "@/lib/data/streams/streamer-apis";

type RecordListProps = {
  title: string,
  cards: StreamerCardProps[],
  contextMenuStrings: OpenVideoContextMenuStrings,
  updateStatus: (id: string, status: boolean) => ReturnType<typeof updateStatus>,
  deleteStreamerAction: (id: string) => Promise<void>
}

export function RecordList({cards, title, contextMenuStrings, updateStatus, deleteStreamerAction}: RecordListProps) {

  const [isOpen, setIsOpen] = React.useState(true)

  return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={"space-y-2"}>
        <div className="flex items-center space-x-4 justify-between">
          <h3 className="text-xm font-semibold"> {title}</h3>
          <h3 className="text-xs px-2 py-0.5 bg-muted rounded-md">{cards.length}</h3>

          <div className={"flex-1"}>
            <CollapsibleTrigger className={"float-end"} asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? <CaretDownIcon/> : <CaretUpIcon/>}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

        </div>

        <CollapsibleContent className="space-y-4">
          <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2"}>
            {
              cards.map(streamer => toStreamerCard(streamer, contextMenuStrings, updateStatus, deleteStreamerAction))
            }
          </div>

        </CollapsibleContent>
      </Collapsible>
  )

}
