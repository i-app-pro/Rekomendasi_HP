import { useEffect, useMemo, useState } from 'react';
import type { Pembobotan, MatrixAlternatifRow } from '../../../types/spk';
import { getPembobotanBySession, updatePembobotan, deletePembobotan } from '../../../api/sessions';
import { getMatrixAlternatif } from '../../../api/recommendation';
import ExportExcelButton from '../../../components/ui/ExcelButton';
import SearchBar from '../../../components/ui/SearchBar';
import type { ExcelRow } from '../../../lib/exportExcel';

interface KriteriaBobotViewProps {
  sessionId: number | null;
}

// Kolom kriteria yang ditampilkan di tabel matriks (c1..c6).
const KOLOM_KRITERIA: { key: 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6'; label: string }[] = [
  { key: 'c1', label: 'Harga' },
  { key: 'c2', label: 'RAM' },
  { key: 'c3', label: 'Penyimpanan' },
  { key: 'c4', label: 'Baterai' },
  { key: 'c5', label: 'Update OS' },
  { key: 'c6', label: 'Kamera' },
];

// VIEW 1/4 — "Alternatif Kriteria & Bobot"
// Menampilkan nilai bobot tiap kriteria yang sudah diset untuk 1 sesi SPK terpilih.
// Sumber data: GET /api/sessions/:id/pembobotan
// Admin bisa edit nilai bobot (PUT /api/sessions/pembobotan/:id) atau hapus (DELETE).
export default function KriteriaBobotView({ sessionId }: KriteriaBobotViewProps) {
  const [data, setData] = useState<Pembobotan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [matrixData, setMatrixData] = useState<MatrixAlternatifRow[]>([]);
  const [isMatrixLoading, setIsMatrixLoading] = useState(false);
  const [matrixError, setMatrixError] = useState<string | null>(null);
  // Search khusus tabel matriks: sesi SPK bisa punya banyak produk sekaligus,
  // jadi berguna untuk cari cepat 1 produk/brand tertentu di tabel yang lebar ini.
  const [matrixSearch, setMatrixSearch] = useState('');

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

  const loadMatrix = async () => {
    if (sessionId === null) {
      setMatrixData([]);
      return;
    }
    try {
      setIsMatrixLoading(true);
      setMatrixError(null);
      const rows = await getMatrixAlternatif(sessionId);
      setMatrixData(rows);
    } catch (err) {
      console.error('Gagal memuat matriks alternatif:', err);
      setMatrixError('Belum ada matriks untuk sesi ini (pastikan bobot kriteria sudah diisi).');
      setMatrixData([]);
    } finally {
      setIsMatrixLoading(false);
    }
  };

  useEffect(() => {
    load();
    loadMatrix();
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

  // Export tabel "Bobot Kriteria"
  const exportBobotRows: ExcelRow[] = useMemo(
    () =>
      data.map((row) => ({
        ID: row.id,
        Kriteria: row.criteria?.nama ?? row.criteria_id,
        Atribut: row.criteria?.atribut ?? '-',
        'Nilai Bobot': row.nilai_bobot,
      })),
    [data]
  );

  // Filter matriks by nama produk/brand (search client-side)
  const filteredMatrixData = useMemo(() => {
    const keyword = matrixSearch.trim().toLowerCase();
    if (!keyword) return matrixData;
    return matrixData.filter(
      (row) =>
        row.nama_produk.toLowerCase().includes(keyword) ||
        row.nama_brand.toLowerCase().includes(keyword)
    );
  }, [matrixData, matrixSearch]);

  // Export tabel "Matriks Alternatif" -- ini data dasar/matriks kategorisasi tiap
  // kriteria PER PRODUK (c1..c6) beserta bobot & preferensi yang dipakai, SEBELUM
  // dihitung jadi skor SAW/WP/TOPSIS. Backend belum punya tabel/endpoint terpisah
  // khusus "normalisasi", jadi export ini yang paling mendekati kebutuhan tersebut
  // karena isinya adalah matriks keputusan mentah yang dipakai oleh ketiga metode.
  const exportMatrixRows: ExcelRow[] = useMemo(
    () =>
      filteredMatrixData.map((row) => {
        const base: ExcelRow = {
          Produk: row.nama_produk,
          Brand: row.nama_brand,
        };
        KOLOM_KRITERIA.forEach((k, index) => {
          base[`${k.label} (C${index + 1})`] = row[k.key] ?? '-';
        });
        KOLOM_KRITERIA.forEach((k) => {
          base[`Bobot ${k.label}`] = row[`bobot_${k.key}` as const] ?? '-';
        });
        KOLOM_KRITERIA.forEach((k) => {
          base[`Pref ${k.label}`] = row[`pref_${k.key}` as const] ?? '-';
        });
        return base;
      }),
    [filteredMatrixData]
  );

  if (sessionId === null) {
    return (
      <div className="text-center py-10 text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
        Pilih sesi SPK dulu di atas untuk melihat bobot kriterianya.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <h3 className="font-bold text-slate-700">Bobot Kriteria — Sesi #{sessionId}</h3>
        <ExportExcelButton data={exportBobotRows} fileName={`bobot-kriteria-sesi-${sessionId}`} sheetName="Bobot Kriteria" />
      </div>

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

      {/* ================================================================
          MATRIKS ALTERNATIF & KRITERIA BOBOT (view_alternatif_kriteria_bobot)
          tabel ini menampilkan SEMUA kolom dari view: nilai kategorisasi
          tiap kriteria (c1..c6) PER PRODUK, bobot yang dipakai, dan preferensi
          yang dipilih user untuk sesi ini -- ini "matriks" sebelum dihitung
          jadi skor SAW/WP/TOPSIS di tab sebelah. Karena backend belum punya
          tabel "normalisasi" terpisah, tabel inilah yang dipakai sebagai
          representasi data dasar/normalisasi untuk kebutuhan export.
         ================================================================ */}
      <div className="w-full flex flex-col gap-3 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <h3 className="font-bold text-slate-700">Matriks Alternatif (Data Dasar/Normalisasi) — Sesi #{sessionId}</h3>
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <SearchBar value={matrixSearch} onChange={setMatrixSearch} placeholder="Cari nama produk atau brand..." />
            <ExportExcelButton data={exportMatrixRows} fileName={`matriks-normalisasi-sesi-${sessionId}`} sheetName="Matriks" />
          </div>
        </div>

        {isMatrixLoading && <p className="text-sm font-medium text-slate-500">Memuat matriks...</p>}
        {matrixError && <p className="text-sm font-bold text-red-600">{matrixError}</p>}

        {!isMatrixLoading && !matrixError && (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
              <thead className="text-xs text-white font-bold bg-[#1e2530]">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Produk</th>
                  <th className="px-4 py-3">Brand</th>
                  {KOLOM_KRITERIA.map((k, index) => (
                    <th key={k.key} className="px-4 py-3 text-center whitespace-nowrap">{k.label} (C{index + 1})</th>
                  ))}
                  {KOLOM_KRITERIA.map((k) => (
                    <th key={`bobot_${k.key}`} className="px-4 py-3 text-center whitespace-nowrap">Bobot {k.label}</th>
                  ))}
                  {KOLOM_KRITERIA.map((k, idx) => (
                    <th
                      key={`pref_${k.key}`}
                      className={`px-4 py-3 text-center whitespace-nowrap ${idx === KOLOM_KRITERIA.length - 1 ? 'rounded-r-xl' : ''}`}
                    >
                      Pref {k.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMatrixData.length === 0 && (
                  <tr>
                    <td colSpan={2 + KOLOM_KRITERIA.length * 3} className="text-center py-6 text-slate-500 bg-white rounded-xl">
                      {matrixSearch ? 'Tidak ada produk yang cocok dengan pencarian.' : 'Belum ada data matriks untuk sesi ini.'}
                    </td>
                  </tr>
                )}
                {filteredMatrixData.map((row) => (
                  <tr key={row.product_id} className="bg-white text-slate-800 font-semibold shadow-sm border border-slate-100">
                    <td className="px-4 py-3 rounded-l-xl border-y border-l border-slate-200 whitespace-nowrap">{row.nama_produk}</td>
                    <td className="px-4 py-3 border-y border-slate-200 whitespace-nowrap">{row.nama_brand}</td>
                    {KOLOM_KRITERIA.map((k) => (
                      <td key={k.key} className="px-4 py-3 border-y border-slate-200 text-center">{row[k.key] ?? '-'}</td>
                    ))}
                    {KOLOM_KRITERIA.map((k) => (
                      <td key={`bobot_${k.key}`} className="px-4 py-3 border-y border-slate-200 text-center">
                        {row[`bobot_${k.key}` as const] ?? '-'}
                      </td>
                    ))}
                    {KOLOM_KRITERIA.map((k, idx) => (
                      <td
                        key={`pref_${k.key}`}
                        className={`px-4 py-3 border-y border-r border-slate-200 text-center ${idx === KOLOM_KRITERIA.length - 1 ? 'rounded-r-xl' : ''}`}
                      >
                        {row[`pref_${k.key}` as const] ?? '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}