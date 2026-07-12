import { useEffect, useState } from 'react';
import type { Pembobotan } from '../../../types/spk';
import { getPembobotanBySession, updatePembobotan, deletePembobotan } from '../../../api/sessions';

interface KriteriaBobotViewProps {
  sessionId: number | null;
}

// VIEW 1/4 — "Alternatif Kriteria & Bobot"
// Menampilkan nilai bobot tiap kriteria yang sudah diset untuk 1 sesi SPK terpilih.
// Sumber data: GET /api/sessions/:id/pembobotan
// Admin bisa edit nilai bobot (PUT /api/sessions/pembobotan/:id) atau hapus (DELETE).
export default function KriteriaBobotView({ sessionId }: KriteriaBobotViewProps) {
  const [data, setData] = useState<Pembobotan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const load = async () => {
    if (sessionId === null) {
      setData([]);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const items = await getPembobotanBySession(sessionId);
      setData(items);
    } catch (err) {
      console.error('Gagal memuat pembobotan:', err);
      setError('Gagal memuat data bobot kriteria untuk sesi ini.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const startEdit = (row: Pembobotan) => {
    setEditingId(row.id);
    setEditValue(String(row.nilai_bobot));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveEdit = async (id: number) => {
    const value = Number(editValue);
    if (Number.isNaN(value)) return;
    try {
      setIsSaving(true);
      await updatePembobotan(id, value);
      await load();
      cancelEdit();
    } catch (err) {
      console.error('Gagal update bobot:', err);
      alert('Gagal menyimpan perubahan bobot. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Hapus baris bobot kriteria ini?')) return;
    try {
      await deletePembobotan(id);
      await load();
    } catch (err) {
      console.error('Gagal hapus bobot:', err);
      alert('Gagal menghapus data bobot. Coba lagi.');
    }
  };

  if (sessionId === null) {
    return (
      <div className="text-center py-10 text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
        Pilih sesi SPK dulu di atas untuk melihat bobot kriterianya.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h3 className="font-bold text-slate-700">Bobot Kriteria — Sesi #{sessionId}</h3>

      {isLoading && <p className="text-sm font-medium text-slate-500">Memuat data...</p>}
      {error && <p className="text-sm font-bold text-red-600">{error}</p>}

      {!isLoading && !error && (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
            <thead className="text-sm text-white font-bold bg-[#1e2530]">
              <tr>
                <th className="px-6 py-4 rounded-l-xl">ID</th>
                <th className="px-6 py-4">Kriteria</th>
                <th className="px-6 py-4">Atribut</th>
                <th className="px-6 py-4">Nilai Bobot</th>
                <th className="px-6 py-4 rounded-r-xl text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-500 bg-white rounded-xl">
                    Belum ada bobot kriteria yang diset untuk sesi ini.
                  </td>
                </tr>
              )}
              {data.map((row) => (
                <tr key={row.id} className="bg-white text-slate-800 font-semibold shadow-sm border border-slate-100">
                  <td className="px-6 py-4 rounded-l-xl border-y border-l border-slate-200">{row.id}</td>
                  <td className="px-6 py-4 border-y border-slate-200">{row.criteria?.nama ?? row.criteria_id}</td>
                  <td className="px-6 py-4 border-y border-slate-200">
                    {row.criteria?.atribut && (
                      <span className={`px-3 py-1 rounded-full text-xs ${row.criteria.atribut === 'cost' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {row.criteria.atribut}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 border-y border-slate-200">
                    {editingId === row.id ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-24 px-2 py-1 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      row.nilai_bobot
                    )}
                  </td>
                  <td className="px-6 py-4 rounded-r-xl border-y border-r border-slate-200 text-center">
                    {editingId === row.id ? (
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => saveEdit(row.id)}
                          disabled={isSaving}
                          className="text-emerald-600 font-bold hover:underline cursor-pointer disabled:opacity-50"
                        >
                          Simpan
                        </button>
                        <span className="text-slate-300">|</span>
                        <button onClick={cancelEdit} className="text-slate-500 font-bold hover:underline cursor-pointer">
                          Batal
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-3">
                        <button onClick={() => startEdit(row)} className="text-blue-600 font-bold hover:underline cursor-pointer">
                          Edit
                        </button>
                        <span className="text-slate-300">|</span>
                        <button onClick={() => handleDelete(row.id)} className="text-red-600 font-bold hover:underline cursor-pointer">
                          Hapus
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
