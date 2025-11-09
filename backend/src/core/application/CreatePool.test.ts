import { allocatePooling } from './CreatePool';

test('pooling respects invariants', () => {
  const members = [
    { shipId: 'A', cbBefore: 1000 },
    { shipId: 'B', cbBefore: -400 },
    { shipId: 'C', cbBefore: -500 },
  ];
  const out = allocatePooling(members);
  const a = out.find(m=>m.shipId==='A')!;
  const b = out.find(m=>m.shipId==='B')!;
  const c = out.find(m=>m.shipId==='C')!;
  expect(a.cbAfter).toBeGreaterThanOrEqual(0);
  expect(b.cbAfter!).toBeGreaterThanOrEqual(-400);
  expect(c.cbAfter!).toBeGreaterThanOrEqual(-500);
});
