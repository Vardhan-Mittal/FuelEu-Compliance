export interface CompliancePort {
  computeCB(args: { shipId: string; year: number; ghgIntensity: number; fuelConsumptionT: number; target: number }): number;
}
