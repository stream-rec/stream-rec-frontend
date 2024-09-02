'use client'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/new-york/ui/card";
import React, {useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/new-york/ui/avatar";
import {cn} from "@/lib/utils";
import {clsx} from "clsx";
import {Badge} from "@/components/new-york/ui/badge";
import {Button} from "@/components/new-york/ui/button";
import {SettingsIcon, Trash2Icon, UserCog, UserRoundCog} from "lucide-react";
import {Separator} from "@/components/new-york/ui/separator";
import {Link, useRouter} from "@/i18n";
import {toast} from "sonner";
import {DeleteIconDialog} from "@/app/components/dialog/delete-icon-dialog";
import {OpenVideoContextMenu, OpenVideoContextMenuStrings} from "@/app/[locale]/(feat)/streamers/components/open-video-context-menu";
import Marquee from "react-fast-marquee";

export type StreamerCardProps = {
  streamer: string;
  description?: string | null;
  streamerId: number;
  streamerAvatar?: string | null;
  isLive?: boolean | null;
  isActivated: boolean;
  lastStream?: string | null;
  platform: string;
  template?: string | null;
  bitrate?: string | null;
  duration?: string | null;
  liveUrl: string;
  downloadUrl?: string;
  contextMenuStrings: OpenVideoContextMenuStrings;
  deleteStreamer: (id: string) => Promise<void>;
}


export function StreamerCard({
                               streamer,
                               description,
                               streamerId,
                               streamerAvatar,
                               isLive,
                               isActivated,
                               lastStream,
                               platform,
                               template,
                               bitrate,
                               duration,
                               downloadUrl,
                               liveUrl,
                               contextMenuStrings,
                               deleteStreamer,
                             }: StreamerCardProps) {

  const router = useRouter()

  // description marquee hover state
  const [isHovered, setIsHovered] = useState(false);

  function openUrl(liveUrl: string) {
    // open a new tab with the liveUrl
    return () => {
      window.open(liveUrl, "_blank")
    }
  }

  return (
      <>
        <Card>
          <div className={"flex flex-row items-center mr-2 justify-end space-x-0.5 md:space-x-1"}>
            {duration && <> <p className={"text-muted-foreground text-[0.70rem]"}>{duration}</p></>}
            {bitrate && <>
                <Separator orientation={"vertical"} className={"h-4"}/>
                <p className={"text-muted-foreground text-[0.70rem]"}>{bitrate} kbps</p>
            </>}
            <Link href={`/streamers/${streamerId}/edit`}>
              <Button variant={"ghost"} size={"icon"} className={"rounded-full p-2"}><SettingsIcon
                  className={"w-4 h-4"}/></Button>
            </Link>
            <Separator orientation={"vertical"} className={"h-4"}/>
            <DeleteIconDialog
                icon={<Button variant={"ghost"} size={"icon"} className={"rounded-full p-2"}><Trash2Icon
                    className={"w-4 h-4"}/></Button>}
                onDelete={
                  async () => {
                    toast.promise(deleteStreamer(streamerId.toString()), {
                      loading: `Deleting ${streamer}...`,
                      success: () => {
                        router.refresh()
                        return "Streamer deleted"
                      },
                      error: (error) => `An error occurred while deleting streamer : ${error}`
                    })
                  }
                }/>
          </div>
          <CardHeader className={"pt-0 pb-3 lg:pb-6"}>
            <div className={"space-y-4 md:flex md:flex-row md:space-x-2.5 items-center md:space-y-0"}>
              {
                  downloadUrl && <OpenVideoContextMenu url={downloadUrl} string={contextMenuStrings}>
                      <Avatar onClick={openUrl(liveUrl)} className={"cursor-pointer"}>
                          <AvatarImage src={streamerAvatar ?? ""} alt={streamer}></AvatarImage>
                          <AvatarFallback><UserRoundCog/></AvatarFallback>
                      </Avatar>
                  </OpenVideoContextMenu>
              } {!downloadUrl && <Avatar>
                <AvatarImage src={streamerAvatar ?? ""} alt={streamer}></AvatarImage>
                <AvatarFallback><UserRoundCog/></AvatarFallback>
            </Avatar>
            }
              <div className={"flex flex-col space-y-1 overflow-hidden text-nowrap"}>
                <div className={"relative flex flex-row items-center space-x-2.5 gap-x-1"}>
                  <CardTitle className={clsx(cn("2xl:text-sm line-clamp-1"), {"md:self-center": description})}>
                    {streamer}
                  </CardTitle>
                </div>
                {description &&
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <Marquee className={"text-[0.75rem] md:text-sm text-muted-foreground"} speed={55}
                                 play={isHovered}>
                            <p className={"pr-2"}>{description}</p>
                        </Marquee>
                    </div>
                }
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center gap-x-1.5 mr-2">
              {!template && (
                  <>
                    <Badge variant={"default"}>{platform}</Badge>
                    <Badge variant={"secondary"} className={"line-clamp-2"}>{lastStream}</Badge>
                  </>
              )}
              {
                  template && (
                      <Badge variant={"default"}>{template}</Badge>
                  )
              }
            </div>
          </CardContent>
        </Card>
      </>
  )
}