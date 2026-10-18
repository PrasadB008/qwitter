import { differenceInMinutes, differenceInHours, differenceInDays, format } from 'date-fns';

/**
 * Formats a date relative to now
 * @param {Date} date - The date to format
 * @param {Date} now - The current date for comparison
 * @returns {string} Formatted relative time string
 */
export function relativeTime(date, now) {
  const minutesDiff = differenceInMinutes(now, date);
  
  if (minutesDiff < 1) {
    return 'just now';
  }
  
  if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  }
  
  const hoursDiff = differenceInHours(now, date);
  if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  }
  
  return format(date, 'MMM d');
}
