import React, { useState } from 'react';
import { poolsApi } from '../../adapters/infrastructure/httpComplianceApi';

type Member = { shipId: string; cbBefore: number; cbAfter?: number };

export function PoolingTab() {
  const [year, setYear] = useState(2025);
  const [members, setMembers] = useState<Member[]>([
    { shipId: 'S1', cbBefore: 12000 },
    { shipId: 'S2', cbBefore: -5000 },
    { shipId: 'S3', cbBefore: -3000 },
    { shipId: 'S4', cbBefore: 1000 },
  ]);
  const [result, setResult] = useState<any>(null);
  const sum = members.reduce((a,m)=>a+m.cbBefore,0);

  const add = () => setMembers(ms=>[...ms, { shipId: `S${ms.length+1}`, cbBefore: 0 }]);
  const update = (i:number, key:keyof Member, val:any) => setMembers(ms => ms.map((m,idx)=> idx===i? {...m, [key]: key==='cbBefore'? +val : val }: m));

  const create = async () => {
    try {
      const out = await poolsApi.create(year, members.map(({shipId, cbBefore})=>({shipId, cbBefore})));
      setResult(out);
    } catch (e:any) {
      setResult({ error: e?.response?.data?.error || e.message });
    }
  };

  const valid = sum >= 0;

  return (
    <div className="bg-white rounded p-4 shadow space-y-4">
      <div className="flex gap-2 items-center">
        <input className="border rounded px-2 py-1 w-24" type="number" value={year} onChange={e=>setYear(+e.target.value)} />
        <button onClick={add} className="px-3 py-1 bg-gray-100 rounded border">Add Member</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="text-left border-b">
            <th className="py-2 pr-4">Ship</th>
            <th className="py-2 pr-4">CB Before</th>
          </tr></thead>
          <tbody>
            {members.map((m,i)=>(
              <tr key={i} className="border-b">
                <td className="py-2 pr-4"><input className="border rounded px-2 py-1" value={m.shipId} onChange={e=>update(i,'shipId',e.target.value)} /></td>
                <td className="py-2 pr-4"><input className="border rounded px-2 py-1 w-32" type="number" value={m.cbBefore} onChange={e=>update(i,'cbBefore',e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm">
        Pool Sum: <b className={valid ? 'text-green-600' : 'text-red-600'}>{sum}</b>
      </div>

      <button onClick={create} className="px-3 py-1 bg-blue-600 text-white rounded" disabled={!valid}>Create Pool</button>

      {result && (
        <pre className="bg-gray-50 p-3 rounded border text-xs overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
