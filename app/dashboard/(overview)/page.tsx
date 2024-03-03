import {CardsStats} from "@/app/dashboard/(overview)/(stats)/stats";
import {placeholderStreamers, placeholderWeeklyStats, placeholderYearlyStats,} from "@/app/lib/data/placeholder-data";
import React from "react";
import {RecordList} from "@/app/dashboard/(overview)/(streamers)/record-list";

export default async function DashboardPage() {

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
            <div className="grid gap-4 md:grids-col-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:gap-x-16">
              <div className="space-y-4 lg:col-span-1">
                <CardsStats data={placeholderYearlyStats} firstCardTitle={"Total streams"}
                            secondCardTitle={"Total uploads"}/>
              </div>
              <div className="space-y-4 lg:col-span-1">
                <CardsStats data={placeholderWeeklyStats} firstCardTitle={"Weekly streams"}
                            secondCardTitle={"Weekly uploads"}/>
              </div>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Streamers</h2>

            <div
                className="grid gap-4 grid-cols-1 md:grids-col-3 lg:grid-cols-3 lg:space-x-8">
              <div className="space-y-4 col-span-1">
                <RecordList streamers={recordingStreamers} title="Recording"/>
              </div>
              <div className="space-y-4 col-span-1 ">
                <RecordList streamers={inactiveStreamers} title="Inactive"/>
              </div>
              <div className="space-y-4 col-span-1">
                <RecordList streamers={disabledStreamers} title="Disabled"/>
              </div>
            </div>
          </div>

        </div>
      </>
  )
}