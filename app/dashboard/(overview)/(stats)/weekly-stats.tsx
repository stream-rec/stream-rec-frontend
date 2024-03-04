import {CardsStats} from "@/app/dashboard/(overview)/(stats)/stats";
import React from "react";
import {fetchStats} from "@/app/lib/data/stats/api";
import {endOfWeek, endOfYear, startOfWeek, startOfYear} from "date-fns";

export const WeeklyStatsCard = async () => {
  const getStartOfYear = () => startOfWeek(new Date().getTime()).getTime();

  const getEndOfYear = () => endOfWeek(new Date().getTime()).getTime();

  const yearTotalStats = fetchStats({dateStart: getStartOfYear(), dateEnd: getEndOfYear()})

  return (
      <CardsStats data={await yearTotalStats} firstCardTitle={"Weekly streams"}
                  secondCardTitle={"Weekly uploads"}/>
  )
};