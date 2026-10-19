#!/usr/bin/env node

/**
 * Simple test runner for relativeTime tests
 * Uses Node.js built-in assert module
 */

const assert = require('assert');
const { relativeTime } = require('./src/utils/relativeTime');

let testCount = 0;
let passCount = 0;
let failCount = 0;

function test(description, fn) {
  testCount++;
  try {
    fn();
    passCount++;
    console.log(`✓ ${description}`);
  } catch (error) {
    failCount++;
    console.error(`✗ ${description}`);
    console.error(`  ${error.message}`);
  }
}

// Test data
const baseTime = new Date('2024-01-15T12:00:00Z');

console.log('Running relativeTime tests...\n');

// Under a minute
test('should return "just now" for times less than 60 seconds ago', () => {
  const date = new Date('2024-01-15T11:59:30Z');
  assert.strictEqual(relativeTime(date, baseTime), 'just now');
});

test('should return "just now" for times 0 seconds ago', () => {
  assert.strictEqual(relativeTime(baseTime, baseTime), 'just now');
});

test('should return "just now" for times 59 seconds ago', () => {
  const date = new Date('2024-01-15T11:59:01Z');
  assert.strictEqual(relativeTime(date, baseTime), 'just now');
});

// Under an hour
test('should return "1m" for 1 minute ago', () => {
  const date = new Date('2024-01-15T11:59:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '1m');
});

test('should return "5m" for 5 minutes ago', () => {
  const date = new Date('2024-01-15T11:55:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '5m');
});

test('should return "30m" for 30 minutes ago', () => {
  const date = new Date('2024-01-15T11:30:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '30m');
});

test('should return "59m" for 59 minutes ago', () => {
  const date = new Date('2024-01-15T11:01:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '59m');
});

// Under a day
test('should return "1h" for 1 hour ago', () => {
  const date = new Date('2024-01-15T11:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '1h');
});

test('should return "3h" for 3 hours ago', () => {
  const date = new Date('2024-01-15T09:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '3h');
});

test('should return "12h" for 12 hours ago', () => {
  const date = new Date('2024-01-15T00:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '12h');
});

test('should return "23h" for 23 hours ago', () => {
  const date = new Date('2024-01-14T13:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '23h');
});

// A day or older
test('should return "MMM d" format for 1 day ago', () => {
  const date = new Date('2024-01-14T12:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), 'Jan 14');
});

test('should return "MMM d" format for 7 days ago', () => {
  const date = new Date('2024-01-08T12:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), 'Jan 8');
});

test('should return "MMM d" format for dates in different months', () => {
  const date = new Date('2023-12-25T12:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), 'Dec 25');
});

test('should return "MMM d" format for dates in different years', () => {
  const date = new Date('2023-01-15T12:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), 'Jan 15');
});

// Edge cases
test('should handle exactly 60 seconds as "1m"', () => {
  const date = new Date('2024-01-15T11:59:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '1m');
});

test('should handle exactly 60 minutes as "1h"', () => {
  const date = new Date('2024-01-15T11:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), '1h');
});

test('should handle exactly 24 hours as "Jan 14"', () => {
  const date = new Date('2024-01-14T12:00:00Z');
  assert.strictEqual(relativeTime(date, baseTime), 'Jan 14');
});

console.log(`\n${passCount} passed, ${failCount} failed out of ${testCount} tests`);

process.exit(failCount > 0 ? 1 : 0);
