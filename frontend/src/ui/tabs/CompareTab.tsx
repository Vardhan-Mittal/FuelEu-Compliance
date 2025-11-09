import React, { useEffect, useMemo, useState } from 'react';
import { httpRoutesApi } from '../../adapters/infrastructure/httpRoutesApi';

const TARGET = 89.3368;

export function CompareTab() {
  const api = useMemo(()=>httpRoutesApi(),[]);
  const [data, setData] = useState<any>(null);

  useEffect(()=>{ api.comparison().then(setData); }, []);

  if (!data) return <div className="bg-white rounded p-4 shadow">Loading...</div>;

  const { baseline, comparisons } = data;

  return (
    <div className="bg-white rounded p-4 shadow space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Baseline</h3>
        <div className="text-sm">Route <b>{baseline.routeId}</b> — GHG Intensity <b>{baseline.ghgIntensity.toFixed(3)}</b> gCO₂e/MJ</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="text-left border-b">
            <th className="py-2 pr-4">Route</th>
            <th className="py-2 pr-4">GHG Intensity</th>
            <th className="py-2 pr-4">% Difference vs Baseline</th>
            <th className="py-2 pr-4">Compliant vs Target ({TARGET})</th>
          </tr></thead>
          <tbody>
            {comparisons.map((r:any)=>(
              <tr key={r.routeId} className="border-b">
                <td className="py-2 pr-4">{r.routeId}</td>
                <td className="py-2 pr-4">{r.ghgIntensity.toFixed(3)}</td>
                <td className="py-2 pr-4">{r.percentDiff.toFixed(2)}%</td>
                <td className="py-2 pr-4">{r.compliant ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Chart</h3>
        <div className="flex gap-2 items-end">
          {[baseline, ...comparisons].map((r:any)=>(
            <div key={r.routeId} className="flex flex-col items-center">
              <div className="bg-gray-300 w-10" style={{ height: `${r.ghgIntensity}px` }}></div>
              <div className="text-xs mt-1">{r.routeId}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
