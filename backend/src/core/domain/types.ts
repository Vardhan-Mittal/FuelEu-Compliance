export type RouteId = string;
export type ShipId = string;

export interface Route {
  routeId: RouteId;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number; // gCO2e/MJ
  fuelConsumptionT: number; // tonnes
  distanceKm: number;
  totalEmissionsT: number;
  isBaseline?: boolean;
}

export interface CBRecord {
  shipId: ShipId;
  year: number;
  cb: number; // gCO2e (absolute)
}
