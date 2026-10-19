import { relativeTime } from './relativeTime'

describe('relativeTime', () => {
  const baseTime = new Date('2021-01-27T12:00:00Z').getTime()

  describe('under a minute', () => {
    it('should return "just now" for times less than 1 minute ago', () => {
      const now = baseTime
      const date = baseTime - 30 * 1000 // 30 seconds ago
      expect(relativeTime(date, now)).toBe('just now')
    })

    it('should return "just now" for times exactly at now', () => {
      const now = baseTime
      const date = baseTime
      expect(relativeTime(date, now)).toBe('just now')
    })

    it('should return "just now" for times 59 seconds ago', () => {
      const now = baseTime
      const date = baseTime - 59 * 1000
      expect(relativeTime(date, now)).toBe('just now')
    })
  })

  describe('under an hour', () => {
    it('should return "1m" for 1 minute ago', () => {
      const now = baseTime
      const date = baseTime - 60 * 1000
      expect(relativeTime(date, now)).toBe('1m')
    })

    it('should return "5m" for 5 minutes ago', () => {
      const now = baseTime
      const date = baseTime - 5 * 60 * 1000
      expect(relativeTime(date, now)).toBe('5m')
    })

    it('should return "59m" for 59 minutes ago', () => {
      const now = baseTime
      const date = baseTime - 59 * 60 * 1000
      expect(relativeTime(date, now)).toBe('59m')
    })
  })

  describe('under a day', () => {
    it('should return "1h" for 1 hour ago', () => {
      const now = baseTime
      const date = baseTime - 60 * 60 * 1000
      expect(relativeTime(date, now)).toBe('1h')
    })

    it('should return "3h" for 3 hours ago', () => {
      const now = baseTime
      const date = baseTime - 3 * 60 * 60 * 1000
      expect(relativeTime(date, now)).toBe('3h')
    })

    it('should return "23h" for 23 hours ago', () => {
      const now = baseTime
      const date = baseTime - 23 * 60 * 60 * 1000
      expect(relativeTime(date, now)).toBe('23h')
    })
  })

  describe('a day or more', () => {
    it('should return "MMM d" format for 1 day ago', () => {
      const now = new Date('2021-01-27T12:00:00Z').getTime()
      const date = new Date('2021-01-26T12:00:00Z').getTime()
      expect(relativeTime(date, now)).toBe('Jan 26')
    })

    it('should return "MMM d" format for 7 days ago', () => {
      const now = new Date('2021-01-27T12:00:00Z').getTime()
      const date = new Date('2021-01-20T12:00:00Z').getTime()
      expect(relativeTime(date, now)).toBe('Jan 20')
    })

    it('should return "MMM d" format for dates in different months', () => {
      const now = new Date('2021-02-15T12:00:00Z').getTime()
      const date = new Date('2021-01-15T12:00:00Z').getTime()
      expect(relativeTime(date, now)).toBe('Jan 15')
    })
  })

  describe('with Date objects', () => {
    it('should work with Date objects instead of timestamps', () => {
      const now = new Date('2021-01-27T12:00:00Z')
      const date = new Date('2021-01-27T11:55:00Z')
      expect(relativeTime(date, now)).toBe('5m')
    })

    it('should work with mixed Date objects and timestamps', () => {
      const now = new Date('2021-01-27T12:00:00Z').getTime()
      const date = new Date('2021-01-27T11:55:00Z')
      expect(relativeTime(date, now)).toBe('5m')
    })
  })
})
