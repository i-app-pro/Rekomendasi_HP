import { useState } from 'react';
import CreateCriteriaValue, { type CriteriaValueData } from './CreateCriteriaValue';
import EditCriteriaValue from './EditCriteriaValue';

// --- DUMMY DATA SEMENTARA ---
const initialDummyValues: CriteriaValueData[] = [
  { id: 'C01', name: 'Harga', email: 'harga@criteria.com', password: '***', role: 'Cost' },
  { id: 'C02', name: 'Kamera', email: 'kamera@criteria.com', password: '***', role: 'Benefit' },
  { id: 'C03', name: 'Baterai', email: 'baterai@criteria.com', password: '***', role: 'Benefit' },
];

export default function CriteriaValuePage() {
  const columns = ['ID', 'Name', 'Email', 'Password', 'Role', 'Aksi'];

  // --- STATE MANAGEMENT ---
  const [criteriaValues, setCriteriaValues] = useState<CriteriaValueData[]>(initialDummyValues);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<CriteriaValueData | null>(null);

  // --- FUNGSI HAPUS ---
  const handleDelete = (idToDelete: string) => {
    const isConfirm = window.confirm("Apakah kamu yakin ingin menghapus data ini?");
    if (isConfirm) {
      setCriteriaValues(criteriaValues.filter(item => item.id !== idToDelete));
    }
  };

  // --- FUNGSI BUKA MODAL EDIT ---
  const handleEditClick = (item: CriteriaValueData) => {
    setSelectedValue(item);
    setIsEditOpen(true);
  };

  // --- FUNGSI EKSEKUSI TAMBAH ---
  const handleCreateValue = (newData: CriteriaValueData) => {
    const numericIds = criteriaValues.map(c => parseInt(c.id!.replace('C', '')));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const newId = `C${String(maxId + 1).padStart(2, '0')}`; // Generate C04, C05, dst
    
    const newItem = { ...newData, id: newId };
    setCriteriaValues([...criteriaValues, newItem]);
  };

  // --- FUNGSI EKSEKUSI UPDATE ---
  const handleUpdateValue = (updatedData: CriteriaValueData) => {
    setCriteriaValues(criteriaValues.map(item => item.id === updatedData.id ? updatedData : item));
  };

  // Trik layout (menampilkan minimal 5 baris)
  const displayData = [...criteriaValues];
  while (displayData.length < 3) {
    displayData.push({ id: '', name: '', email: '', password: '', role: '' });
  }

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* HEADER AKSI */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-slate-700 hidden md:block">Manajemen Criteria Value</h3>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#d62828] hover:bg-red-700 text-white font-bold rounded-lg shadow-md active:scale-95 transition-all flex items-center gap-2 text-sm w-full md:w-auto justify-center cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Value
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
                    ${index === columns.length - 1 ? 'rounded-r-xl text-center' : ''}
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
                <td className="px-6 py-4 border-y border-slate-200">{row.name}</td>
                <td className="px-6 py-4 border-y border-slate-200">{row.email}</td>
                <td className="px-6 py-4 border-y border-slate-200">{row.password}</td>
                <td className="px-6 py-4 border-y border-slate-200">
                  {row.role && (
                    <span className={`px-3 py-1 rounded-full text-xs ${row.role === 'Cost' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {row.role}
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
        {criteriaValues.length === 0 && (
          <div className="text-center py-6 text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
            Belum ada data Criteria Value
          </div>
        )}
        
        {criteriaValues.map((row) => (
          <div key={row.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3">
            
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#1e2530] text-white text-xs font-black px-2 py-1 rounded-md">ID: {row.id}</span>
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.role === 'Cost' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {row.role}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(row)} className="p-1.5 bg-blue-50 text-blue-600 rounded-md active:scale-95 transition-transform cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button onClick={() => handleDelete(row.id!)} className="p-1.5 bg-red-50 text-red-600 rounded-md active:scale-95 transition-transform cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-1 pt-1">
              <span className="text-lg font-black text-slate-800">{row.name}</span>
              <span className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {row.email}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-sm font-bold text-slate-600 px-2">
        <span>Menampilkan {criteriaValues.length} data</span>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      {/* MODAL 1: Khusus Create */}
      <CreateCriteriaValue 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSave={handleCreateValue} 
      />

      {/* MODAL 2: Khusus Edit */}
      <EditCriteriaValue 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onUpdate={handleUpdateValue} 
        criteriaData={selectedValue} 
      />

    </div>
  );
}