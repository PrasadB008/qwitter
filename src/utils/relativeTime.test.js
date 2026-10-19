const { relativeTime } = require('./relativeTime');

describe('relativeTime', () => {
  const baseDate = new Date('2024-01-15T12:00:00Z');

  describe('under a minute', () => {
    it('should return "just now" for 0 seconds', () => {
      const date = new Date(baseDate);
      expect(relativeTime(date, baseDate)).toBe('just now');
    });

    it('should return "just now" for 30 seconds', () => {
      const date = new Date(baseDate.getTime() - 30 * 1000);
      expect(relativeTime(date, baseDate)).toBe('just now');
    });

    it('should return "just now" for 59 seconds', () => {
      const date = new Date(baseDate.getTime() - 59 * 1000);
      expect(relativeTime(date, baseDate)).toBe('just now');
    });
  });

  describe('under an hour', () => {
    it('should return "1m" for 1 minute', () => {
      const date = new Date(baseDate.getTime() - 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('1m');
    });

    it('should return "5m" for 5 minutes', () => {
      const date = new Date(baseDate.getTime() - 5 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('5m');
    });

    it('should return "30m" for 30 minutes', () => {
      const date = new Date(baseDate.getTime() - 30 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('30m');
    });

    it('should return "59m" for 59 minutes', () => {
      const date = new Date(baseDate.getTime() - 59 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('59m');
    });
  });

  describe('under a day', () => {
    it('should return "1h" for 1 hour', () => {
      const date = new Date(baseDate.getTime() - 60 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('1h');
    });

    it('should return "3h" for 3 hours', () => {
      const date = new Date(baseDate.getTime() - 3 * 60 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('3h');
    });

    it('should return "12h" for 12 hours', () => {
      const date = new Date(baseDate.getTime() - 12 * 60 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('12h');
    });

    it('should return "23h" for 23 hours', () => {
      const date = new Date(baseDate.getTime() - 23 * 60 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('23h');
    });
  });

  describe('a day or more', () => {
    it('should return formatted date "MMM d" for 1 day', () => {
      const date = new Date(baseDate.getTime() - 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('Jan 14');
    });

    it('should return formatted date "MMM d" for 7 days', () => {
      const date = new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('Jan 8');
    });

    it('should return formatted date "MMM d" for 30 days', () => {
      const date = new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      expect(relativeTime(date, baseDate)).toBe('Dec 16');
    });

    it('should return formatted date "MMM d" for different months', () => {
      const date = new Date('2023-12-25T12:00:00Z');
      const now = new Date('2024-01-15T12:00:00Z');
      expect(relativeTime(date, now)).toBe('Dec 25');
    });
  });
});
