import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function PoolingScreen() {
  const [year, setYear] = useState(2024);
  const [ships, setShips] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [poolResult, setPoolResult] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${API}/compliance/adjusted-cb?year=${year}`)
      .then(r => r.json())
      .then(setShips);
  }, [year]);

  function toggleShip(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  }

  async function createPool() {
    const result = await fetch(`${API}/pools`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, members: selected })
    }).then(r => r.json());
    setPoolResult(result);
  }

  return (
    <AppShell>
      <h2 className="text-2xl font-semibold mb-4">Pooling</h2>

      <div className="mb-4">
        <label>Year: </label>
        <select value={year} onChange={e => setYear(Number(e.target.value))} className="border px-2 py-1">
          <option>2024</option>
          <option>2025</option>
        </select>
      </div>

      <h3 className="text-xl mb-2">Select Ships to Pool</h3>
      <table className="w-full border-collapse border text-sm mb-4">
        <thead className="bg-gray-300 dark:bg-gray-700">
          <tr>
            <th className="border px-2 py-1">Select</th>
            <th className="border px-2 py-1">Ship</th>
            <th className="border px-2 py-1">CB (Before)</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((s: any) => (
            <tr key={s.shipId}>
              <td className="border px-2 py-1">
                <input type="checkbox" checked={selected.includes(s.shipId)} onChange={() => toggleShip(s.shipId)} />
              </td>
              <td className="border px-2 py-1">{s.shipId}</td>
              <td className="border px-2 py-1">{s.cb_before.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={createPool}
        className="border px-4 py-2 rounded bg-blue-600 text-white mb-6"
        disabled={selected.length < 2}
      >
        Create Pool
      </button>

      {poolResult && (
        <div>
          <h3 className="text-xl mb-2">Pool Result</h3>
          <table className="w-full border-collapse border text-sm">
            <thead className="bg-gray-300 dark:bg-gray-700">
              <tr>
                <th className="border px-2 py-1">Ship</th>
                <th className="border px-2 py-1">CB Before</th>
                <th className="border px-2 py-1">CB After</th>
              </tr>
            </thead>
            <tbody>
              {poolResult.members.map((m: any) => (
                <tr key={m.shipId}>
                  <td className="border px-2 py-1">{m.shipId}</td>
                  <td className="border px-2 py-1">{m.cb_before.toFixed(2)}</td>
                  <td className="border px-2 py-1">{m.cb_after.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 text-lg">
            Pool Total:{" "}
            <strong className={poolResult.total >= 0 ? "text-green-500" : "text-red-500"}>
              {poolResult.total.toFixed(2)}
            </strong>
          </p>
        </div>
      )}
    </AppShell>
  );
}
