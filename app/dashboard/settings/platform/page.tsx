import {Separator} from "@/components/new-york/ui/separator";
import PlatformForm from "@/app/dashboard/settings/platform/platform-form";


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
        <PlatformForm/>
      </div>
  )
}