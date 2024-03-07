export const convertToBytes = (size: string, value: number) => {
  switch (size) {
    case "B":
      return value;
    case "KB":
      return value * 1024;
    case "MB":
      return value * 1024 * 1024;
    case "GB":
      return value * 1024 * 1024 * 1024;
    default:
      return value;
  }
}

export const convertToSeconds = (duration: string, value: number) => {
  switch (duration) {
    case "mm":
      return value * 60;
    case "hh":
      return value * 60 * 60;
    case "dd":
      return value * 60 * 60 * 24;
    default:
      return value;
  }
}

export type FileSize = {
  size: number
  unit: string
}

export const formatBytes = (bytes: number): FileSize => {
  if (bytes < 1024) return {size: bytes, unit: "B"};
  else if (bytes < 1048576) return {size: parseFloat((bytes / 1024).toFixed(2)), unit: "KB"};
  else if (bytes < 1073741824) return {size: parseFloat((bytes / 1048576).toFixed(2)), unit: "MB"};
  else return {size: parseFloat((bytes / 1073741824).toFixed(2)), unit: "GB"};
};