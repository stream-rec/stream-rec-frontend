import React, {Suspense} from "react";
import StreamerWrapper from "@/app/dashboard/(overview)/(streamers)/streamer-wrapper";
import {StreamerWrapperSkeleton} from "@/app/dashboard/(overview)/(streamers)/streamer-wrapper-skeleton";
import StatsCardWrapper from "@/app/dashboard/(overview)/(stats)/stats-card-wrapper";

export default async function DashboardPage() {
  return (
      <>
        <div className="flex-1 flex-col space-y-8 p-8 flex">

          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Summary of streams and other data.
              </p>
            </div>
          </div>
          <div className="flex-grow space-y-6">
            <div className="grid gap-4 md:grids-col-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-x-16">
              <StatsCardWrapper/>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Streamers</h2>
            <div
                className="grid gap-4 grid-cols-1 md:grids-col-3 lg:grid-cols-3 lg:space-x-8">
              <Suspense fallback={<StreamerWrapperSkeleton/>}>
                <StreamerWrapper/>
              </Suspense>
            </div>
          </div>

        </div>
      </>
  )
}