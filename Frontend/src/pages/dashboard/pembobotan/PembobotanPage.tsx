import { useState } from 'react';
import SessionSelector from './SessionSelector';
import KriteriaBobotView from './KriteriaBobotView';
import SawView from './SawView';
import WpView from './WpView';
import TopsisView from './TopsisView';

type TabKey = 'bobot' | 'saw' | 'wp' | 'topsis';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'bobot', label: 'Alternatif & Kriteria Bobot' },
  { key: 'saw', label: 'Metode SAW' },
  { key: 'wp', label: 'Metode WP' },
  { key: 'topsis', label: 'Metode TOPSIS' },
];

// Halaman "Perhitungan SPK" — berisi 4 view terpisah (masing-masing file/komponen sendiri):
// 1. KriteriaBobotView -> bobot kriteria per sesi (GET/PUT/DELETE /api/sessions/:id/pembobotan)
// 2. SawView            -> GET /api/recommendation/saw?session_id=
// 3. WpView             -> GET /api/recommendation/wp?session_id=
// 4. TopsisView         -> GET /api/recommendation/topsis?session_id=
// Session selector di atas dipakai bersama supaya ke-4 view menghitung untuk sesi yang sama,
// tapi hanya SATU view yang dirender pada satu waktu (benar-benar terpisah, bukan digabung).
export default function PembobotanPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('bobot');
  const [sessionId, setSessionId] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="font-bold text-slate-700 hidden md:block">Perhitungan SPK</h3>

      {/* Pemilih sesi — dipakai bersama oleh ke-4 view di bawah */}
      <SessionSelector sessionId={sessionId} onChange={setSessionId} />

      {/* Tab navigasi ke-4 view */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'bg-[#1e2530] text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hanya render 1 view aktif pada satu waktu */}
      <div className="w-full">
        {activeTab === 'bobot' && <KriteriaBobotView sessionId={sessionId} />}
        {activeTab === 'saw' && <SawView sessionId={sessionId} />}
        {activeTab === 'wp' && <WpView sessionId={sessionId} />}
        {activeTab === 'topsis' && <TopsisView sessionId={sessionId} />}
      </div>
    </div>
  );
}
