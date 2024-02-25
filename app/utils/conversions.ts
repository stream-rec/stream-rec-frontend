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