import { useEffect, useState } from 'react';
import type { SpkSession } from '../../../types/spk';
import { getSessions } from '../../../api/sessions';

interface SessionSelectorProps {
  sessionId: number | null;
  onChange: (id: number | null) => void;
}

// Dropdown pemilih sesi SPK (GET /api/sessions). Dipakai di header PerhitunganPage
// supaya ke-4 view (Pembobotan, SAW, WP, TOPSIS) selalu menghitung untuk sesi yang sama.
export default function SessionSelector({ sessionId, onChange }: SessionSelectorProps) {
  const [sessions, setSessions] = useState<SpkSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getSessions();
      setSessions(data);
      // Kalau belum ada sesi terpilih, otomatis pilih sesi terakhir (paling baru)
      if (data.length > 0 && sessionId === null) {
        onChange(data[data.length - 1].id);
      }
    } catch (err) {
      console.error('Gagal memuat daftar sesi:', err);
      setError('Gagal memuat daftar sesi dari server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <label className="text-sm font-bold text-slate-700 whitespace-nowrap">
        Sesi SPK:
      </label>

      <select
        value={sessionId ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        disabled={isLoading || sessions.length === 0}
        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-white text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50 disabled:text-slate-400"
      >
        {sessions.length === 0 && <option value="">Belum ada sesi</option>}
        {sessions.map((s) => (
          <option key={s.id} value={s.id}>
            Sesi #{s.id}{s.created_at ? ` — ${new Date(s.created_at).toLocaleString('id-ID')}` : ''}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={loadSessions}
        disabled={isLoading}
        className="px-4 py-2 rounded-lg font-bold text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
      >
        {isLoading ? 'Memuat...' : 'Refresh'}
      </button>

      {error && <span className="text-xs font-bold text-red-600">{error}</span>}
    </div>
  );
}
