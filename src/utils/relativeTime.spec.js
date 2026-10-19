import { relativeTime } from './relativeTime';

describe('relativeTime', () => {
  const baseTime = new Date('2024-01-15T12:00:00Z');

  describe('under a minute', () => {
    it('should return "just now" for 0 seconds', () => {
      const date = new Date(baseTime);
      expect(relativeTime(date, baseTime)).toBe('just now');
    });

    it('should return "just now" for 30 seconds', () => {
      const date = new Date(baseTime.getTime() - 30 * 1000);
      expect(relativeTime(date, baseTime)).toBe('just now');
    });

    it('should return "just now" for 59 seconds', () => {
      const date = new Date(baseTime.getTime() - 59 * 1000);
      expect(relativeTime(date, baseTime)).toBe('just now');
    });
  });

  describe('under an hour', () => {
    it('should return "1m" for 1 minute', () => {
      const date = new Date(baseTime.getTime() - 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('1m');
    });

    it('should return "5m" for 5 minutes', () => {
      const date = new Date(baseTime.getTime() - 5 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('5m');
    });

    it('should return "30m" for 30 minutes', () => {
      const date = new Date(baseTime.getTime() - 30 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('30m');
    });

    it('should return "59m" for 59 minutes', () => {
      const date = new Date(baseTime.getTime() - 59 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('59m');
    });
  });

  describe('under a day', () => {
    it('should return "1h" for 1 hour', () => {
      const date = new Date(baseTime.getTime() - 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('1h');
    });

    it('should return "3h" for 3 hours', () => {
      const date = new Date(baseTime.getTime() - 3 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('3h');
    });

    it('should return "12h" for 12 hours', () => {
      const date = new Date(baseTime.getTime() - 12 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('12h');
    });

    it('should return "23h" for 23 hours', () => {
      const date = new Date(baseTime.getTime() - 23 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('23h');
    });
  });

  describe('a day or more', () => {
    it('should return "MMM d" format for 1 day', () => {
      const date = new Date(baseTime.getTime() - 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('Jan 14');
    });

    it('should return "MMM d" format for 7 days', () => {
      const date = new Date(baseTime.getTime() - 7 * 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseTime)).toBe('Jan 8');
    });

    it('should return "MMM d" format for a different month', () => {
      const date = new Date('2023-12-20T12:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('Dec 20');
    });

    it('should return "MMM d" format for a different year', () => {
      const date = new Date('2023-01-15T12:00:00Z');
      expect(relativeTime(date, baseTime)).toBe('Jan 15');
    });
  });

  describe('with timestamp numbers', () => {
    it('should work with numeric timestamps', () => {
      const dateMs = baseTime.getTime() - 5 * 60 * 1000;
      const nowMs = baseTime.getTime();
      expect(relativeTime(dateMs, nowMs)).toBe('5m');
    });
  });
});
