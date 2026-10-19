import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, format } from 'date-fns';

/**
 * Formats a date relative to a reference time (now).
 * - Under a minute: "just now"
 * - Under an hour: "5m", "30m", etc.
 * - Under a day: "3h", "12h", etc.
 * - Otherwise: "MMM d" format (e.g., "Jan 15")
 *
 * @param {Date|number} date - The date to format
 * @param {Date|number} now - The reference time (current time)
 * @returns {string} The formatted relative time string
 */
export function relativeTime(date, now) {
  const seconds = differenceInSeconds(now, date);

  if (seconds < 60) {
    return 'just now';
  }

  const minutes = differenceInMinutes(now, date);
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = differenceInHours(now, date);
  if (hours < 24) {
    return `${hours}h`;
  }

  return format(date, 'MMM d');
}
