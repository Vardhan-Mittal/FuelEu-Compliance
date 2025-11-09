import React, { useState } from 'react';
import { RoutesTab } from './tabs/RoutesTab';
import { CompareTab } from './tabs/CompareTab';
import { BankingTab } from './tabs/BankingTab';
import { PoolingTab } from './tabs/PoolingTab';

export function Dashboard() {
  const [tab, setTab] = useState<'routes'|'compare'|'banking'|'pooling'>('routes');
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(['routes','compare','banking','pooling'] as const).map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`px-3 py-2 rounded ${tab===t?'bg-blue-600 text-white':'bg-white border'}`}>
            {t[0].toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      {tab==='routes' && <RoutesTab/>}
      {tab==='compare' && <CompareTab/>}
      {tab==='banking' && <BankingTab/>}
      {tab==='pooling' && <PoolingTab/>}
    </div>
  );
}
