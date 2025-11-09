import { Router } from 'express';
import { RoutesRepo } from '../../outbound/inmemory/RoutesRepo';
const repo = new RoutesRepo();

export const routesRouter = Router();

routesRouter.get('/', async (_req, res) => {
  const data = await repo.getAll();
  res.json(data);
});

routesRouter.post('/:id/baseline', async (req, res) => {
  await repo.setBaseline(req.params.id);
  res.json({ ok: true });
});

routesRouter.get('/comparison', async (_req, res) => {
  const data = await repo.getComparison();
  res.json(data);
});
