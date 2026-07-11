import { Request, Response } from 'express';
import * as criteriaService from '../services/criteriaService';

export const getAllCriteriaValues = async (req: Request, res: Response) => {
  try {
    const criteriaIdRaw = req.query.criteria_id;
    const criteriaId = Array.isArray(criteriaIdRaw) ? criteriaIdRaw[0] : criteriaIdRaw;
    const data = await criteriaService.getAllCriteriaValues(
      criteriaId ? Number(criteriaId as string) : undefined
    );
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil data criteria value', error: error.message });
  }
};

export const getCriteriaValueById = async (req: Request, res: Response) => {
  try {
    const data = await criteriaService.getCriteriaValueById(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    if (error instanceof criteriaService.CriteriaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil criteria value', error: error.message });
  }
};

export const createCriteriaValue = async (req: Request, res: Response) => {
  try {
    const { label, nilai, criteria_id } = req.body;
    if (!label || nilai === undefined || !criteria_id) {
      return res.status(400).json({ message: 'label, nilai, dan criteria_id wajib diisi' });
    }
    const data = await criteriaService.createCriteriaValue({
      label,
      nilai: Number(nilai),
      criteria_id: Number(criteria_id),
    });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal membuat criteria value', error: error.message });
  }
};

export const updateCriteriaValue = async (req: Request, res: Response) => {
  try {
    const data = await criteriaService.updateCriteriaValue(Number(req.params.id), req.body);
    res.json(data);
  } catch (error: any) {
    if (error instanceof criteriaService.CriteriaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal update criteria value', error: error.message });
  }
};

export const deleteCriteriaValue = async (req: Request, res: Response) => {
  try {
    await criteriaService.deleteCriteriaValue(Number(req.params.id));
    res.json({ message: 'Criteria value berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof criteriaService.CriteriaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus criteria value', error: error.message });
  }
};