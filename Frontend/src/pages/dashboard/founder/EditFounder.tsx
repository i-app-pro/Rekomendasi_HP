import React, { useState, useEffect } from 'react';
import type { Founder, FounderPayload } from '../../../types/founder';
import { resolveImageUrl } from '../../../lib/resolveImageUrl';

interface EditFounderProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, data: FounderPayload) => Promise<void> | void;
  founderData: Founder | null;
}

type FounderFormFields = Omit<FounderPayload, 'fotoFile'>;

const emptyForm: FounderFormFields = {
  nama: '', status: 'Mahasiswa', universitas: '', framework: '',
  username_ig: '', email: '', github: '', foto: ''
};

export default function EditFounder({ isOpen, onClose, onUpdate, founderData }: EditFounderProps) {
  const [formData, setFormData] = useState<FounderFormFields>(emptyForm);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fotoMode, setFotoMode] = useState<'url' | 'file'>('url');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (founderData) {
      const { id: _id, ...rest } = founderData;
      setFormData({ ...rest, foto: rest.foto ?? '' });
      setFotoFile(null);
      setFotoMode('url');
    }
  }, [founderData, isOpen]);

  useEffect(() => {
    if (fotoFile) {
      const objectUrl = URL.createObjectURL(fotoFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(resolveImageUrl(formData.foto));
  }, [fotoFile, formData.foto]);

  if (!isOpen || !founderData) return null;

  const handleFotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFotoFile(file);
  };

  const switchFotoMode = (mode: 'url' | 'file') => {
    setFotoMode(mode);
    if (mode === 'url') setFotoFile(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      await onUpdate(founderData.id, { ...formData, fotoFile: fotoMode === 'file' ? fotoFile : null });
      onClose();
    } catch (err) {
      setError('Gagal update founder. Coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-[#1e2530] px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Edit Data Founder</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
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
              <input type="text" name="universitas" value={formData.universitas} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Framework / Keahlian</label>
              <input type="text" name="framework" value={formData.framework} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username Instagram</label>
              <input type="text" name="username_ig" value={formData.username_ig} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Username GitHub</label>
              <input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Foto (opsional)</label>
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
                <input type="text" name="foto" value={formData.foto ?? ''} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
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
              {isSaving ? 'Menyimpan...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}