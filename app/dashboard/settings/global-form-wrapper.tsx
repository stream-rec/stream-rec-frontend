import {fetchConfig, updateConfig} from "@/app/lib/data/config/apis";
import {GlobalForm} from "@/app/dashboard/settings/global-form";


export default async function GlobalFormWrapper(){

  const appConfig = await fetchConfig()


  return (
    <>
      <GlobalForm appConfig={appConfig} update={updateConfig}/>
    </>
    )

}