// Compliance Balance (CB) = (Target - Actual) * Energy_in_scope
// Energy_in_scope (MJ) ≈ fuelConsumption(t) * 41_000
export const ENERGY_PER_TONNE_MJ = 41_000;

export function computeCB(actualIntensity: number, targetIntensity: number, fuelConsumptionT: number): number {
  const energy = fuelConsumptionT * ENERGY_PER_TONNE_MJ;
  return (targetIntensity - actualIntensity) * energy;
}
