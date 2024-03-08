import {Separator} from "@/components/new-york/ui/separator";
import GlobalFormWrapper from "@/app/dashboard/settings/global-form-wrapper";
import {AlertTriangleIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/new-york/ui/alert";
import React from "react";

export default function Settings() {
  return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Global settings</h3>
          <p className="text-sm text-muted-foreground">
            This is where you can update your global settings.
          </p>
          <div className={"mt-6"}>
            <Alert variant={"destructive"} className={""}>
              <AlertTriangleIcon className="h-4 w-4"/>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Changing some of these settings may require a manual reboot
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <Separator/>
        <GlobalFormWrapper/>
      </div>
  )
}