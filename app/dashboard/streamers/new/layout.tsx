import {Separator} from "@/components/new-york/ui/separator";
import React from "react";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
      <>
        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">New streamer</h2>
            <p className="text-muted-foreground">
              Add a new streamer to your list.
            </p>
          </div>
          <Separator className="my-6"/>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </>
  )
}