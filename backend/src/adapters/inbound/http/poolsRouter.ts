import { Router } from "express";
import { RoutesRepo } from "../../outbound/inmemory/RoutesRepo";
import { BankingRepo } from "../../outbound/inmemory/BankingRepo";

export const poolsRouter = Router();

const routesRepo = new RoutesRepo();
const banking = new BankingRepo();

poolsRouter.post("/", async (req, res) => {
  const { members } = req.body;
  if (!Array.isArray(members)) {
    return res.status(400).json({ error: "members[] required" });
  }

  const allRoutes = await routesRepo.getAll();
  const shipEntries = members.map(id => {
const route = allRoutes.find(r => r.routeId === id);

if (!route) {
  return {
    routeId: id,
    cb: 0 // or throw error, but 0 is fine for UI display
  };
}

return {
  routeId: id,
  cb: banking.calculateCB(route)
};

  });

  // Sum CB of pool
  const totalCB = shipEntries.reduce((sum, s) => sum + s.cb, 0);

  // Pool must not be negative
  if (totalCB < 0) {
    return res.status(400).json({ error: "Pool total CB must be >= 0" });
  }

  // Distribute CB fairly:
  // Surplus ships give to deficit ships, but no ship becomes worse or goes negative.
  let cbAfter = shipEntries.map(s => ({ ...s }));

  let surplus = cbAfter.filter(s => s.cb > 0);
  let deficit = cbAfter.filter(s => s.cb < 0);

  for (let d of deficit) {
    let need = Math.abs(d.cb);

    for (let s of surplus) {
      if (s.cb <= 0) continue;
      let give = Math.min(s.cb, need);
      s.cb -= give;
      d.cb += give;
      need -= give;
      if (need <= 0) break;
    }
  }

  res.json({
    members: cbAfter.map(s => ({
      routeId: s.routeId,
      before: shipEntries.find(x => x.routeId === s.routeId)?.cb,
      after: s.cb
    })),
    poolTotal: totalCB
  });
});
