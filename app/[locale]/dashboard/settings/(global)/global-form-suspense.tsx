import {Suspense} from "react";
import GlobalFormWrapper from "@/app/[locale]/dashboard/settings/(global)/global-form-wrapper";
import {GlobalSettingSkeleton} from "@/app/[locale]/dashboard/settings/(global)/global-setting-skeleton";
import {fetchConfig} from "@/lib/data/config/apis";

export const GlobalFormSuspense = () => {

  const configPromise = fetchConfig()

  return (
      <>
        <Suspense fallback={<GlobalSettingSkeleton/>}>
          <GlobalFormWrapper appConfigPromise={configPromise}/>
        </Suspense>
      </>
  )
}