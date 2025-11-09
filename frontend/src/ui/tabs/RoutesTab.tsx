import React, { useEffect, useMemo, useState } from 'react';
import { httpRoutesApi } from '../../adapters/infrastructure/httpRoutesApi';
import { Route } from '../../core/domain/types';

export function RoutesTab() {
  const api = useMemo(()=>httpRoutesApi(),[]);
  const [rows, setRows] = useState<Route[]>([]);
  const [filters, setFilters] = useState({ vesselType:'', fuelType:'', year:'' });

  const load = async () => setRows(await api.list());
  useEffect(()=>{ load(); }, []);

  const filtered = rows.filter(r => 
    (!filters.vesselType || r.vesselType===filters.vesselType) &&
    (!filters.fuelType || r.fuelType===filters.fuelType) &&
    (!filters.year || String(r.year)===filters.year)
  );

  const setBaseline = async (id: string) => {
    await api.setBaseline(id);
    await load();
  };

  const vesselTypes = Array.from(new Set(rows.map(r=>r.vesselType)));
  const fuelTypes = Array.from(new Set(rows.map(r=>r.fuelType)));
  const years = Array.from(new Set(rows.map(r=>r.year))).sort();

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex gap-3 mb-4">
        <select className="border rounded px-2 py-1" value={filters.vesselType} onChange={e=>setFilters(f=>({...f, vesselType:e.target.value}))}>
          <option value="">All vessel types</option>
          {vesselTypes.map(v=><option key={v}>{v}</option>)}
        </select>
        <select className="border rounded px-2 py-1" value={filters.fuelType} onChange={e=>setFilters(f=>({...f, fuelType:e.target.value}))}>
          <option value="">All fuel types</option>
          {fuelTypes.map(v=><option key={v}>{v}</option>)}
        </select>
        <select className="border rounded px-2 py-1" value={filters.year} onChange={e=>setFilters(f=>({...f, year:e.target.value}))}>
          <option value="">All years</option>
          {years.map(v=><option key={v}>{v}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              {['routeId','vesselType','fuelType','year','ghgIntensity','fuelConsumption (t)','distance (km)','totalEmissions (t)','baseline','actions'].map(h=>(
                <th key={h} className="py-2 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r=>(
              <tr key={r.routeId} className="border-b">
                <td className="py-2 pr-4">{r.routeId}</td>
                <td className="py-2 pr-4">{r.vesselType}</td>
                <td className="py-2 pr-4">{r.fuelType}</td>
                <td className="py-2 pr-4">{r.year}</td>
                <td className="py-2 pr-4">{r.ghgIntensity.toFixed(3)}</td>
                <td className="py-2 pr-4">{r.fuelConsumptionT}</td>
                <td className="py-2 pr-4">{r.distanceKm}</td>
                <td className="py-2 pr-4">{r.totalEmissionsT}</td>
                <td className="py-2 pr-4">{r.isBaseline ? '✅' : ''}</td>
                <td className="py-2 pr-4">
                  <button onClick={()=>setBaseline(r.routeId)} className="text-blue-600 underline">Set Baseline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
