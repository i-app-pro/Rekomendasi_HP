import React, { useEffect, useState } from 'react';
import type { ApiProduct, Brand } from '../../../types/product';
import type { ProductPayload } from '../../../api/products';
import { getBrands } from '../../../api/brands';

interface EditProductProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, data: ProductPayload) => Promise<void> | void;
  productData: ApiProduct | null;
}

export default function EditProduct({ isOpen, onClose, onUpdate, productData }: EditProductProps) {
  const [formData, setFormData] = useState<ProductPayload | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    getBrands().then(setBrands).catch((err) => console.error('Gagal memuat daftar brand:', err));
  }, [isOpen]);

  useEffect(() => {
    if (productData) {
      const { id: _id, brand: _brand, ...rest } = productData;
      setFormData(rest);
    }
  }, [productData, isOpen]);

  if (!isOpen || !productData || !formData) return null;

  const numericFields = ['harga', 'ram', 'penyimpanan', 'baterai', 'update_os', 'resolusi_kamera', 'brands_id'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: numericFields.includes(name) ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      const payload: ProductPayload = {
        ...formData,
        tahun_rilis: formData.tahun_rilis ? new Date(formData.tahun_rilis).toISOString() : formData.tahun_rilis,
      };
      await onUpdate(productData.id, payload);
      onClose();
    } catch (err) {
      setError('Gagal update produk. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-[#1e2530] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Edit Data Produk</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Smartphone</label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
              <select name="brands_id" value={formData.brands_id} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.nama}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Harga (Rp)</label>
              <input type="number" name="harga" value={formData.harga} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">RAM (GB)</label>
              <input type="number" name="ram" value={formData.ram} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Penyimpanan (GB)</label>
              <input type="number" name="penyimpanan" value={formData.penyimpanan} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Baterai (mAh)</label>
              <input type="number" name="baterai" value={formData.baterai} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Resolusi Kamera (MP)</label>
              <input type="number" name="resolusi_kamera" value={formData.resolusi_kamera} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chipset</label>
              <input type="text" name="chipset" value={formData.chipset} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sistem Operasi (OS)</label>
              <input type="text" name="os" value={formData.os} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ukuran Layar (Display)</label>
              <input type="text" name="display" value={formData.display} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Rilis</label>
              <input type="date" name="tahun_rilis" value={formData.tahun_rilis?.slice(0, 10)} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Update OS (tahun jaminan)</label>
              <input type="number" name="update_os" value={formData.update_os} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fast Charging</label>
              <input type="text" name="fast_charging" value={formData.fast_charging} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer">Batal</button>
            <button type="submit" disabled={isSaving} className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm cursor-pointer disabled:opacity-50">
              {isSaving ? 'Menyimpan...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
