export enum FileSizeUnit {
  B = "B",
  KB = "KB",
  MB = "MB",
  GB = "GB"
}

export enum DurationUnit {
  SECONDS = "ss",
  MINUTES = "mm",
  HOURS = "hh",
  DAYS = "dd"
}

export type FileSize = {
  size: number
  unit: FileSizeUnit
}

export type Duration = {
  value: number
  unit: DurationUnit
}


export const convertToBytes = (unit: FileSizeUnit, value: number) => {
  switch (unit) {
    case FileSizeUnit.B:
      return value;
    case FileSizeUnit.KB:
      return value * 1024;
    case FileSizeUnit.MB:
      return value * 1024 * 1024;
    case FileSizeUnit.GB:
      return value * 1024 * 1024 * 1024;
    default:
      return value;
  }
}

export const convertToSeconds = (unit: DurationUnit, value: number) => {
  switch (unit) {
    case DurationUnit.MINUTES:
      return value * 60;
    case DurationUnit.HOURS:
      return value * 60 * 60;
    case DurationUnit.DAYS:
      return value * 60 * 60 * 24;
    default:
      return value;
  }
}

export const formatBytes = (bytes: number): FileSize => {
  if (bytes < 1024) return {size: bytes, unit: FileSizeUnit.B}
  else if (bytes < 1048576) return {size: parseFloat((bytes / 1024).toFixed(2)), unit: FileSizeUnit.KB}
  else if (bytes < 1073741824) return {size: parseFloat((bytes / 1048576).toFixed(2)), unit: FileSizeUnit.MB}
  else return {size: parseFloat((bytes / 1073741824).toFixed(2)), unit: FileSizeUnit.GB}
}

export const formatSeconds = (seconds: number): Duration => {
  const units = Object.values(DurationUnit)
  const thresholds = [60, 60, 24];
  let unit = DurationUnit.SECONDS;
  let value = seconds;

  for (let i = 0; i < thresholds.length && value >= thresholds[i]; i++) {
    value /= thresholds[i];
    unit = units[i + 1];
  }

  return {value, unit}
}

export function secondsToHHmmss(seconds: number) {
  return new Date(seconds * 1000).toISOString().slice(11, 19);
}