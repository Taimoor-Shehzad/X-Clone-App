import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

// Format a number to a shorter format (e.g., 1000 -> 1K)
export const formatNumber = (num: number): string => {
  if (num >= 1000) return Math.floor(num / 1000) + "K";
  return num.toString();
};

//  Format a date to a short relative format (e.g., 2m, 1h, 3d)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
};

export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 5) return "just now";

  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];

  for (const [secondsInUnit, unit] of intervals) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
