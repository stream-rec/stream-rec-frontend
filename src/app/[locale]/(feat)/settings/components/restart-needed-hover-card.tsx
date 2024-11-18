import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@/src/components/new-york/ui/hover-card"
import {AlertTriangleIcon, TriangleAlert} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/src/components/new-york/ui/alert";
import React from "react";

export type RestartNeededHoverCardProps = {
  title: string
  description: string
}

export function RestartNeededHoverCard({title, description}: RestartNeededHoverCardProps) {

  return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <TriangleAlert className="h-4 w-4 text-destructive dark:border-destructive [&>svg]:text-destructive"/>
        </HoverCardTrigger>
        <HoverCardContent className="w-100 p-0">
          <Alert variant={"destructive"} className={"rounded-md border"}>
            <AlertTriangleIcon className="h-4 w-4"/>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
              {description}
            </AlertDescription>
          </Alert>
        </HoverCardContent>
      </HoverCard>
  )
}
