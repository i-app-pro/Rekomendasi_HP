import React, { useState } from 'react';
import type { FounderPayload } from '../../../types/founder';

interface CreateFounderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FounderPayload) => Promise<void> | void;
}

export default function CreateFounder({ isOpen, onClose, onSave }: CreateFounderProps) {
  const [formData, setFormData] = useState<FounderPayload>({
    nama: '', status: 'Mahasiswa', universitas: '', framework: '',
    username_ig: '', email: '', github: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      await onSave(formData);
      setFormData({ nama: '', status: 'Mahasiswa', universitas: '', framework: '', username_ig: '', email: '', github: '' });
      onClose();
    } catch (err) {
      setError('Gagal menyimpan founder. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-[#1e2530] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Tambah Founder Baru</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama Lengkap" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Mahasiswa">Mahasiswa</option>
                <option value="Alumni">Alumni</option>
                <option value="Dosen">Dosen</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Universitas</label>
              <input type="text" name="universitas" value={formData.universitas} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama Universitas" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Framework / Keahlian</label>
              <input type="text" name="framework" value={formData.framework} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Express + Prisma + TypeScript" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username Instagram</label>
              <input type="text" name="username_ig" value={formData.username_ig} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="username" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="founder@mail.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Username GitHub</label>
              <input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="username" />
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
