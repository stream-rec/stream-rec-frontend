import {CardsStats} from "@/app/dashboard/components/cards/stats";
import {placeholderMonthStats, placeholderStreamers, placeholderWeekStats} from "@/app/lib/placeholder-data";
import StreamerCard from "@/app/dashboard/components/cards/streamer";
import React from "react";
import {Streamer} from "@/app/lib/definitions";

export default function DashboardPage() {

  const disabledStreamers = placeholderStreamers.filter(streamer => !streamer.isActivated);
  const activeStreamers = placeholderStreamers.filter(streamer => streamer.isActivated);
  const recordingStreamers = activeStreamers.filter(streamer => streamer.isLive);
  const inactiveStreamers = activeStreamers.filter(streamer => !streamer.isLive);

  function renderStreamerCards(streamers: Streamer[]) {
    return streamers.map(streamer => (
        <StreamerCard
            key={streamer.name}
            streamer={streamer.name}
            isActivated={streamer.isActivated}
            streamerId={streamer.id}
            isLive={streamer.isLive}
            streamerAvatar={streamer.avatar}
            lastStream={streamer.lastStream}
            description={streamer.description}
        />
    ));
  }

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
                <CardsStats data={placeholderMonthStats} firstCard={
                  {title: "Total streams", total: 1500, previousString: " from last month"}
                } secondCard={
                  {title: "Total uploads", total: 1480, previousString: " from last month"}
                }/>
              </div>
              <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
                <CardsStats data={placeholderWeekStats} firstCard={
                  {title: "Weekly streams", previousTotal : 100,  previousString: " from last week"}
                } secondCard={
                  {title: "Weekly uploads", previousTotal : 100, previousString: " from last week"}
                }/>
              </div>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Streamers</h2>

            <div className="grid gap-4 grid-cols-1 md:grids-col-3 md:gap-2 md:space-x-0 lg:grid-cols-7 lg:gap-6 xl:grid-cols-12 xl:gap-12">
              <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-3 xl:space-y-4">
                <div className="flex items-center space-x-2.5 xl:space-x-3 ">
                  <h3 className="text-xm">Recording</h3>
                  <h3 className="text-xs px-2 py-0.5 bg-muted rounded-md">{recordingStreamers.length}</h3>
                </div>
                {
                  renderStreamerCards(recordingStreamers)
                }
              </div>
              <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-3 xl:space-y-4">
                <div className="flex items-center space-x-2.5 xl:space-x-3">
                  <h3 className="text-xm">Inactive</h3>
                  <h3 className="text-xs px-2 py-0.5 bg-muted rounded-md">{inactiveStreamers.length}</h3>
                </div>
                {
                  renderStreamerCards(inactiveStreamers)
                }
              </div>
              <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-3 xl:space-y-4">
                <div className="flex items-center space-x-2.5 xl:space-x-3">
                  <h3 className="text-xm">Disabled</h3>
                  <h3 className="text-xs px-2 py-0.5 bg-muted rounded-md">{disabledStreamers.length}</h3>
                </div>
                {
                  renderStreamerCards(disabledStreamers)
                }
              </div>
            </div>
          </div>

        </div>
      </>
  )
}