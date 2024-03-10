'use server'
import React from "react";
import {endOfYear, startOfYear} from "date-fns";
import {CardsStats} from "@/app/[locale]/dashboard/(overview)/(stats)/stats";
import {fetchStats} from "@/lib/data/stats/api";
import {getFormatter, getTranslations} from "next-intl/server";
import {SummaryStats} from "@/lib/data/stats/definitions";

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


export const TotalStatsCard = async () => {

  const t = await getTranslations('Stats');

  const getStartOfYear = () => startOfYear(new Date().getTime()).getTime();

  const getEndOfYear = () => endOfYear(new Date().getTime()).getTime();

  const yearTotalStats = await fetchStats({
    dateStart: Math.floor(getStartOfYear() / 1000), dateEnd: Math.floor(getEndOfYear() / 1000)
  })


  const percentageChange = await getCardPercentage(yearTotalStats);

  const reversedData = yearTotalStats.stats?.reverse() || []

  return (
      <CardsStats data={reversedData} firstCard={
        {
          title: t("downloadMessage", {date: "2"}),
          total: yearTotalStats.totalRecords,
          percentage: `${percentageChange.download} ${t("relativeMessage", {date: "2"})}`
        }
      } secondCard={
        {
          title: t("uploadMessage", {date: "2"}),
          total: yearTotalStats.totalUploads,
          percentage: `${percentageChange.upload} ${t("relativeMessage", {date: "2"})}`
        }
      }/>
  )
};