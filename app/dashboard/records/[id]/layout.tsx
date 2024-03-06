import {Separator} from "@/components/new-york/ui/separator";
import React from "react";

type StreamCardLayoutProps = {
  children: React.ReactNode

}
export default function StreamCardLayout({children}: StreamCardLayoutProps) {
  return (
      <>
        <div className="space-y-6 p-8 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Stream details</h2>
            <p className="text-muted-foreground">
              View stream details.
            </p>
          </div>
          <Separator className="my-6"/>
          {children}
        </div>
      </>
  )
}