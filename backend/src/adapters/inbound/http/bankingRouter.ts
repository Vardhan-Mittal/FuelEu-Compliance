import { Router } from "express";
import { RoutesRepo } from "../../outbound/inmemory/RoutesRepo";
import { BankingRepo } from "../../outbound/inmemory/BankingRepo";

export const bankingRouter = Router();
const routesRepo = new RoutesRepo();
const banking = new BankingRepo();

bankingRouter.get("/cb/:routeId", async (req, res) => {
  const all = await routesRepo.getAll();
  const route = all.find(r => r.routeId === req.params.routeId);
  if (!route) return res.status(404).json({ error: "Route not found" });

  const cb = banking.calculateCB(route);
  res.json({ routeId: route.routeId, cb });
});

bankingRouter.post("/bank/:routeId", async (req, res) => {
  const all = await routesRepo.getAll();
  const route = all.find(r => r.routeId === req.params.routeId);
  if (!route) return res.status(404).json({ error: "Route not found" });

  const cb = banking.calculateCB(route);
  if (cb <= 0) return res.status(400).json({ error: "No surplus to bank" });

  banking.bank(route.routeId, cb);
  res.json({ routeId: route.routeId, banked: banking.getBanked(route.routeId) });
});

bankingRouter.post("/apply/:routeId", async (req, res) => {
  const amount = Number(req.body.amount || 0);
  const ok = banking.apply(req.params.routeId, amount);
  res.json({ ok, remaining: banking.getBanked(req.params.routeId) });
});
