import React, { useState } from 'react';

export interface ProductData {
  id?: string;
  idBrand: string;
  nama: string;
  harga: string;
  ram: string;
  penyimpanan: string;
  baterai: string;
  updateOs: string;
  resolusiKamera: string;
  chipset: string;
  os: string;
  tahunRilis: string;
  fastCharging: string;
  display: string;
  foto: string;
}

interface CreateProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductData) => void;
}

export default function CreateProduct({ isOpen, onClose, onSave }: CreateProductProps) {
  const [formData, setFormData] = useState<ProductData>({
    idBrand: '', nama: '', harga: '', ram: '', penyimpanan: '', baterai: '',
    updateOs: 'Ya', resolusiKamera: '', chipset: '', os: 'Android', tahunRilis: '', 
    fastCharging: 'Ya', display: '', foto: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    // Reset form
    setFormData({
      idBrand: '', nama: '', harga: '', ram: '', penyimpanan: '', baterai: '',
      updateOs: 'Ya', resolusiKamera: '', chipset: '', os: 'Android', tahunRilis: '', 
      fastCharging: 'Ya', display: '', foto: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1e2530] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Tambah Produk Baru</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Form Body (Scrollable & Responsive Grid) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Smartphone</label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: iPhone 15 Pro" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ID Brand</label>
              <input type="text" name="idBrand" value={formData.idBrand} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: B01" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Harga (Rp)</label>
              <input type="text" name="harga" value={formData.harga} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Rp 20.000.000" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kapasitas RAM</label>
              <input type="text" name="ram" value={formData.ram} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 8GB" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Penyimpanan</label>
              <input type="text" name="penyimpanan" value={formData.penyimpanan} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 256GB" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Baterai</label>
              <input type="text" name="baterai" value={formData.baterai} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 4000 mAh" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Resolusi Kamera</label>
              <input type="text" name="resolusiKamera" value={formData.resolusiKamera} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 50MP" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chipset</label>
              <input type="text" name="chipset" value={formData.chipset} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: A17 Pro" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sistem Operasi (OS)</label>
              <select name="os" value={formData.os} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ukuran Layar (Display)</label>
              {/* BAGIAN YANG DIPERBAIKI (Gunakan single quote untuk placeholder) */}
              <input type="text" name="display" value={formData.display} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder='Contoh: 6.1"' />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Rilis</label>
              <input type="text" name="tahunRilis" value={formData.tahunRilis} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 2024" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama File Foto</label>
              <input type="text" name="foto" value={formData.foto} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: s24.jpg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mendukung Update OS?</label>
              <select name="updateOs" value={formData.updateOs} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fast Charging?</label>
              <select name="fastCharging" value={formData.fastCharging} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>
          </div>

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm cursor-pointer">Simpan</button>
            </div>  
        </form>
      </div>
    </div>
  );
}