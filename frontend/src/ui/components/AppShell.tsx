import { Link } from "react-router-dom";
import { useState } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

        <aside className="w-64 bg-gray-200 dark:bg-gray-800 p-5 space-y-4">
          <h1 className="text-xl font-bold">FuelEU Dashboard</h1>

          <nav className="space-y-1">
            <Link to="/routes" className="block hover:underline">Routes</Link>
            <Link to="/compare" className="block hover:underline">Compare</Link>
            <Link to="/banking" className="block hover:underline">Banking</Link>
            <Link to="/pooling" className="block hover:underline">Pooling</Link>
          </nav>

          <button
            onClick={() => setDark(!dark)}
            className="border px-3 py-2 rounded w-full"
          >
            Toggle {dark ? "Light" : "Dark"}
          </button>
        </aside>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
