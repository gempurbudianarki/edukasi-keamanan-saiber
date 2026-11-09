import test from 'node:test';
import assert from 'node:assert';
import { PRE_TEST_QUESTIONS, PRE_TEST_ANSWER_KEY } from './preTestData.js';

test('preTestData contains exactly 15 questions', () => {
  assert.strictEqual(PRE_TEST_QUESTIONS.length, 15);
  PRE_TEST_QUESTIONS.forEach((q, index) => {
    assert.strictEqual(q.number, index + 1);
    assert.strictEqual(q.options.length, 4);
    assert.ok(q.question.length > 10);
    assert.ok(q.explanation.length > 10);
    assert.ok(['A', 'B', 'C', 'D'].includes(q.correctAnswer));
    assert.deepStrictEqual(q.options.map(o => o.key), ['A', 'B', 'C', 'D']);
  });
});

test('preTestData answer key matches specification', () => {
  for (let i = 1; i <= 15; i++) {
    assert.ok(PRE_TEST_ANSWER_KEY[i]);
    const q = PRE_TEST_QUESTIONS.find(item => item.number === i);
    assert.strictEqual(q.correctAnswer, PRE_TEST_ANSWER_KEY[i]);
  }
});
