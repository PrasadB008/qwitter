const { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, format } = require('date-fns');

/**
 * Formats a date relative to now
 * @param {Date} date - The date to format
 * @param {Date} now - The current date/time for comparison
 * @returns {string} Formatted relative time string
 */
function relativeTime(date, now) {
  const secondsDiff = differenceInSeconds(now, date);
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);

  if (secondsDiff < 60) {
    return 'just now';
  }

  if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  }

  if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  }

  return format(date, 'MMM d');
}

module.exports = { relativeTime };
