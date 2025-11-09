import { Route } from "../../../core/domain/types";

const TARGET_INTENSITY = 89.3368;

export class BankingRepo {
  private banked: Record<string, number> = {};

  calculateCB(route: Route) {
    const energy = route.fuelConsumptionT * 41000;
    const cb = (TARGET_INTENSITY - route.ghgIntensity) * energy;
    return Math.round(cb);
  }

  bank(shipId: string, amount: number) {
    this.banked[shipId] = (this.banked[shipId] || 0) + amount;
  }

  getBanked(shipId: string) {
    return this.banked[shipId] || 0;
  }

  apply(shipId: string, amount: number) {
    const available = this.getBanked(shipId);
    if (amount > available) return false;
    this.banked[shipId] = available - amount;
    return true;
  }
}
