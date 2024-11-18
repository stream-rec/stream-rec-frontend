import {Skeleton} from "@/src/components/new-york/ui/skeleton";
import React from "react";

export default function StreamerListSkeleton() {

  const generateSkeleton = (id: number) => {
    return <Skeleton key={id}>
      <div className="flex flex-row items-center space-x-4 p-10">
        <Skeleton className="h-12 w-12 rounded-full lg:h-12 lg:w-12"/>
        <div className="space-y-2">
          <Skeleton className="h-4 w-10 md:w-40 lg:w-20 xl:w-12"/>
          <Skeleton className="h-4 w-12 md:w-40 lg:w-20 xl:w-12"/>
        </div>
      </div>
    </Skeleton>
  }

  return (
      <>
        <div className={"grid gap-3 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7"}>
          {
            Array.from({length: 10}, (_, i) => {
              return <div key={i} className={""}>
                {generateSkeleton(i)}
              </div>
            })
          }
        </div>

      </>
  )
}