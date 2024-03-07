import PlatformForm from "@/app/dashboard/settings/platform/platform-form";
import {fetchConfig} from "@/app/lib/data/config/apis";

export default async function PlatformFormWrapper(){

  const config = await fetchConfig()

  return (
      <>
        <PlatformForm defaultValues={config}/>
      </>
  )
}