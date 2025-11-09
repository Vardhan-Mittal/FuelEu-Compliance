import { RoutesPort } from '../../../core/ports/RoutesPort';
import { Route } from '../../../core/domain/types';
import { percentDiff, isCompliant } from '../../../core/application/ComputeComparison';

const TARGET_2025 = 89.3368;

const seed: Route[] = [
  { routeId: 'R001', vesselType: 'Container',   fuelType: 'HFO', year: 2024, ghgIntensity: 91.0, fuelConsumptionT: 5000, distanceKm: 12000, totalEmissionsT: 4500, isBaseline: true },
  { routeId: 'R002', vesselType: 'BulkCarrier', fuelType: 'LNG', year: 2024, ghgIntensity: 88.0, fuelConsumptionT: 4800, distanceKm: 11500, totalEmissionsT: 4200 },
  { routeId: 'R003', vesselType: 'Tanker',      fuelType: 'MGO', year: 2024, ghgIntensity: 93.5, fuelConsumptionT: 5100, distanceKm: 12500, totalEmissionsT: 4700 },
  { routeId: 'R004', vesselType: 'RoRo',        fuelType: 'HFO', year: 2025, ghgIntensity: 89.2, fuelConsumptionT: 4900, distanceKm: 11800, totalEmissionsT: 4300 },
  { routeId: 'R005', vesselType: 'Container',   fuelType: 'LNG', year: 2025, ghgIntensity: 90.5, fuelConsumptionT: 4950, distanceKm: 11900, totalEmissionsT: 4400 },
];

export class RoutesRepo implements RoutesPort {
  private routes: Route[] = [...seed];

  async getAll(): Promise<Route[]> {
    return this.routes;
  }

  async setBaseline(routeId: string): Promise<void> {
    this.routes = this.routes.map(r => ({...r, isBaseline: r.routeId === routeId}));
  }

  async getComparison() {
    const baseline = this.routes.find(r => r.isBaseline) ?? this.routes[0];
    const comparisons = this.routes.filter(r => r.routeId !== baseline.routeId).map(r => ({
      ...r,
      percentDiff: percentDiff(r.ghgIntensity, baseline.ghgIntensity),
      compliant: isCompliant(r.ghgIntensity, TARGET_2025),
    }));
    return { baseline, comparisons };
  }
}
