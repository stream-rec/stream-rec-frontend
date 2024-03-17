import React from "react";
import {Separator} from "@/components/new-york/ui/separator";

type SettingsPageProps = {
  top?: React.ReactNode,
  children: React.ReactNode,
  strings: {
    title: string,
    description: string
  }
}

export function SettingsPage({top, children, strings}: SettingsPageProps) {
  return (
      <>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{strings.title}</h3>
            <p className="text-sm text-muted-foreground">
              {strings.description}
            </p>
            {top}
          </div>
          <Separator/>
          {children}
        </div>
      </>
  )
}