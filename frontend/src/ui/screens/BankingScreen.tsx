import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function BankingScreen() {
  const [year, setYear] = useState(2024);
  const [cb, setCb] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  async function loadCB() {
    const data = await (await fetch(`${API}/compliance/cb?year=${year}`)).json();
    setCb(data.cb);
  }

  useEffect(() => {
    loadCB();
  }, [year]);

  async function bank() {
    await fetch(`${API}/banking/bank`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year })
    });
    loadCB();
  }

  async function apply() {
    await fetch(`${API}/banking/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, amount: Number(amount) })
    });
    loadCB();
  }

  return (
    <AppShell>
      <h2 className="text-2xl font-semibold mb-4">Banking</h2>

      <div className="space-x-3 mb-4">
        <label>Year:</label>
        <select className="border px-2 py-1" value={year} onChange={e => setYear(Number(e.target.value))}>
          <option>2024</option>
          <option>2025</option>
        </select>
      </div>

      <p className="mb-4 text-lg">
        Current Compliance Balance (CB): <strong>{cb !== null ? cb.toFixed(2) : "..."}</strong>
      </p>

      <div className="flex space-x-3 mb-4">
        <button onClick={bank} className="border px-3 py-2 rounded bg-green-500 text-white">
          Bank Surplus CB
        </button>
      </div>

      <div className="flex space-x-3">
        <input
          type="number"
          value={amount}
          placeholder="Amount to apply"
          onChange={e => setAmount(e.target.value)}
          className="border px-3 py-2"
        />
        <button onClick={apply} className="border px-3 py-2 rounded bg-blue-600 text-white">
          Apply Banked CB
        </button>
      </div>
    </AppShell>
  );
}
