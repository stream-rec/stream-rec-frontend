import React from "react";
import {CardsStats} from "@/src/app/[locale]/(feat)/(stats)/stats";
import {fetchStats} from "@/src/lib/data/stats/api";
import {getFormatter, getTranslations} from "next-intl/server";
import {endOfWeek, endOfYear, startOfWeek, startOfYear} from "date-fns";
import {SummaryStats} from "@/src/lib/data/stats/definitions";

export const getCardPercentage = async (summaryStats: SummaryStats) => {

  const format = await getFormatter();

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) {
      // if previous is 0, then the percentage change is 1
      return 1
    }
    return (current - previous) / previous
  };

  const stats = summaryStats.stats;
  if (stats === undefined) {
    return {
      download: 0,
      upload: 0
    }
  }

  const previousTotalRecords = summaryStats.previousRecords
  const previousTotalUploads = summaryStats.previousUploads

  const currentTimeRangeTotalRecords = summaryStats.totalRecords
  const currentTimeRangeTotalUploads = summaryStats.totalUploads

  const recordsPercentageChange = getPercentageChange(currentTimeRangeTotalRecords, previousTotalRecords)
  const uploadsPercentageChange = getPercentageChange(currentTimeRangeTotalUploads, previousTotalUploads)


  const percentageString = (percentage: number) => {
    return format.number(percentage, {
      style: "percent",
      signDisplay: "exceptZero",
      maximumFractionDigits: 2
    })
  }
  return {
    download: percentageString(recordsPercentageChange),
    upload: percentageString(uploadsPercentageChange)
  }
};


interface StatsCardProps {
  getStartOfTimeRange: () => number;
  getEndOfTimeRange: () => number;
  dateKey: "0" | "2";
}

const createStatsCard = ({getStartOfTimeRange, getEndOfTimeRange, dateKey}: StatsCardProps) => {
  const Component = async () => {
    const t = await getTranslations('Stats');

    const summaryStats = await fetchStats({
      dateStart: Math.floor(getStartOfTimeRange() / 1000),
      dateEnd: Math.floor(getEndOfTimeRange() / 1000)
    })

    const reversedData = summaryStats.stats?.reverse() || []
    const percentageChange = await getCardPercentage(summaryStats);

    return (
        <CardsStats data={reversedData} firstCard={
          {
            title: t("downloadMessage", {date: dateKey}),
            total: summaryStats.totalRecords,
            percentage: `${percentageChange.download} ${t("relativeMessage", {date: dateKey})}`
          }
        } secondCard={
          {
            title: t("uploadMessage", {date: dateKey}),
            total: summaryStats.totalUploads,
            percentage: `${percentageChange.upload} ${t("relativeMessage", {date: dateKey})}`
          }
        }/>
    )
  };
  Component.displayName = "StatsCard";
  return Component;
}

export const WeeklyStatsCard = createStatsCard(
    {
      getStartOfTimeRange: () => startOfWeek(new Date().getTime(), {weekStartsOn: 1}).getTime(),
      getEndOfTimeRange: () => endOfWeek(new Date().getTime(), {weekStartsOn: 1}).getTime(),
      dateKey: "0"
    }
);

export const TotalStatsCard = createStatsCard(
    {
      getStartOfTimeRange: () => startOfYear(new Date().getTime()).getTime(),
      getEndOfTimeRange: () => endOfYear(new Date().getTime()).getTime(),
      dateKey: "2"
    }
);