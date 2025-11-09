import express from "express";
import cors from "cors";
import dotenv from "dotenv";



import { routesRouter } from "../../adapters/inbound/http/routesRouter";
import { complianceRouter } from "../../adapters/inbound/http/complianceRouter";
import { bankingRouter } from "../../adapters/inbound/http/bankingRouter";   // ✅ HERE
import { poolsRouter } from "../../adapters/inbound/http/poolsRouter";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/routes', routesRouter);
app.use('/compliance', complianceRouter);
app.use('/banking', bankingRouter);    // ✅ HERE
app.use('/pools', poolsRouter);
app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'FuelEU Backend Running' });
});


app.listen(4000, () => console.log("Backend listening on :4000"));
