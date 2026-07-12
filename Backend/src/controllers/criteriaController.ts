import { Request, Response } from 'express';
import * as criteriaService from '../services/criteriaService';

export const getAllCriteria = async (req: Request, res: Response) => {
  try {
    const data = await criteriaService.getAllCriteria();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil data criteria', error: error.message });
  }
};

export const getCriteriaById = async (req: Request, res: Response) => {
  try {
    const data = await criteriaService.getCriteriaById(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    if (error instanceof criteriaService.CriteriaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil criteria', error: error.message });
  }
};

export const createCriteria = async (req: Request, res: Response) => {
  try {
    const { nama, atribut, default_bobot } = req.body;
    if (!nama || !atribut || default_bobot === undefined) {
      return res.status(400).json({ message: 'nama, atribut, dan default_bobot wajib diisi' });
    }
    const data = await criteriaService.createCriteria({ nama, atribut, default_bobot: Number(default_bobot) });
    res.status(201).json(data);
  } catch (error: any) {
    if (error instanceof criteriaService.CriteriaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal membuat criteria', error: error.message });
  }
};

export const updateCriteria = async (req: Request, res: Response) => {
  try {
    const data = await criteriaService.updateCriteria(Number(req.params.id), req.body);
    res.json(data);
  } catch (error: any) {
    if (error instanceof criteriaService.CriteriaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal update criteria', error: error.message });
  }
};

export const deleteCriteria = async (req: Request, res: Response) => {
  try {
    await criteriaService.deleteCriteria(Number(req.params.id));
    res.json({ message: 'Criteria berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof criteriaService.CriteriaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus criteria', error: error.message });
  }
};