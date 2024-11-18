import React, {Suspense} from "react";
import StatsSkeleton from "@/src/app/[locale]/(feat)/(stats)/stats-skeleton";
import {TotalStatsCard, WeeklyStatsCard} from "@/src/app/[locale]/(feat)/(stats)/dashboard-cards";


export default function StatsCardGrid() {
  return (
      <div className="grid gap-4 md:grids-col-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-x-16">
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
      </div>
  )
}