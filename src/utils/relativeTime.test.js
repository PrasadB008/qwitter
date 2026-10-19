import { relativeTime } from './relativeTime';

describe('relativeTime', () => {
  // Reference date for testing
  const now = new Date('2024-01-15T12:00:00Z');

  describe('under a minute', () => {
    it('should return "just now" for 0 seconds ago', () => {
      const date = new Date(now);
      expect(relativeTime(date, now)).toBe('just now');
    });

    it('should return "just now" for 30 seconds ago', () => {
      const date = new Date(now.getTime() - 30 * 1000);
      expect(relativeTime(date, now)).toBe('just now');
    });

    it('should return "just now" for 59 seconds ago', () => {
      const date = new Date(now.getTime() - 59 * 1000);
      expect(relativeTime(date, now)).toBe('just now');
    });
  });

  describe('under an hour', () => {
    it('should return "1m" for 1 minute ago', () => {
      const date = new Date(now.getTime() - 1 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('1m');
    });

    it('should return "5m" for 5 minutes ago', () => {
      const date = new Date(now.getTime() - 5 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('5m');
    });

    it('should return "30m" for 30 minutes ago', () => {
      const date = new Date(now.getTime() - 30 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('30m');
    });

    it('should return "59m" for 59 minutes ago', () => {
      const date = new Date(now.getTime() - 59 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('59m');
    });
  });

  describe('under a day', () => {
    it('should return "1h" for 1 hour ago', () => {
      const date = new Date(now.getTime() - 1 * 60 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('1h');
    });

    it('should return "3h" for 3 hours ago', () => {
      const date = new Date(now.getTime() - 3 * 60 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('3h');
    });

    it('should return "12h" for 12 hours ago', () => {
      const date = new Date(now.getTime() - 12 * 60 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('12h');
    });

    it('should return "23h" for 23 hours ago', () => {
      const date = new Date(now.getTime() - 23 * 60 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('23h');
    });
  });

  describe('a day or more', () => {
    it('should return "MMM d" format for 1 day ago', () => {
      const date = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('Jan 14');
    });

    it('should return "MMM d" format for 7 days ago', () => {
      const date = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('Jan 8');
    });

    it('should return "MMM d" format for a date in a different month', () => {
      const date = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('Dec 16');
    });

    it('should return "MMM d" format for a date in a different year', () => {
      const date = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      expect(relativeTime(date, now)).toBe('Jan 15');
    });
  });

  describe('edge cases', () => {
    it('should handle timestamp numbers as input', () => {
      const dateTimestamp = now.getTime() - 5 * 60 * 1000;
      const nowTimestamp = now.getTime();
      expect(relativeTime(dateTimestamp, nowTimestamp)).toBe('5m');
    });

    it('should handle string dates as input', () => {
      const date = new Date(now.getTime() - 5 * 60 * 1000);
      expect(relativeTime(date.toISOString(), now)).toBe('5m');
    });
  });
});
