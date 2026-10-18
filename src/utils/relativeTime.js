import { formatDistanceToNow, format } from 'date-fns'

/**
 * Format a date relative to now
 * @param {Date} date - The date to format
 * @param {Date} now - The current date (for testing purposes)
 * @returns {string} Formatted relative time string
 */
export function relativeTime(date, now = new Date()) {
  const diffInSeconds = Math.floor((now - date) / 1000)

  // Under a minute: "just now"
  if (diffInSeconds < 60) {
    return 'just now'
  }

  // Under an hour: "5m", "30m", etc.
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`
  }

  // Under a day: "3h", "12h", etc.
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h`
  }

  // Otherwise: "MMM d" format (e.g., "Jan 15")
  return format(date, 'MMM d')
}
