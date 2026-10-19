import { differenceInMinutes, differenceInHours, differenceInDays, format } from 'date-fns'

/**
 * Format a date relative to now
 * @param {number|Date} date - The date to format (timestamp or Date object)
 * @param {number|Date} now - The current date (timestamp or Date object)
 * @returns {string} Formatted relative time string
 */
export function relativeTime(date, now) {
  const dateObj = typeof date === 'number' ? new Date(date) : date
  const nowObj = typeof now === 'number' ? new Date(now) : now

  const minutesDiff = differenceInMinutes(nowObj, dateObj)
  const hoursDiff = differenceInHours(nowObj, dateObj)
  const daysDiff = differenceInDays(nowObj, dateObj)

  if (minutesDiff < 1) {
    return 'just now'
  }

  if (minutesDiff < 60) {
    return `${minutesDiff}m`
  }

  if (hoursDiff < 24) {
    return `${hoursDiff}h`
  }

  return format(dateObj, 'MMM d')
}
