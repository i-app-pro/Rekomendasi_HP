import React, { useEffect, useState } from 'react';
import type { Brand } from '../../../types/product';
import type { ProductPayload } from '../../../api/products';
import { getBrands } from '../../../api/brands';
import { resolveImageUrl } from '../../../lib/resolveImageUrl';

interface CreateProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductPayload) => Promise<void> | void;
}

type ProductFormFields = Omit<ProductPayload, 'fotoFile'>;

const emptyForm: ProductFormFields = {
  nama: '', harga: 0, ram: 0, penyimpanan: 0, baterai: 0, update_os: 0,
  resolusi_kamera: 0, chipset: '', os: '', tahun_rilis: '', fast_charging: '',
  display: '', brands_id: 0, foto: '',
};

export default function CreateProduct({ isOpen, onClose, onSave }: CreateProductProps) {
  const [formData, setFormData] = useState<ProductFormFields>(emptyForm);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fotoMode, setFotoMode] = useState<'url' | 'file'>('url');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (fotoFile) {
      const objectUrl = URL.createObjectURL(fotoFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(resolveImageUrl(formData.foto));
  }, [fotoFile, formData.foto]);

  useEffect(() => {
    if (!isOpen) return;
    getBrands()
      .then((list) => {
        setBrands(list);
        setFormData((prev) => ({ ...prev, brands_id: prev.brands_id || list[0]?.id || 0 }));
      })
      .catch((err) => console.error('Gagal memuat daftar brand:', err));
  }, [isOpen]);

  if (!isOpen) return null;

  const numericFields = ['harga', 'ram', 'penyimpanan', 'baterai', 'update_os', 'resolusi_kamera', 'brands_id'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: numericFields.includes(name) ? Number(value) : value });
  };

  const handleFotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFotoFile(file);
  };

  const switchFotoMode = (mode: 'url' | 'file') => {
    setFotoMode(mode);
    if (mode === 'url') setFotoFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      const payload: ProductPayload = {
        ...formData,
        tahun_rilis: formData.tahun_rilis ? new Date(formData.tahun_rilis).toISOString() : new Date().toISOString(),
        fotoFile: fotoMode === 'file' ? fotoFile : null,
      };
      await onSave(payload);
      setFormData(emptyForm);
      setFotoFile(null);
      setFotoMode('url');
      onClose();
    } catch (err) {
      setError('Gagal menyimpan produk. Cek kembali data yang diisi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-[#1e2530] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Tambah Produk Baru</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Smartphone</label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: iPhone 15 Pro" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
              <select name="brands_id" value={formData.brands_id} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white">
                {brands.length === 0 && <option value={0}>Memuat brand...</option>}
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.nama}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Harga (Rp)</label>
              <input type="number" name="harga" value={formData.harga} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 12000000" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">RAM (GB)</label>
              <input type="number" name="ram" value={formData.ram} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 8" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Penyimpanan (GB)</label>
              <input type="number" name="penyimpanan" value={formData.penyimpanan} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 256" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Baterai (mAh)</label>
              <input type="number" name="baterai" value={formData.baterai} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 4000" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Resolusi Kamera (MP)</label>
              <input type="number" name="resolusi_kamera" value={formData.resolusi_kamera} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chipset</label>
              <input type="text" name="chipset" value={formData.chipset} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Snapdragon 8 Gen 3" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sistem Operasi (OS)</label>
              <input type="text" name="os" value={formData.os} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Android 14" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ukuran Layar (Display)</label>
              <input type="text" name="display" value={formData.display} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: AMOLED 6.2 inch" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Rilis</label>
              <input type="date" name="tahun_rilis" value={formData.tahun_rilis?.slice(0, 10)} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Update OS (tahun jaminan)</label>
              <input type="number" name="update_os" value={formData.update_os} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 3" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fast Charging</label>
              <input type="text" name="fast_charging" value={formData.fast_charging} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500" placeholder="Contoh: 25W" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Foto Produk (opsional)</label>
              <div className="flex gap-2 mb-2">
                <button type="button" onClick={() => switchFotoMode('url')}
                  className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer ${fotoMode === 'url' ? 'bg-[#1e2530] text-white' : 'bg-slate-100 text-slate-600'}`}>
                  URL
                </button>
                <button type="button" onClick={() => switchFotoMode('file')}
                  className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer ${fotoMode === 'file' ? 'bg-[#1e2530] text-white' : 'bg-slate-100 text-slate-600'}`}>
                  Upload File
                </button>
              </div>

              {fotoMode === 'url' ? (
                <input type="text" name="foto" value={formData.foto} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
              ) : (
                <input type="file" accept="image/*" onChange={handleFotoFileChange} className="w-full text-sm" />
              )}
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-lg border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer">Batal</button>
            <button type="submit" disabled={isSaving} className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm cursor-pointer disabled:opacity-50">
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}