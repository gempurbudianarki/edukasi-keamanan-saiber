import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateMissionAccuracy } from './scoring.js';

test('calculateMissionAccuracy returns 0 for empty or invalid history', () => {
  assert.strictEqual(calculateMissionAccuracy([], 10), 0);
  assert.strictEqual(calculateMissionAccuracy(null, 10), 0);
  assert.strictEqual(calculateMissionAccuracy(undefined, 10), 0);
});

test('calculateMissionAccuracy is idempotent on duplicate question IDs', () => {
  const history = [
    { id: 'q1', correct: true },
    { id: 'q1', correct: false }, // user answered again
    { id: 'q2', correct: true }
  ];
  // q1 latest is false, q2 is true -> 1 of 4 correct = 25%
  assert.strictEqual(calculateMissionAccuracy(history, 4), 25);
});

test('calculateMissionAccuracy calculates correct percentage with fixed denominator', () => {
  const history = [
    { id: 'q1', correct: true },
    { id: 'q2', correct: true },
    { id: 'q3', correct: true }
  ];
  // 3 out of 4 = 75%
  assert.strictEqual(calculateMissionAccuracy(history, 4), 75);
  // Cap at 100
  assert.strictEqual(calculateMissionAccuracy(history, 3), 100);
});
