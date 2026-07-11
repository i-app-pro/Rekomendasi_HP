import { useState } from 'react';
import CreateFounder, { type FounderData } from './CreateFounder';
import EditFounder from './EditFounder';

const initialDummyFounders: FounderData[] = [
  { id: 'F01', nama: 'Faizal Isman', status: 'Mahasiswa', universitas: 'Universitas Harkat Negeri', keahlian: 'Fullstack Developer / SPK Expert', username_ig: '@faizal_isman', email: 'faizal@rekophone.com', github: 'https://github.com/faizal' },
  { id: 'F02', nama: 'Dev Partner', status: 'Mahasiswa', universitas: 'Universitas Harkat Negeri', keahlian: 'UI/UX Designer', username_ig: '@dev_partner', email: 'partner@rekophone.com', github: 'https://github.com/partner' }
];

export default function FounderPage() {
  const columns = ['ID', 'Nama', 'Status', 'Universitas', 'Keahlian', 'Instagram', 'Email', 'GitHub', 'Aksi'];

  // --- STATE MANAGEMENT ---
  const [founders, setFounders] = useState<FounderData[]>(initialDummyFounders);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState<FounderData | null>(null);

  // --- FUNGSI HAPUS ---
  const handleDelete = (idToDelete: string) => {
    const isConfirm = window.confirm("Apakah kamu yakin ingin menghapus founder ini?");
    if (isConfirm) {
      setFounders(founders.filter(f => f.id !== idToDelete));
    }
  };

  // --- FUNGSI BUKA EDIT ---
  const handleEditClick = (founder: FounderData) => {
    setSelectedFounder(founder);
    setIsEditOpen(true);
  };

  // --- FUNGSI EKSEKUSI TAMBAH ---
  const handleCreateFounder = (data: FounderData) => {
    const numericIds = founders.map(f => parseInt(f.id!.replace('F', '')));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const newId = `F${String(maxId + 1).padStart(2, '0')}`;
    
    setFounders([...founders, { ...data, id: newId }]);
  };

  // --- FUNGSI EKSEKUSI UPDATE ---
  const handleUpdateFounder = (updatedData: FounderData) => {
    setFounders(founders.map(f => f.id === updatedData.id ? updatedData : f));
  };

  // Trik stabilisasi tinggi tabel desktop (minimal 2 baris)
  const displayData = [...founders];
  while (displayData.length < 2) {
    displayData.push({ id: '', nama: '', status: '', universitas: '', keahlian: '', username_ig: '', email: '', github: '' });
  }

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* HEADER AKSI */}
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

      {/* 1. TAMPILAN DESKTOP (TABEL) */}
      <div className="hidden md:block w-full overflow-x-auto pb-4">
        <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
          <thead className="text-sm text-white font-bold bg-[#1e2530]">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={`px-4 py-4 whitespace-nowrap ${index === 0 ? 'rounded-l-xl' : ''} ${index === columns.length - 1 ? 'rounded-r-xl text-center sticky right-0 bg-[#1e2530] z-10' : ''}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {founders.length === 0 && (
              <tr><td colSpan={9} className="text-center py-6 text-slate-500 bg-white rounded-xl">Belum ada data founder.</td></tr>
            )}
            {displayData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`bg-white text-slate-800 font-semibold shadow-sm border border-slate-100 transition-colors ${row.id ? 'hover:bg-slate-50' : ''}`}>
                <td className="px-4 py-4 rounded-l-xl border-y border-l border-slate-200 whitespace-nowrap">{row.id || '\u00A0'}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.nama}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">
                  {row.status && <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-md">{row.status}</span>}
                </td>
                <td className="px-4 py-4 border-y border-slate-200 min-w-180px">{row.universitas}</td>
                <td className="px-4 py-4 border-y border-slate-200 min-w-180px">{row.keahlian}</td>
                <td className="px-4 py-4 border-y border-slate-200 text-slate-500 whitespace-nowrap">{row.username_ig}</td>
                <td className="px-4 py-4 border-y border-slate-200 text-slate-500 whitespace-nowrap">{row.email}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">
                  {row.github && <a href={row.github} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Link Github</a>}
                </td>
                <td className="px-4 py-4 rounded-r-xl border-y border-r border-slate-200 text-center sticky right-0 bg-white shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.05)]">
                  {row.id && (
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEditClick(row)} className="text-blue-600 font-bold hover:underline cursor-pointer">Edit</button>
                      <span className="text-slate-300">|</span>
                      <button onClick={() => handleDelete(row.id!)} className="text-red-600 font-bold hover:underline cursor-pointer">Hapus</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. TAMPILAN MOBILE (CARD PORTFOLIO-STYLE) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {founders.length === 0 && (
          <div className="text-center py-6 text-slate-500 bg-white rounded-xl border border-slate-200">Belum ada data founder.</div>
        )}
        {founders.map((row) => (
          <div key={row.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="bg-[#1e2530] text-white text-[10px] font-black px-2 py-1 rounded-md">ID: {row.id}</span>
                <h3 className="text-lg font-black text-slate-800 mt-1.5">{row.nama}</h3>
                <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md mt-1 inline-block">{row.status}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(row)} className="p-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                <button onClick={() => handleDelete(row.id!)} className="p-2 bg-red-50 text-red-600 rounded-md cursor-pointer"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
              </div>
            </div>

            <div className="text-xs flex flex-col gap-2 text-slate-700 bg-slate-50 p-3 rounded-xl">
              <div><span className="text-slate-400 block text-[10px] uppercase">Universitas</span><span className="font-semibold">{row.universitas}</span></div>
              <div><span className="text-slate-400 block text-[10px] uppercase">Keahlian</span><span className="font-semibold text-slate-800">{row.keahlian}</span></div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 pt-1 border-t border-slate-200/60">
                <span className="text-slate-500">📷 {row.username_ig}</span>
                <span className="text-slate-500">✉️ {row.email}</span>
                {row.github && <a href={row.github} target="_blank" rel="noreferrer" className="text-blue-500 font-bold hover:underline">🔗 GitHub</a>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex justify-between items-center mt-2 text-sm font-bold text-slate-600 px-2">
        <span>Menampilkan {founders.length} data</span>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
        </div>
      </div>

      {/* MODALS */}
      <CreateFounder isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSave={handleCreateFounder} />
      <EditFounder isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onUpdate={handleUpdateFounder} founderData={selectedFounder} />

    </div>
  );
}