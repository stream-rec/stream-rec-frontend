import React from "react";
import {endOfWeek, startOfWeek} from "date-fns";
import {CardsStats} from "@/app/[locale]/dashboard/(overview)/(stats)/stats";
import {fetchStats} from "@/lib/data/stats/api";
import {getTranslations} from "next-intl/server";
import {getCardPercentage} from "@/app/[locale]/dashboard/(overview)/(stats)/total-stats";

export const WeeklyStatsCard = async () => {

  const t = await getTranslations('Stats');

  const getStartOfWeek = () => startOfWeek(new Date().getTime()).getTime();

  const getEndOfWeek = () => endOfWeek(new Date().getTime()).getTime();

  const summaryStats = await fetchStats({dateStart: Math.floor(getStartOfWeek() / 1000), dateEnd: Math.floor(getEndOfWeek() / 1000)})
  const reversedData = summaryStats.stats?.reverse() || []
  const percentageChange = await getCardPercentage(summaryStats);


  return (
      <CardsStats data={reversedData} firstCard={
        {
          title: t("downloadMessage", {date: "0"}),
          total: summaryStats.totalRecords,
          percentage: `${percentageChange.download} ${t("relativeMessage", {date: "0"})}`
        }
      } secondCard={
        {
          title: t("uploadMessage", {date: "0"}),
          total: summaryStats.totalUploads,
          percentage: `${percentageChange.upload} ${t("relativeMessage", {date: "0"})}`
        }
      }/>
  )
};