import { Route } from '../domain/types';

export interface RoutesApi {
  list(): Promise<Route[]>;
  setBaseline(routeId: string): Promise<void>;
  comparison(): Promise<{ baseline: Route; comparisons: (Route & { percentDiff: number; compliant: boolean })[] }>;
}
