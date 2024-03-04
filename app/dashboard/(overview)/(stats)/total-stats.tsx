import {CardsStats} from "@/app/dashboard/(overview)/(stats)/stats";
import React from "react";
import {fetchStats} from "@/app/lib/data/stats/api";
import {endOfYear, startOfYear} from "date-fns";

export const TotalStatsCard = async () => {
  const getStartOfYear = () => startOfYear(new Date().getTime()).getTime();

  const getEndOfYear = () => endOfYear(new Date().getTime()).getTime();

  const yearTotalStats = await fetchStats({dateStart: getStartOfYear(), dateEnd: getEndOfYear()})

  return (
      <CardsStats data={yearTotalStats} firstCardTitle={"Total streams"}
                  secondCardTitle={"Total uploads"}/>
  )
};