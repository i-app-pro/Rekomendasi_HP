import { useState } from 'react';
import CreateCriteria, { type CriteriaData } from './CreateCriteria';
import EditCriteria from './EditCriteria';

// --- DUMMY DATA AWAL ---
const initialDummyCriteria: CriteriaData[] = [
  { id: 'C01', nama: 'Harga', atribut: 'Cost' },
  { id: 'C02', nama: 'Kapasitas RAM', atribut: 'Benefit' },
  { id: 'C03', nama: 'Kapasitas Penyimpanan', atribut: 'Benefit' },
  { id: 'C04', nama: 'Resolusi Kamera', atribut: 'Benefit' },
  { id: 'C05', nama: 'Kapasitas Baterai', atribut: 'Benefit' },
];

export default function CriteriaPage() {
  const columns = ['ID', 'Nama Kriteria', 'Atribut', 'Aksi'];

  // --- STATE MANAGEMENT ---
  const [criteriaList, setCriteriaList] = useState<CriteriaData[]>(initialDummyCriteria);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState<CriteriaData | null>(null);

  // --- FUNGSI HAPUS ---
  const handleDelete = (idToDelete: string) => {
    const isConfirm = window.confirm("Apakah kamu yakin ingin menghapus kriteria ini?");
    if (isConfirm) {
      setCriteriaList(criteriaList.filter(item => item.id !== idToDelete));
    }
  };

  // --- FUNGSI BUKA MODAL EDIT ---
  const handleEditClick = (item: CriteriaData) => {
    setSelectedCriteria(item);
    setIsEditOpen(true);
  };

  // --- FUNGSI EKSEKUSI TAMBAH KRITERIA ---
  const handleCreateCriteria = (newCriteriaData: CriteriaData) => {
    // Generate ID otomatis (misal: C06)
    const numericIds = criteriaList.map(c => parseInt(c.id!.replace('C', '')));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const newId = `C${String(maxId + 1).padStart(2, '0')}`; 
    
    const newCriteria = { ...newCriteriaData, id: newId };
    setCriteriaList([...criteriaList, newCriteria]);
  };

  // --- FUNGSI EKSEKUSI UPDATE KRITERIA ---
  const handleUpdateCriteria = (updatedCriteriaData: CriteriaData) => {
    setCriteriaList(criteriaList.map(item => item.id === updatedCriteriaData.id ? updatedCriteriaData : item));
  };

  // Trik untuk menstabilkan tinggi layout tabel desktop (minimal 5 baris)
  const displayData = [...criteriaList];
  while (displayData.length < 5) {
    displayData.push({ id: '', nama: '', atribut: '' });
  }

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* HEADER AKSI */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-slate-700 hidden md:block">Manajemen Data Kriteria</h3>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#d62828] hover:bg-red-700 text-white font-bold rounded-lg shadow-md active:scale-95 transition-all flex items-center gap-2 text-sm w-full md:w-auto justify-center cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Kriteria
        </button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 1. TAMPILAN DESKTOP (TABEL) */}
      {/* ----------------------------------------------------------------- */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
          <thead className="text-sm text-white font-bold bg-[#1e2530]">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`px-6 py-4 whitespace-nowrap 
                    ${index === 0 ? 'rounded-l-xl' : ''} 
                    ${index === columns.length - 1 ? 'rounded-r-xl text-center w-48' : ''}
                  `}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`bg-white text-slate-800 font-semibold shadow-sm border border-slate-100 transition-colors
                  ${row.id ? 'hover:bg-slate-50' : ''} 
                `}
              >
                <td className="px-6 py-4 rounded-l-xl border-y border-l border-slate-200">{row.id || '\u00A0'}</td>
                <td className="px-6 py-4 border-y border-slate-200 w-full">{row.nama}</td>
                <td className="px-6 py-4 border-y border-slate-200 whitespace-nowrap">
                  {row.atribut && (
                    <span className={`px-4 py-1.5 rounded-md text-xs font-bold border ${
                      row.atribut === 'Cost' 
                        ? 'bg-orange-50 text-orange-600 border-orange-200' 
                        : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>
                      {row.atribut}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 rounded-r-xl border-y border-r border-slate-200 text-center">
                  {row.id && (
                    <div className="flex justify-center gap-3">
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

      {/* ----------------------------------------------------------------- */}
      {/* 2. TAMPILAN MOBILE (CARD) */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {displayData.filter(row => row.id).map((row, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3">
            
            {/* Header Card: ID & Atribut */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="bg-[#1e2530] text-white text-xs font-black px-3 py-1.5 rounded-md shadow-sm">
                ID: {row.id}
              </span>
              <span className={`px-3 py-1.5 rounded-md text-xs font-bold border shadow-sm ${
                row.atribut === 'Cost' 
                  ? 'bg-orange-50 text-orange-600 border-orange-200' 
                  : 'bg-emerald-50 text-emerald-600 border-emerald-200'
              }`}>
                {row.atribut}
              </span>
            </div>
            
            {/* Body Card: Nama Kriteria & Tombol Aksi */}
            <div className="flex justify-between items-end pt-1">
              <span className="text-xl font-black text-slate-800 leading-tight pr-4">
                {row.nama}
              </span>
              
              {/* Tombol Aksi Mobile */}
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(row)} className="p-2 bg-blue-50 text-blue-600 rounded-lg active:scale-95 transition-transform border border-blue-100 shadow-sm cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button onClick={() => handleDelete(row.id!)} className="p-2 bg-red-50 text-red-600 rounded-lg active:scale-95 transition-transform border border-red-100 shadow-sm cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* State Jika Data Kosong */}
        {criteriaList.length === 0 && (
          <div className="text-center py-6 text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
            Belum ada data Kriteria
          </div>
        )}
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-sm font-bold text-slate-600 px-2">
        <span>Menampilkan {criteriaList.length} data</span>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      {/* MODAL 1: Khusus Create */}
      <CreateCriteria 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSave={handleCreateCriteria} 
      />

      {/* MODAL 2: Khusus Edit */}
      <EditCriteria 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onUpdate={handleUpdateCriteria} 
        criteriaData={selectedCriteria} 
      />

    </div>
  );
}