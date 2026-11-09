import { test } from 'node:test';
import assert from 'node:assert/strict';
import { POST_TEST_QUESTIONS, POST_TEST_ANSWER_KEY } from './postTestData.js';

test('postTestData contains exactly 15 questions', () => {
  assert.strictEqual(POST_TEST_QUESTIONS.length, 15);
});

test('postTestData answer key matches specification', () => {
  const expectedKeys = {
    1: 'B',
    2: 'B',
    3: 'B',
    4: 'A',
    5: 'B',
    6: 'B',
    7: 'C',
    8: 'C',
    9: 'B',
    10: 'A',
    11: 'C',
    12: 'B',
    13: 'A',
    14: 'B',
    15: 'B'
  };

  assert.deepStrictEqual(POST_TEST_ANSWER_KEY, expectedKeys);

  POST_TEST_QUESTIONS.forEach(q => {
    assert.strictEqual(q.correctAnswer, expectedKeys[q.number]);
    assert.strictEqual(q.options.length, 4);
    const keys = q.options.map(o => o.key);
    assert.deepStrictEqual(keys, ['A', 'B', 'C', 'D']);
  });
});
