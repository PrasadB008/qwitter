import { test } from 'node:test';
import assert from 'node:assert';
import { relativeTime } from './relativeTime.js';

test('relativeTime', async (t) => {
  const baseTime = new Date('2024-01-15T12:00:00Z');

  await t.test('returns "just now" for times less than a minute ago', () => {
    const date = new Date('2024-01-15T11:59:30Z');
    assert.strictEqual(relativeTime(date, baseTime), 'just now');
  });

  await t.test('returns "just now" for times exactly at now', () => {
    assert.strictEqual(relativeTime(baseTime, baseTime), 'just now');
  });

  await t.test('returns minutes for times less than an hour ago', () => {
    const date5m = new Date('2024-01-15T11:55:00Z');
    assert.strictEqual(relativeTime(date5m, baseTime), '5m');

    const date30m = new Date('2024-01-15T11:30:00Z');
    assert.strictEqual(relativeTime(date30m, baseTime), '30m');

    const date59m = new Date('2024-01-15T11:01:00Z');
    assert.strictEqual(relativeTime(date59m, baseTime), '59m');
  });

  await t.test('returns hours for times less than a day ago', () => {
    const date1h = new Date('2024-01-15T11:00:00Z');
    assert.strictEqual(relativeTime(date1h, baseTime), '1h');

    const date3h = new Date('2024-01-15T09:00:00Z');
    assert.strictEqual(relativeTime(date3h, baseTime), '3h');

    const date23h = new Date('2024-01-14T13:00:00Z');
    assert.strictEqual(relativeTime(date23h, baseTime), '23h');
  });

  await t.test('returns formatted date for times a day or more ago', () => {
    const date1d = new Date('2024-01-14T12:00:00Z');
    assert.strictEqual(relativeTime(date1d, baseTime), 'Jan 14');

    const date7d = new Date('2024-01-08T12:00:00Z');
    assert.strictEqual(relativeTime(date7d, baseTime), 'Jan 8');

    const dateOldYear = new Date('2023-12-25T12:00:00Z');
    assert.strictEqual(relativeTime(dateOldYear, baseTime), 'Dec 25');
  });

  await t.test('handles edge case at exactly 1 hour', () => {
    const date1h = new Date('2024-01-15T11:00:00Z');
    assert.strictEqual(relativeTime(date1h, baseTime), '1h');
  });

  await t.test('handles edge case at exactly 24 hours', () => {
    const date24h = new Date('2024-01-14T12:00:00Z');
    assert.strictEqual(relativeTime(date24h, baseTime), 'Jan 14');
  });
});
