#!/usr/bin/env node

/**
 * Simple test runner for relativeTime tests
 * This runs without requiring npm install
 */

const fs = require('fs');
const path = require('path');

// Mock date-fns functions
const dateFns = {
  differenceInSeconds: (now, date) => Math.floor((now - date) / 1000),
  differenceInMinutes: (now, date) => Math.floor((now - date) / (1000 * 60)),
  differenceInHours: (now, date) => Math.floor((now - date) / (1000 * 60 * 60)),
  differenceInDays: (now, date) => Math.floor((now - date) / (1000 * 60 * 60 * 24)),
  format: (date, formatStr) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    return `${month} ${day}`;
  }
};

// relativeTime function
function relativeTime(date, now) {
  const secondsDiff = dateFns.differenceInSeconds(now, date);
  const minutesDiff = dateFns.differenceInMinutes(now, date);
  const hoursDiff = dateFns.differenceInHours(now, date);
  const daysDiff = dateFns.differenceInDays(now, date);

  if (secondsDiff < 60) {
    return 'just now';
  }

  if (minutesDiff < 60) {
    return `${minutesDiff}m`;
  }

  if (hoursDiff < 24) {
    return `${hoursDiff}h`;
  }

  return dateFns.format(date, 'MMM d');
}

// Simple test framework
let testCount = 0;
let passCount = 0;
let failCount = 0;

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

function it(name, fn) {
  testCount++;
  try {
    fn();
    passCount++;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failCount++;
    console.log(`  ✗ ${name}`);
    console.log(`    ${error.message}`);
  }
}

function expect(actual) {
  return {
    toBe: (expected) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}`);
      }
    }
  };
}

// Tests
describe('relativeTime', () => {
  const baseTime = new Date('2024-01-15T12:00:00Z');

  describe('under a minute', () => {
    it('should return "just now" for 0 seconds difference', () => {
      const date = new Date(baseTime);
      expect(relativeTime(date, baseTime)).toBe('just now');
    });

    it('should return "just now" for 30 seconds difference', () => {
      const date = new Date(baseTime.getTime() - 30 * 1000);
      expect(relativeTime(date, baseTime)).toBe('just now');
    });

    it('should return "just now" for 59 seconds difference', () => {
      const date = new Date(baseTime.getTime() - 59 * 1000);
      expect(relativeTime(date, baseTime)).toBe('just now');
    });
  });

  describe('under an hour', () => {
    it('should return "1m" for 1 minute difference', () => {
      const date = new Date(baseTime.getTime() - 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('1m');
    });

    it('should return "5m" for 5 minutes difference', () => {
      const date = new Date(baseTime.getTime() - 5 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('5m');
    });

    it('should return "30m" for 30 minutes difference', () => {
      const date = new Date(baseTime.getTime() - 30 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('30m');
    });

    it('should return "59m" for 59 minutes difference', () => {
      const date = new Date(baseTime.getTime() - 59 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('59m');
    });
  });

  describe('under a day', () => {
    it('should return "1h" for 1 hour difference', () => {
      const date = new Date(baseTime.getTime() - 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('1h');
    });

    it('should return "3h" for 3 hours difference', () => {
      const date = new Date(baseTime.getTime() - 3 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('3h');
    });

    it('should return "12h" for 12 hours difference', () => {
      const date = new Date(baseTime.getTime() - 12 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('12h');
    });

    it('should return "23h" for 23 hours difference', () => {
      const date = new Date(baseTime.getTime() - 23 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('23h');
    });
  });

  describe('a day or more', () => {
    it('should return formatted date "MMM d" for 1 day difference', () => {
      const date = new Date(baseTime.getTime() - 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('Jan 14');
    });

    it('should return formatted date "MMM d" for 7 days difference', () => {
      const date = new Date(baseTime.getTime() - 7 * 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('Jan 8');
    });

    it('should return formatted date "MMM d" for 30 days difference', () => {
      const date = new Date(baseTime.getTime() - 30 * 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('Dec 16');
    });

    it('should return formatted date "MMM d" for dates in different months', () => {
      const date = new Date('2023-12-25T12:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('Dec 25');
    });
  });

  describe('edge cases', () => {
    it('should handle exactly 60 seconds as 1 minute', () => {
      const date = new Date(baseTime.getTime() - 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('1m');
    });

    it('should handle exactly 60 minutes as 1 hour', () => {
      const date = new Date(baseTime.getTime() - 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('1h');
    });

    it('should handle exactly 24 hours as formatted date', () => {
      const date = new Date(baseTime.getTime() - 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('Jan 14');
    });
  });
});

// Print summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests: ${passCount} passed, ${failCount} failed, ${testCount} total`);
console.log(`${'='.repeat(50)}\n`);

process.exit(failCount > 0 ? 1 : 0);
