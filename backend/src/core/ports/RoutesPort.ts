import { Route } from '../domain/types';

export interface RoutesPort {
  getAll(): Promise<Route[]>;
  setBaseline(routeId: string): Promise<void>;
  getComparison(): Promise<{ baseline: Route; comparisons: (Route & { percentDiff: number; compliant: boolean })[] }>;
}
