import React from 'react';

// --- DUMMY DATA SEMENTARA ---
// Data disesuaikan dengan konsep Sistem Pendukung Keputusan (SPK)
const dummyPembobotan = [
  { id: 'W01', nilaiBobot: '0.35', session: 'Sesi Rekomendasi Q3', criteria: 'Harga' },
  { id: 'W02', nilaiBobot: '0.25', session: 'Sesi Rekomendasi Q3', criteria: 'Chipset / Performa' },
  { id: 'W03', nilaiBobot: '0.15', session: 'Sesi Rekomendasi Q3', criteria: 'Kamera' },
  { id: 'W04', nilaiBobot: '0.15', session: 'Sesi Rekomendasi Q3', criteria: 'RAM & Penyimpanan' },
  { id: 'W05', nilaiBobot: '0.10', session: 'Sesi Rekomendasi Q3', criteria: 'Baterai' },
];

export default function PembobotanPage() {
  // Kolom disesuaikan dengan gambar desain Pembobotan.png
  const columns = ['ID', 'Nilai Bobot', 'Recommendation Session', 'Criteria'];

  const displayData = [...dummyPembobotan];
  while (displayData.length < 5) {
    displayData.push({ id: '', nilaiBobot: '', session: '', criteria: '' });
  }

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* ----------------------------------------------------------------- */}
      {/* 1. TAMPILAN DESKTOP (TABEL) - Akan tersembunyi di layar kecil */}
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
                    ${index === columns.length - 1 ? 'rounded-r-xl' : ''}
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
                {/* Menggunakan &nbsp; (\u00A0) agar tinggi baris kosong tetap sama dengan baris berisi data */}
                <td className="px-6 py-4 rounded-l-xl border-y border-l border-slate-200 whitespace-nowrap">{row.id || '\u00A0'}</td>
                <td className="px-6 py-4 border-y border-slate-200">
                  {/* Highlight khusus untuk nilai bobot */}
                  {row.nilaiBobot && (
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md border border-indigo-100">
                      {row.nilaiBobot}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 border-y border-slate-200">{row.session}</td>
                <td className="px-6 py-4 rounded-r-xl border-y border-r border-slate-200 font-bold text-slate-700">{row.criteria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 2. TAMPILAN MOBILE (CARD) - Hanya muncul di layar kecil (HP) */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {displayData.filter(row => row.id).map((row, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3">
            
            {/* Header Card: ID & Nilai Bobot */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="bg-[#1e2530] text-white text-xs font-black px-3 py-1.5 rounded-md">
                ID: {row.id}
              </span>
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-md border border-indigo-200">
                Bobot: {row.nilaiBobot}
              </span>
            </div>
            
            {/* Body Card: Criteria & Session */}
            <div className="flex flex-col gap-1 pt-1">
              <span className="text-xl font-black text-slate-800">{row.criteria}</span>
              <span className="text-sm font-medium text-slate-500 flex items-center gap-2 mt-1">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {row.session}
              </span>
            </div>

          </div>
        ))}

        {/* State Jika Data Kosong */}
        {dummyPembobotan.length === 0 && (
          <div className="text-center py-6 text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
            Belum ada data Pembobotan
          </div>
        )}
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-sm font-bold text-slate-600 px-2">
        <span>Menampilkan 1 sampai {dummyPembobotan.length} dari {dummyPembobotan.length}</span>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

    </div>
  );
}