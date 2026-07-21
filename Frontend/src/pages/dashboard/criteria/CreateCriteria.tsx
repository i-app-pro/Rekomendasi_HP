import React, { useState } from 'react';
import type { CriteriaPayload } from '../../../api/criteria';

interface CreateCriteriaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CriteriaPayload) => Promise<void> | void;
}

export default function CreateCriteria({ isOpen, onClose, onSave }: CreateCriteriaProps) {
  const [formData, setFormData] = useState<CriteriaPayload>({
    nama: '',
    atribut: 'benefit',
    default_bobot: 5,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'default_bobot' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      await onSave(formData);
      setFormData({ nama: '', atribut: 'benefit', default_bobot: 5 });
      onClose();
    } catch (err) {
      setError('Gagal menyimpan kriteria. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-[#1e2530] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Tambah Kriteria Baru</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nama Kriteria</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Kapasitas RAM"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Atribut</label>
            <select
              name="atribut"
              value={formData.atribut}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="benefit">Benefit (Keuntungan)</option>
              <option value="cost">Cost (Biaya)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Bobot Default</label>
            <input
              type="number"
              name="default_bobot"
              value={formData.default_bobot}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: 5"
            />
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
