export type PoolMember = { shipId: string; cbBefore: number; cbAfter?: number };
export interface PoolingPort {
  createPool(year: number, members: PoolMember[]): Promise<{ year: number; members: PoolMember[]; sum: number }>;
}
