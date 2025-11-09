import { Router } from 'express';
import { computeCB } from '../../../core/application/ComputeCB';
import { BankingRepo } from '../../outbound/inmemory/BankingRepo';

const TARGET_2025 = 89.3368;
const banking = new BankingRepo();

export const complianceRouter = Router();

// GET /compliance/cb?shipId&year&actual&fuelT
complianceRouter.get('/cb', (req, res) => {
  const shipId = String(req.query.shipId ?? 'V-001');
  const year = Number(req.query.year ?? 2025);
  const actual = Number(req.query.actual ?? 91.0);
  const fuelT = Number(req.query.fuelT ?? 5000);
  const cb = computeCB(actual, TARGET_2025, fuelT);
  // snapshot store
  banking.bank(shipId, cb);
  res.json({ shipId, year, target: TARGET_2025, actual, fuelT, cb });
});
// GET /compliance/adjusted-cb?year=YYYY
complianceRouter.get("/adjusted-cb", async (req, res) => {
  const year = Number(req.query.year);

  // TEMPORARY DEMO DATA — replace later with DB values
  const ships = [
    { shipId: "V-001", cb_before: 1200 },
    { shipId: "V-002", cb_before: -500 },
    { shipId: "V-003", cb_before: 300 },
    { shipId: "V-004", cb_before: -200 }
  ];

  return res.json(ships);
});


export { banking };
