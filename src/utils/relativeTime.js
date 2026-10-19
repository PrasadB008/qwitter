import { formatDistanceToNow, format } from 'date-fns';

/**
 * Format a date relative to now
 * @param {Date|number} date - The date to format
 * @param {Date|number} now - The reference date (typically the current time)
 * @returns {string} Formatted relative time string
 *
 * Rules:
 * - Under a minute: "just now"
 * - Under an hour: "5m", "30m", etc.
 * - Under a day: "3h", "12h", etc.
 * - Otherwise: "MMM d" format (e.g., "Jan 15")
 */
export function relativeTime(date, now) {
  const dateObj = new Date(date);
  const nowObj = new Date(now);

  const diffMs = nowObj - dateObj;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Under a minute
  if (diffSeconds < 60) {
    return 'just now';
  }

  // Under an hour
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }

  // Under a day
  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  // Otherwise, format as "MMM d"
  return format(dateObj, 'MMM d');
}
