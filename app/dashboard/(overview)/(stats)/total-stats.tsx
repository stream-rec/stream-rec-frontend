import {CardsStats} from "@/app/dashboard/(overview)/(stats)/stats";
import React from "react";
import {fetchStats} from "@/app/lib/data/stats/api";
import {endOfYear, startOfYear} from "date-fns";

export const TotalStatsCard = async () => {
  const getStartOfYear = () => startOfYear(new Date().getTime()).getTime();

  const getEndOfYear = () => endOfYear(new Date().getTime()).getTime();

  const yearTotalStats = await fetchStats({
    dateStart: Math.floor(getStartOfYear() / 1000), dateEnd: Math.floor(getEndOfYear() / 1000)
  })

  return (
      <CardsStats data={yearTotalStats} firstCardTitle={"Total streams"}
                  secondCardTitle={"Total uploads"}/>
  )
};