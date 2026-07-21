import React, { useState, useEffect } from 'react';
import type { Brand } from '../../../types/product';

interface EditBrandProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, nama: string) => Promise<void> | void;
  brandData: Brand | null;
}

export default function EditBrand({ isOpen, onClose, onUpdate, brandData }: EditBrandProps) {
  const [nama, setNama] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (brandData) setNama(brandData.nama);
  }, [brandData, isOpen]);

  if (!isOpen || !brandData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      await onUpdate(brandData.id, nama);
      onClose();
    } catch (err) {
      setError('Gagal update brand. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#1e2530] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Edit Data Brand</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nama Brand</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
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
