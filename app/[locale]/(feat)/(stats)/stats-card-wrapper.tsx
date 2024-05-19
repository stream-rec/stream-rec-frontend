import React, {Suspense} from "react";
import StatsSkeleton from "@/app/[locale]/(feat)/(stats)/stats-skeleton";
import {TotalStatsCard, WeeklyStatsCard} from "@/app/[locale]/(feat)/(stats)/dashboard-cards";


export default async function StatsCardWrapper() {

  return (
      <>
        <div className="space-y-4 lg:col-span-1">
          <Suspense fallback={<StatsSkeleton/>}>
            <TotalStatsCard/>
          </Suspense>
        </div>
        <div className="space-y-4 lg:col-span-1">
          <Suspense fallback={<StatsSkeleton/>}>
            <WeeklyStatsCard/>
          </Suspense>
        </div>
      </>
  )
}