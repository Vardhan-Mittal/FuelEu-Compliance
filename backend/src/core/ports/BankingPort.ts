export interface BankingPort {
  getCB(shipId: string, year: number): Promise<number>;
  bank(shipId: string, year: number, amount: number): Promise<{ cb_before: number; applied: number; cb_after: number }>;
  apply(shipId: string, year: number, amount: number): Promise<{ cb_before: number; applied: number; cb_after: number }>;
  getRecords(shipId: string, year: number): Promise<{ totalBanked: number; entries: { amount: number; createdAt: Date }[] }>;
}
