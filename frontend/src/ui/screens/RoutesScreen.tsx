import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function RoutesScreen() {
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/routes`).then(r => r.json()).then(setRoutes);
  }, []);

  async function setBaseline(routeId: string) {
    await fetch(`${API}/routes/${routeId}/baseline`, { method: "POST" });
    setRoutes(await (await fetch(`${API}/routes`)).json());
  }

  return (
    <AppShell>
      <h2 className="text-2xl font-semibold mb-4">Routes</h2>

      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-300 dark:bg-gray-700">
          <tr>
            <th className="border px-2 py-1">Route</th>
            <th className="border px-2 py-1">Vessel</th>
            <th className="border px-2 py-1">Fuel</th>
            <th className="border px-2 py-1">Year</th>
            <th className="border px-2 py-1">GHG</th>
            <th className="border px-2 py-1">Baseline</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {routes.map(r => (
            <tr key={r.routeId}>
              <td className="border px-2 py-1">{r.routeId}</td>
              <td className="border px-2 py-1">{r.vesselType}</td>
              <td className="border px-2 py-1">{r.fuelType}</td>
              <td className="border px-2 py-1">{r.year}</td>
              <td className="border px-2 py-1">{r.ghgIntensity.toFixed(2)}</td>
              <td className="border px-2 py-1">{r.isBaseline ? "✅" : ""}</td>
              <td className="border px-2 py-1">
                {!r.isBaseline && (
                  <button
                    onClick={() => setBaseline(r.routeId)}
                    className="px-2 py-1 border rounded"
                  >
                    Set Baseline
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppShell>
  );
}
