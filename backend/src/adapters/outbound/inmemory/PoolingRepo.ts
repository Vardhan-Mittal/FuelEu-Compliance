import { PoolingPort, PoolMember } from '../../../core/ports/PoolingPort';
import { allocatePooling } from '../../../core/application/CreatePool';

export class PoolingRepo implements PoolingPort {
  async createPool(year: number, members: PoolMember[]) {
    const allocated = allocatePooling(members);
    const sum = allocated.reduce((a, m)=> a + (m.cbAfter ?? m.cbBefore), 0);
    if (sum < -1e-6) throw new Error('Pool sum must be >= 0');
    // Validate invariants
    for (const m of allocated) {
      if (m.cbBefore < 0 && (m.cbAfter ?? m.cbBefore) < m.cbBefore) throw new Error('Deficit ship exits worse');
      if (m.cbBefore > 0 && (m.cbAfter ?? m.cbBefore) < 0) throw new Error('Surplus ship exits negative');
    }
    return { year, members: allocated, sum: +sum.toFixed(2) };
  }
}
