import { Request, Response } from 'express';
import * as brandService from '../services/brandService';

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await brandService.getAllBrands(page, limit);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil data brand', error: error.message });
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const brand = await brandService.getBrandById(Number(req.params.id));
    res.json(brand);
  } catch (error: any) {
    if (error instanceof brandService.BrandError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil brand', error: error.message });
  }
};

export const createBrand = async (req: Request, res: Response) => {
  try {
    if (!req.body.nama) return res.status(400).json({ message: 'nama wajib diisi' });
    const brand = await brandService.createBrand(req.body);
    res.status(201).json(brand);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal membuat brand', error: error.message });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const brand = await brandService.updateBrand(Number(req.params.id), req.body);
    res.json(brand);
  } catch (error: any) {
    if (error instanceof brandService.BrandError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal update brand', error: error.message });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    await brandService.deleteBrand(Number(req.params.id));
    res.json({ message: 'Brand berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof brandService.BrandError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus brand', error: error.message });
  }
};