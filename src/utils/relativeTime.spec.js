import { test } from 'node:test'
import assert from 'node:assert'
import { relativeTime } from './relativeTime.js'

test('relativeTime', async (t) => {
  // Use a fixed "now" for consistent testing
  const now = new Date('2024-01-15T12:00:00Z')

  await t.test('should return "just now" for times under a minute', () => {
    const date = new Date('2024-01-15T11:59:30Z') // 30 seconds ago
    assert.strictEqual(relativeTime(date, now), 'just now')
  })

  await t.test('should return "just now" for times exactly at 59 seconds', () => {
    const date = new Date('2024-01-15T11:59:01Z') // 59 seconds ago
    assert.strictEqual(relativeTime(date, now), 'just now')
  })

  await t.test('should return minutes for times under an hour', () => {
    const date = new Date('2024-01-15T11:55:00Z') // 5 minutes ago
    assert.strictEqual(relativeTime(date, now), '5m')
  })

  await t.test('should return minutes for times 59 minutes ago', () => {
    const date = new Date('2024-01-15T11:01:00Z') // 59 minutes ago
    assert.strictEqual(relativeTime(date, now), '59m')
  })

  await t.test('should return hours for times under a day', () => {
    const date = new Date('2024-01-15T09:00:00Z') // 3 hours ago
    assert.strictEqual(relativeTime(date, now), '3h')
  })

  await t.test('should return hours for times 23 hours ago', () => {
    const date = new Date('2024-01-14T13:00:00Z') // 23 hours ago
    assert.strictEqual(relativeTime(date, now), '23h')
  })

  await t.test('should return formatted date for times a day or older', () => {
    const date = new Date('2024-01-14T12:00:00Z') // exactly 1 day ago
    assert.strictEqual(relativeTime(date, now), 'Jan 14')
  })

  await t.test('should return formatted date for times much older', () => {
    const date = new Date('2024-01-01T12:00:00Z') // 14 days ago
    assert.strictEqual(relativeTime(date, now), 'Jan 01')
  })

  await t.test('should work with default now parameter', () => {
    // This test just ensures the function works without passing now
    const date = new Date(Date.now() - 30 * 1000) // 30 seconds ago
    assert.strictEqual(relativeTime(date), 'just now')
  })
})
