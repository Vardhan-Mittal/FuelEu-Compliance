import { computeCB } from './ComputeCB';

test('compute CB positive surplus', () => {
  const cb = computeCB(88, 89.3368, 1000);
  expect(cb).toBeGreaterThan(0);
});

test('compute CB negative deficit', () => {
  const cb = computeCB(92, 89.3368, 1000);
  expect(cb).toBeLessThan(0);
});
