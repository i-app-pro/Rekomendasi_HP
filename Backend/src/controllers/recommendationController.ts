import { Request, Response } from 'express';
import  recommendationService from '../services/recommendationService';

export const getSAW = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.query.session_id);
    if (!sessionId) return res.status(400).json({ message: 'session_id wajib disertakan' });

    const data = await recommendationService.getRekomendasiSAW(sessionId);
    res.json({ method: 'SAW', session_id: sessionId, data });
  } catch (error: any) {
    if (error instanceof recommendationService.RecommendationError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil rekomendasi SAW', error: error.message });
  }
};

export const getWP = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.query.session_id);
    if (!sessionId) return res.status(400).json({ message: 'session_id wajib disertakan' });

    const data = await recommendationService.getRekomendasiWP(sessionId);
    res.json({ method: 'WP', session_id: sessionId, data });
  } catch (error: any) {
    if (error instanceof recommendationService.RecommendationError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil rekomendasi WP', error: error.message });
  }
};

export const getTOPSIS = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.query.session_id);
    if (!sessionId) return res.status(400).json({ message: 'session_id wajib disertakan' });

    const data = await recommendationService.getRekomendasiTOPSIS(sessionId);
    res.json({ method: 'TOPSIS', session_id: sessionId, data });
  } catch (error: any) {
    if (error instanceof recommendationService.RecommendationError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil rekomendasi TOPSIS', error: error.message });
  }
};