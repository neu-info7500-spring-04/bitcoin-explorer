import { format, fromUnixTime } from "date-fns";

export const formatTimeStamp = (timestampData: number): string => {
  const timestamp = timestampData;
  const formattedDate = format(
    fromUnixTime(timestamp),
    "do MMM yyyy, hh:mm aa"
  );
  return formattedDate;
};
