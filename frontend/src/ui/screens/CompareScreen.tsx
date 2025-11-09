import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
const TARGET_INTENSITY = 89.3368;

export default function CompareScreen() {
  const [data, setData] = useState<any[]>([]);
  const [baseline, setBaseline] = useState<any | null>(null);

  useEffect(() => {
    fetch(`${API}/routes/comparison`)
      .then(r => r.json())
      .then(({ baseline, comparisons }) => {
        setBaseline(baseline);
        setData(comparisons.map((c: any) => ({
          routeId: c.routeId,
          baseline: baseline.ghgIntensity,
          current: c.ghgIntensity,
          percentDiff: ((c.ghgIntensity / baseline.ghgIntensity) - 1) * 100,
          compliant: c.ghgIntensity <= TARGET_INTENSITY
        })));
      });
  }, []);

  return (
    <AppShell>
      <h2 className="text-2xl font-semibold mb-4">Compare Routes</h2>

      {baseline && (
        <p className="mb-4">
          Baseline Route: <strong>{baseline.routeId}</strong> — GHG: <strong>{baseline.ghgIntensity.toFixed(2)}</strong>
        </p>
      )}

      <table className="w-full border-collapse border text-sm mb-6">
        <thead className="bg-gray-300 dark:bg-gray-700">
          <tr>
            <th className="border px-2 py-1">Route</th>
            <th className="border px-2 py-1">GHG (Baseline)</th>
            <th className="border px-2 py-1">GHG (This Route)</th>
            <th className="border px-2 py-1">% Difference</th>
            <th className="border px-2 py-1">Compliant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.routeId}>
              <td className="border px-2 py-1">{row.routeId}</td>
              <td className="border px-2 py-1">{row.baseline.toFixed(2)}</td>
              <td className="border px-2 py-1">{row.current.toFixed(2)}</td>
              <td className="border px-2 py-1">
                {row.percentDiff.toFixed(2)}%
              </td>
              <td className="border px-2 py-1">
                {row.compliant ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mb-2">GHG Intensity Comparison Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="routeId" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="baseline" fill="#8884d8" name="Baseline" />
          <Bar dataKey="current" fill="#82ca9d" name="Current Route" />
        </BarChart>
      </ResponsiveContainer>
    </AppShell>
  );
}
