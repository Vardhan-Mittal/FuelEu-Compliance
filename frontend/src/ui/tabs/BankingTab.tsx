import React, { useState } from 'react';
import { complianceApi, bankingApi } from '../../adapters/infrastructure/httpComplianceApi';

export function BankingTab() {
  const [shipId, setShipId] = useState('V-001');
  const [year, setYear] = useState(2025);
  const [actual, setActual] = useState(91.0);
  const [fuelT, setFuelT] = useState(5000);
  const [snapshot, setSnapshot] = useState<any>(null);
  const [records, setRecords] = useState<any>(null);
  const [amount, setAmount] = useState(1000);
  const [msg, setMsg] = useState<string|undefined>();

  const load = async () => {
    const cb = await complianceApi.cb(shipId, year, actual, fuelT);
    setSnapshot(cb);
    setRecords(await bankingApi.records(shipId, year));
  };

  return (
    <div className="bg-white rounded p-4 shadow space-y-4">
      <div className="flex gap-2">
        <input className="border rounded px-2 py-1" value={shipId} onChange={e=>setShipId(e.target.value)} />
        <input className="border rounded px-2 py-1 w-24" type="number" value={year} onChange={e=>setYear(+e.target.value)} />
        <input className="border rounded px-2 py-1 w-28" type="number" value={actual} onChange={e=>setActual(+e.target.value)} placeholder="Actual CI"/>
        <input className="border rounded px-2 py-1 w-28" type="number" value={fuelT} onChange={e=>setFuelT(+e.target.value)} placeholder="Fuel (t)"/>
        <button onClick={load} className="px-3 py-1 bg-blue-600 text-white rounded">Compute & Load</button>
      </div>

      {snapshot && (
        <div className="text-sm">
          <div>CB: <b>{snapshot.cb.toFixed(2)}</b> gCO₂e — target {snapshot.target}, actual {snapshot.actual}, energy {snapshot.fuelT*41000} MJ</div>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <input className="border rounded px-2 py-1 w-28" type="number" value={amount} onChange={e=>setAmount(+e.target.value)} />
        <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={async()=>{
          setMsg(undefined);
          try { const r = await bankingApi.bank(shipId, year, amount); setMsg(`Banked ${r.applied}`); setRecords(await bankingApi.records(shipId, year)); }
          catch(e:any){ setMsg(e?.response?.data?.error || e.message); }
        }}>Bank</button>
        <button className="px-3 py-1 bg-amber-600 text-white rounded" onClick={async()=>{
          setMsg(undefined);
          try { const r = await bankingApi.apply(shipId, year, amount); setMsg(`Applied ${r.applied}`); setRecords(await bankingApi.records(shipId, year)); }
          catch(e:any){ setMsg(e?.response?.data?.error || e.message); }
        }}>Apply</button>
        {msg && <span className="text-sm">{msg}</span>}
      </div>

      {records && (
        <div className="text-sm">
          <div><b>Banked available:</b> {records.totalBanked}</div>
          <ul className="list-disc ml-6">
            {records.entries.map((e:any, i:number)=>(<li key={i}>{e.amount} @ {new Date(e.createdAt).toLocaleString()}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}
