import { useEffect, useState } from 'react';
import CreateFounder from './CreateFounder';
import EditFounder from './EditFounder';
import type { Founder, FounderPayload } from '../../../types/founder';
import { getFounders, createFounder, updateFounder, deleteFounder } from '../../../api/founders';
import { getErrorMessage } from '../../../lib/errorMessage';
import { resolveImageUrl } from '../../../lib/resolveImageUrl';

export default function FounderPage() {
  const columns = ['ID', 'Foto', 'Nama', 'Status', 'Universitas', 'Framework', 'Instagram', 'Email', 'GitHub', 'Aksi'];

  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  const load = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getFounders();
      setFounders(data);
    } catch (err) {
      console.error('Gagal memuat founder:', err);
      setError(getErrorMessage(err, 'Gagal memuat data founder dari server.'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    const isConfirm = window.confirm('Apakah kamu yakin ingin menghapus founder ini?');
    if (!isConfirm) return;
    try {
      await deleteFounder(id);
      await load();
    } catch (err) {
      alert(getErrorMessage(err, 'Gagal menghapus founder.'));
    }
  };

  const handleEditClick = (founder: Founder) => {
    setSelectedFounder(founder);
    setIsEditOpen(true);
  };

  const handleCreateFounder = async (payload: FounderPayload) => {
    await createFounder(payload);
    await load();
  };

  const handleUpdateFounder = async (id: number, payload: FounderPayload) => {
    await updateFounder(id, payload);
    await load();
  };

  return (
    <div className="w-full flex flex-col gap-4">

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-slate-700 hidden md:block">Manajemen Data Founder</h3>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#d62828] hover:bg-red-700 text-white font-bold rounded-lg shadow-md active:scale-95 transition-all flex items-center gap-2 text-sm w-full md:w-auto justify-center cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Founder
        </button>
      </div>

      {isLoading && <p className="text-sm font-medium text-slate-500">Memuat data...</p>}
      {error && <p className="text-sm font-bold text-red-600">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="hidden md:block w-full overflow-x-auto">
            <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
              <thead className="text-sm text-white font-bold bg-[#1e2530]">
                <tr>
                  {columns.map((col, index) => (
                    <th key={index} className={`px-6 py-4 whitespace-nowrap ${index === 0 ? 'rounded-l-xl' : ''} ${index === columns.length - 1 ? 'rounded-r-xl text-center' : ''}`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {founders.length === 0 && (
                  <tr><td colSpan={10} className="text-center py-6 text-slate-500 bg-white rounded-xl">Belum ada data founder.</td></tr>
                )}
                {founders.map((row) => (
                  <tr key={row.id} className="bg-white text-slate-800 font-semibold shadow-sm border border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4 rounded-l-xl border-y border-l border-slate-200">{row.id}</td>
                    <td className="px-6 py-4 border-y border-slate-200">
                      {resolveImageUrl(row.foto) ? (
                        <img src={resolveImageUrl(row.foto)} alt={row.nama} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      ) : (
                        <span className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 border-y border-slate-200">{row.nama}</td>
                    <td className="px-6 py-4 border-y border-slate-200">{row.status}</td>
                    <td className="px-6 py-4 border-y border-slate-200">{row.universitas}</td>
                    <td className="px-6 py-4 border-y border-slate-200">{row.framework}</td>
                    <td className="px-6 py-4 border-y border-slate-200">{row.username_ig}</td>
                    <td className="px-6 py-4 border-y border-slate-200">{row.email}</td>
                    <td className="px-6 py-4 border-y border-slate-200">{row.github}</td>
                    <td className="px-6 py-4 rounded-r-xl border-y border-r border-slate-200 text-center">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleEditClick(row)} className="text-blue-600 font-bold hover:underline cursor-pointer">Edit</button>
                        <span className="text-slate-300">|</span>
                        <button onClick={() => handleDelete(row.id)} className="text-red-600 font-bold hover:underline cursor-pointer">Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {founders.length === 0 && (
              <div className="text-center py-6 text-slate-500 bg-white rounded-xl border border-slate-200">Belum ada data founder.</div>
            )}
            {founders.map((row) => (
              <div key={row.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="bg-[#1e2530] text-white text-xs font-black px-2 py-1 rounded-md">ID: {row.id}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(row)} className="p-1.5 bg-blue-50 text-blue-600 rounded-md cursor-pointer active:scale-95">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </button>
                    <button onClick={() => handleDelete(row.id)} className="p-1.5 bg-red-50 text-red-600 rounded-md cursor-pointer active:scale-95">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {resolveImageUrl(row.foto) && (
                    <img src={resolveImageUrl(row.foto)} alt={row.nama} className="w-14 h-14 rounded-full object-cover border border-slate-200 mb-1" />
                  )}
                  <span className="text-lg font-black text-slate-800">{row.nama}</span>
                  <span className="text-sm font-medium text-slate-500">{row.status} — {row.universitas}</span>
                  <span className="text-sm font-medium text-slate-500">{row.framework}</span>
                  <span className="text-xs text-slate-400">{row.email} · IG @{row.username_ig} · GitHub @{row.github}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 text-sm font-bold text-slate-600 px-2">
            <span>Menampilkan {founders.length} data</span>
          </div>
        </>
      )}

      <CreateFounder isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSave={handleCreateFounder} />
      <EditFounder isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onUpdate={handleUpdateFounder} founderData={selectedFounder} />

    </div>
  );
}