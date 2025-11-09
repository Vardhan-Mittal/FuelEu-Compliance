export type RouteId = string;
export interface Route {
  routeId: RouteId;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumptionT: number;
  distanceKm: number;
  totalEmissionsT: number;
  isBaseline?: boolean;
}
