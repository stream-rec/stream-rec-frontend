import {CardsStats} from "@/app/dashboard/components/cards/stats";
import {placeholderStreamers, placeholderWeeklyStats, placeholderYearlyStats,} from "@/app/lib/placeholder-data";
import React from "react";
import {RecordList} from "@/app/dashboard/components/record-list";

export default function DashboardPage() {

  const disabledStreamers = placeholderStreamers.filter(streamer => !streamer.isActivated);
  const activeStreamers = placeholderStreamers.filter(streamer => streamer.isActivated);
  const recordingStreamers = activeStreamers.filter(streamer => streamer.isLive);
  const inactiveStreamers = activeStreamers.filter(streamer => !streamer.isLive);


  return (
      <>
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">

          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground">
                Summary of streams and other data.
              </p>
            </div>
          </div>
          <div className="flex-grow space-y-6">
            <div className="grid gap-4 md:grids-col-2 lg:grid-cols-10 lg:gap-6 xl:grid-cols-11">
              <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
                <CardsStats data={placeholderYearlyStats} firstCardTitle={"Total streams"}
                            secondCardTitle={"Total uploads"}/>
              </div>
              <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
                <CardsStats data={placeholderWeeklyStats} firstCardTitle={"Weekly streams"}
                            secondCardTitle={"Weekly uploads"}/>
              </div>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Streamers</h2>

            <div
                className="grid gap-4 grid-cols-1 md:grids-col-3 md:gap-2 md:space-x-0 lg:grid-cols-7 lg:gap-6 xl:grid-cols-12 xl:gap-12">
              <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-3 xl:space-y-4">
                <RecordList streamers={recordingStreamers} title="Recording"/>
              </div>
              <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-3 xl:space-y-4">
                <RecordList streamers={inactiveStreamers} title="Inactive"/>
              </div>
              <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-3 xl:space-y-4">
                <RecordList streamers={disabledStreamers} title="Disabled"/>
              </div>
            </div>
          </div>

        </div>
      </>
  )
}