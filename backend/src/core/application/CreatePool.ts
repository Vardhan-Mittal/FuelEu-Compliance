import { PoolMember } from '../ports/PoolingPort';

export function allocatePooling(members: PoolMember[]): PoolMember[] {
  // Greedy: sort by cb desc, transfer surplus to deficits
  const surplus = members.filter(m => m.cbBefore > 0).sort((a,b)=>b.cbBefore - a.cbBefore);
  const deficits = members.filter(m => m.cbBefore < 0).sort((a,b)=>a.cbBefore - b.cbBefore); // most negative first
  const res = members.map(m => ({...m, cbAfter: m.cbBefore}));

  for (const s of surplus) {
    let sRef = res.find(r=>r.shipId===s.shipId)!;
    for (const d of deficits) {
      let dRef = res.find(r=>r.shipId===d.shipId)!;
      if (sRef.cbAfter! <= 0) break;
      if (dRef.cbAfter! >= 0) continue;
      const transfer = Math.min(sRef.cbAfter!, -dRef.cbAfter!);
      sRef.cbAfter = +(sRef.cbAfter! - transfer).toFixed(2);
      dRef.cbAfter = +(dRef.cbAfter! + transfer).toFixed(2);
    }
  }

  // Invariants:
  // - Deficit ship cannot exit worse
  // - Surplus ship cannot exit negative
  for (const r of res) {
    if (r.cbBefore < 0) r.cbAfter = Math.max(r.cbAfter!, r.cbBefore);
    if (r.cbBefore > 0) r.cbAfter = Math.max(0, r.cbAfter!);
  }
  return res;
}
