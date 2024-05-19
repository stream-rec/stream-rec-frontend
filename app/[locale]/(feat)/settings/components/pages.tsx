import React from "react";

type SettingsPageProps = {
  children: React.ReactNode,
}

export function SettingsPage({children}: SettingsPageProps) {
  return (
      <>
        <div className="space-y-6">
          {children}
        </div>
      </>
  )
}