import { relativeTime } from './relativeTime';

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
