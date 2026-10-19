import { test } from 'node:test';
import assert from 'node:assert';
import { relativeTime } from './relativeTime.js';

const baseTime = new Date('2024-01-15T12:00:00Z');

test('relativeTime - under a minute', async (t) => {
  await t.test('should return "just now" for 0 seconds difference', () => {
    const date = new Date(baseTime);
    assert.strictEqual(relativeTime(date, baseTime), 'just now');
  });

  await t.test('should return "just now" for 30 seconds difference', () => {
    const date = new Date(baseTime.getTime() - 30 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), 'just now');
  });

  await t.test('should return "just now" for 59 seconds difference', () => {
    const date = new Date(baseTime.getTime() - 59 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), 'just now');
  });
});

test('relativeTime - under an hour', async (t) => {
  await t.test('should return "1m" for 1 minute difference', () => {
    const date = new Date(baseTime.getTime() - 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), '1m');
  });

  await t.test('should return "5m" for 5 minutes difference', () => {
    const date = new Date(baseTime.getTime() - 5 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), '5m');
  });

  await t.test('should return "30m" for 30 minutes difference', () => {
    const date = new Date(baseTime.getTime() - 30 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), '30m');
  });

  await t.test('should return "59m" for 59 minutes difference', () => {
    const date = new Date(baseTime.getTime() - 59 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), '59m');
  });
});

test('relativeTime - under a day', async (t) => {
  await t.test('should return "1h" for 1 hour difference', () => {
    const date = new Date(baseTime.getTime() - 60 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), '1h');
  });

  await t.test('should return "3h" for 3 hours difference', () => {
    const date = new Date(baseTime.getTime() - 3 * 60 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), '3h');
  });

  await t.test('should return "12h" for 12 hours difference', () => {
    const date = new Date(baseTime.getTime() - 12 * 60 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), '12h');
  });

  await t.test('should return "23h" for 23 hours difference', () => {
    const date = new Date(baseTime.getTime() - 23 * 60 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), '23h');
  });
});

test('relativeTime - a day or more', async (t) => {
  await t.test('should return formatted date for 1 day difference', () => {
    const date = new Date(baseTime.getTime() - 24 * 60 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), 'Jan 14');
  });

  await t.test('should return formatted date for 7 days difference', () => {
    const date = new Date(baseTime.getTime() - 7 * 24 * 60 * 60 * 1000);
    assert.strictEqual(relativeTime(date, baseTime), 'Jan 8');
  });

  await t.test('should return formatted date for different month', () => {
    const date = new Date('2023-12-15T12:00:00Z');
    assert.strictEqual(relativeTime(date, baseTime), 'Dec 15');
  });

  await t.test('should return formatted date for different year', () => {
    const date = new Date('2023-01-15T12:00:00Z');
    assert.strictEqual(relativeTime(date, baseTime), 'Jan 15');
  });
});
