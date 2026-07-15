import { Request, Response } from 'express';
import * as founderService from '../services/founderService';
import { resolveFoto } from '../utils/resolveFoto';

export const getAllFounders = async (req: Request, res: Response) => {
  try {
    const data = await founderService.getAllFounders();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil data founder', error: error.message });
  }
};

export const getFounderById = async (req: Request, res: Response) => {
  try {
    const founder = await founderService.getFounderById(Number(req.params.id));
    res.json(founder);
  } catch (error: any) {
    if (error instanceof founderService.FounderError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil founder', error: error.message });
  }
};

// Body bisa JSON biasa ATAU multipart/form-data (field teks + file "foto").
// Multer mengisi req.body dengan field teks form-data, jadi req.body.nama dkk tetap ada.
function buildFounderPayload(req: Request) {
  const b = req.body;
  return {
    nama: b.nama,
    status: b.status,
    universitas: b.universitas,
    framework: b.framework,
    username_ig: b.username_ig,
    email: b.email,
    github: b.github,
    foto: resolveFoto(req),
  };
}

export const createFounder = async (req: Request, res: Response) => {
  try {
    const { nama, status, universitas, framework } = req.body;

    if (!nama || !status || !universitas || !framework) {
      return res.status(400).json({
        message: 'nama, status, universitas, dan framework wajib diisi',
      });
    }

    const founder = await founderService.createFounder(buildFounderPayload(req) as any);
    res.status(201).json(founder);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal membuat founder', error: error.message });
  }
};

export const updateFounder = async (req: Request, res: Response) => {
  try {
    const founder = await founderService.updateFounder(
      Number(req.params.id),
      buildFounderPayload(req) as any
    );
    res.json(founder);
  } catch (error: any) {
    if (error instanceof founderService.FounderError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal update founder', error: error.message });
  }
};

export const deleteFounder = async (req: Request, res: Response) => {
  try {
    await founderService.deleteFounder(Number(req.params.id));
    res.json({ message: 'Founder berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof founderService.FounderError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus founder', error: error.message });
  }
};