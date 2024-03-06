import {Separator} from "@/components/new-york/ui/separator";
import React from "react";

type LayoutProps = {
  children: React.ReactNode

}
export default function Layout({children}: LayoutProps) {
  return (
      <>
        <div className="space-y-6 p-8 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Upload details</h2>
            <p className="text-muted-foreground">
              View upload details.
            </p>
          </div>
          <Separator className="my-6"/>
          <div className={"flex-1 lg:max-w-2xl"}>
            {children}
          </div>
        </div>
      </>
  )
}