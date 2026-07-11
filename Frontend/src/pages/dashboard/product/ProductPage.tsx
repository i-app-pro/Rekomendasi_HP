import { useState } from 'react';
import CreateProduct, { type ProductData } from './CreateProduct';
import EditProduct from './EditProduct';

// --- DUMMY DATA AWAL ---
const initialDummyProducts: ProductData[] = [
  { 
    id: 'P01', idBrand: 'B01', nama: 'iPhone 15 Pro', harga: 'Rp 20.000.000', 
    ram: '8GB', penyimpanan: '256GB', baterai: '3274 mAh', updateOs: 'Ya', 
    resolusiKamera: '48MP', chipset: 'A17 Pro', os: 'iOS', tahunRilis: '2023', 
    fastCharging: 'Ya', display: '6.1"', foto: 'iphone15.jpg' 
  },
  { 
    id: 'P02', idBrand: 'B02', nama: 'Samsung Galaxy S24', harga: 'Rp 15.000.000', 
    ram: '8GB', penyimpanan: '256GB', baterai: '4000 mAh', updateOs: 'Ya', 
    resolusiKamera: '50MP', chipset: 'Exynos 2400', os: 'Android', tahunRilis: '2024', 
    fastCharging: 'Ya', display: '6.2"', foto: 's24.jpg' 
  }
];

export default function ProductPage() {
  const columns = [
    'ID', 'ID Brand', 'Nama', 'Harga', 'RAM', 'Penyimpanan', 'Baterai', 
    'Update OS', 'Resolusi Kamera', 'Chipset', 'OS', 'Tahun Rilis', 
    'Fast_Charging', 'Display', 'Foto', 'Aksi'
  ];

  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState<ProductData[]>(initialDummyProducts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  // --- FUNGSI HAPUS ---
  const handleDelete = (idToDelete: string) => {
    const isConfirm = window.confirm("Apakah kamu yakin ingin menghapus produk ini?");
    if (isConfirm) {
      setProducts(products.filter(prod => prod.id !== idToDelete));
    }
  };

  // --- FUNGSI BUKA EDIT ---
  const handleEditClick = (product: ProductData) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  // --- FUNGSI SIMPAN TAMBAH BARU ---
  const handleCreateProduct = (newProductData: ProductData) => {
    const numericIds = products.map(p => parseInt(p.id!.replace('P', '')));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const newId = `P${String(maxId + 1).padStart(2, '0')}`; // Hasil: P03, P04, dst
    
    const newProduct = { ...newProductData, id: newId };
    setProducts([...products, newProduct]);
  };

  // --- FUNGSI SIMPAN UPDATE DATA ---
  const handleUpdateProduct = (updatedProductData: ProductData) => {
    setProducts(products.map(p => p.id === updatedProductData.id ? updatedProductData : p));
  };

  // Trik stabilisasi layout desktop minimal 2 baris (bisa kamu ubah sesuai selera)
  const displayData = [...products];
  while (displayData.length < 2) {
    displayData.push({
      id: '', idBrand: '', nama: '', harga: '', ram: '', penyimpanan: '', baterai: '',
      updateOs: '', resolusiKamera: '', chipset: '', os: '', tahunRilis: '', fastCharging: '', display: '', foto: ''
    });
  }

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* HEADER AKSI: Judul & Tombol Tambah */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-slate-700 hidden md:block">Manajemen Data Produk</h3>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#d62828] hover:bg-red-700 text-white font-bold rounded-lg shadow-md active:scale-95 transition-all flex items-center gap-2 text-sm w-full md:w-auto justify-center cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Tambah Produk
        </button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* 1. TAMPILAN DESKTOP (TABEL) */}
      {/* ----------------------------------------------------------------- */}
      <div className="hidden md:block w-full overflow-x-auto pb-4">
        <table className="w-full text-sm text-left border-separate" style={{ borderSpacing: '0 12px' }}>
          <thead className="text-sm text-white font-bold bg-[#1e2530]">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className={`px-4 py-4 whitespace-nowrap 
                    ${index === 0 ? 'rounded-l-xl' : ''} 
                    ${index === columns.length - 1 ? 'rounded-r-xl text-center sticky right-0 bg-[#1e2530] z-10' : ''}
                  `}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr><td colSpan={16} className="text-center py-6 text-slate-500 bg-white rounded-xl">Belum ada data produk.</td></tr>
            )}
            {displayData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`bg-white text-slate-800 font-semibold shadow-sm border border-slate-100 transition-colors
                  ${row.id ? 'hover:bg-slate-50' : ''} 
                `}
              >
                <td className="px-4 py-4 rounded-l-xl border-y border-l border-slate-200 whitespace-nowrap">{row.id || '\u00A0'}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.idBrand}</td>
                <td className="px-4 py-4 border-y border-slate-200 min-w-150px">{row.nama}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.harga}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.ram}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.penyimpanan}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.baterai}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap text-center">{row.updateOs}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.resolusiKamera}</td>
                <td className="px-4 py-4 border-y border-slate-200 min-w-120px">{row.chipset}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.os}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap text-center">{row.tahunRilis}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap text-center">{row.fastCharging}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap">{row.display}</td>
                <td className="px-4 py-4 border-y border-slate-200 whitespace-nowrap text-blue-500 underline cursor-pointer">
                  {row.foto ? 'Lihat Foto' : ''}
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

      {/* ----------------------------------------------------------------- */}
      {/* 2. TAMPILAN MOBILE (CARD) */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.length === 0 && (
          <div className="text-center py-6 text-slate-500 bg-white rounded-xl border border-slate-200">Belum ada data produk.</div>
        )}
        {products.map((row) => (
          <div key={row.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#1e2530] text-white text-xs font-black px-2 py-1 rounded-md">ID: {row.id}</span>
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">Brand: {row.idBrand}</span>
                </div>
                <h3 className="text-lg font-black text-slate-800 leading-tight mt-1">{row.nama}</h3>
                <span className="text-red-600 font-bold">{row.harga}</span>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => handleEditClick(row)} className="p-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer active:scale-95">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button onClick={() => handleDelete(row.id!)} className="p-2 bg-red-50 text-red-600 rounded-md cursor-pointer active:scale-95">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase tracking-wider">RAM / Storage</span><span>{row.ram} / {row.penyimpanan}</span></div>
              <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase tracking-wider">Baterai</span><span>{row.baterai} ({row.fastCharging === 'Ya' ? 'Fast' : '-'})</span></div>
              <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase tracking-wider">Kamera</span><span>{row.resolusiKamera}</span></div>
              <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase tracking-wider">Display</span><span>{row.display}</span></div>
              <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase tracking-wider">Chipset</span><span>{row.chipset}</span></div>
              <div className="flex flex-col"><span className="text-slate-400 text-[10px] uppercase tracking-wider">OS (Rilis)</span><span>{row.os} ({row.tahunRilis})</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER PAGINATION */}
      <div className="flex justify-between items-center mt-2 text-sm font-bold text-slate-600 px-2">
        <span>Menampilkan {products.length} data</span>
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
      <CreateProduct 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
        onSave={handleCreateProduct} 
      />

      {/* MODAL 2: Khusus Edit */}
      <EditProduct 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onUpdate={handleUpdateProduct} 
        productData={selectedProduct} 
      />

    </div>
  );
}