import {Separator} from "@/components/new-york/ui/separator";
import PlatformFormWrapper from "@/app/dashboard/settings/platform/platform-form-wrapper";


export default function SettingsPlatformPage() {
  return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Platform</h3>
          <p className="text-sm text-muted-foreground">
            Configure streaming platforms recording settings.
          </p>
        </div>
        <Separator/>
        <PlatformFormWrapper/>
      </div>
  )
}