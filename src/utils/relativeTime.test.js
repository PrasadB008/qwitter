import { relativeTime } from './relativeTime';

describe('relativeTime', () => {
  const baseTime = new Date('2024-01-15T12:00:00Z');

  describe('under a minute', () => {
    it('should return "just now" for times less than 60 seconds ago', () => {
      const date = new Date('2024-01-15T11:59:30Z');
      expect(relativeTime(date, baseTime)).toBe('just now');
    });

    it('should return "just now" for times 0 seconds ago', () => {
      expect(relativeTime(baseTime, baseTime)).toBe('just now');
    });

    it('should return "just now" for times 59 seconds ago', () => {
      const date = new Date('2024-01-15T11:59:01Z');
      expect(relativeTime(date, baseTime)).toBe('just now');
    });
  });

  describe('under an hour', () => {
    it('should return "1m" for 1 minute ago', () => {
      const date = new Date('2024-01-15T11:59:00Z');
      expect(relativeTime(date, baseTime)).toBe('1m');
    });

    it('should return "5m" for 5 minutes ago', () => {
      const date = new Date('2024-01-15T11:55:00Z');
      expect(relativeTime(date, baseTime)).toBe('5m');
    });

    it('should return "30m" for 30 minutes ago', () => {
      const date = new Date('2024-01-15T11:30:00Z');
      expect(relativeTime(date, baseTime)).toBe('30m');
    });

    it('should return "59m" for 59 minutes ago', () => {
      const date = new Date('2024-01-15T11:01:00Z');
      expect(relativeTime(date, baseTime)).toBe('59m');
    });
  });

  describe('under a day', () => {
    it('should return "1h" for 1 hour ago', () => {
      const date = new Date('2024-01-15T11:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('1h');
    });

    it('should return "3h" for 3 hours ago', () => {
      const date = new Date('2024-01-15T09:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('3h');
    });

    it('should return "12h" for 12 hours ago', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('12h');
    });

    it('should return "23h" for 23 hours ago', () => {
      const date = new Date('2024-01-14T13:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('23h');
    });
  });

  describe('a day or older', () => {
    it('should return "MMM d" format for 1 day ago', () => {
      const date = new Date('2024-01-14T12:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('Jan 14');
    });

    it('should return "MMM d" format for 7 days ago', () => {
      const date = new Date('2024-01-08T12:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('Jan 8');
    });

    it('should return "MMM d" format for dates in different months', () => {
      const date = new Date('2023-12-25T12:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('Dec 25');
    });

    it('should return "MMM d" format for dates in different years', () => {
      const date = new Date('2023-01-15T12:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('Jan 15');
    });
  });

  describe('edge cases', () => {
    it('should handle exactly 60 seconds as "1m"', () => {
      const date = new Date('2024-01-15T11:59:00Z');
      expect(relativeTime(date, baseTime)).toBe('1m');
    });

    it('should handle exactly 60 minutes as "1h"', () => {
      const date = new Date('2024-01-15T11:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('1h');
    });

    it('should handle exactly 24 hours as "Jan 14"', () => {
      const date = new Date('2024-01-14T12:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('Jan 14');
    });
  });
});
