const { relativeTime } = require('../../src/utils/relativeTime');

describe('relativeTime', () => {
  describe('just now', () => {
    it('should return "just now" for times less than a minute ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-15T11:59:30Z'); // 30 seconds ago
      expect(relativeTime(date, now)).toBe('just now');
    });

    it('should return "just now" for times exactly 59 seconds ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-15T11:59:01Z'); // 59 seconds ago
      expect(relativeTime(date, now)).toBe('just now');
    });
  });

  describe('minutes', () => {
    it('should return "1m" for 1 minute ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-15T11:59:00Z'); // 1 minute ago
      expect(relativeTime(date, now)).toBe('1m');
    });

    it('should return "5m" for 5 minutes ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-15T11:55:00Z'); // 5 minutes ago
      expect(relativeTime(date, now)).toBe('5m');
    });

    it('should return "59m" for 59 minutes ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-15T11:01:00Z'); // 59 minutes ago
      expect(relativeTime(date, now)).toBe('59m');
    });
  });

  describe('hours', () => {
    it('should return "1h" for 1 hour ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-15T11:00:00Z'); // 1 hour ago
      expect(relativeTime(date, now)).toBe('1h');
    });

    it('should return "3h" for 3 hours ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-15T09:00:00Z'); // 3 hours ago
      expect(relativeTime(date, now)).toBe('3h');
    });

    it('should return "23h" for 23 hours ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-14T13:00:00Z'); // 23 hours ago
      expect(relativeTime(date, now)).toBe('23h');
    });
  });

  describe('date format', () => {
    it('should return "MMM d" format for 1 day ago', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-14T12:00:00Z'); // 1 day ago
      expect(relativeTime(date, now)).toBe('Jan 14');
    });

    it('should return "MMM d" format for dates older than 1 day', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2024-01-10T12:00:00Z'); // 5 days ago
      expect(relativeTime(date, now)).toBe('Jan 10');
    });

    it('should return "MMM d" format for dates from previous months', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const date = new Date('2023-12-20T12:00:00Z');
      expect(relativeTime(date, now)).toBe('Dec 20');
    });
  });
});
