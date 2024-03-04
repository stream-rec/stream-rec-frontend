import React, {Suspense} from "react";
import StatsSkeleton from "@/app/dashboard/(overview)/(stats)/stats-skeleton";
import {TotalStatsCard} from "@/app/dashboard/(overview)/(stats)/total-stats";
import {WeeklyStatsCard} from "@/app/dashboard/(overview)/(stats)/weekly-stats";

export default function StatsCardWrapper() {

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