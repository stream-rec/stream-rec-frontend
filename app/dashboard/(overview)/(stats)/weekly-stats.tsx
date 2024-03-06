import {CardsStats} from "@/app/dashboard/(overview)/(stats)/stats";
import React from "react";
import {fetchStats} from "@/app/lib/data/stats/api";
import {endOfWeek, startOfWeek} from "date-fns";

export const WeeklyStatsCard = async () => {
  const getStartOfWeek = () => startOfWeek(new Date().getTime()).getTime();

  const getEndOfWeek = () => endOfWeek(new Date().getTime()).getTime();

  const yearTotalStats = await fetchStats({dateStart: Math.floor(getStartOfWeek() / 1000), dateEnd: Math.floor(getEndOfWeek() / 1000)})

  return (
      <CardsStats data={yearTotalStats} firstCardTitle={"Weekly streams"}
                  secondCardTitle={"Weekly uploads"}/>
  )
};