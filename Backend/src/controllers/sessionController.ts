import { Request, Response } from 'express';
import * as sessionService from '../services/sessionService';

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const userIdRaw = req.query.user_id;
    const userId = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw;
    const data = await sessionService.getAllSessions(userId ? Number(userId as string) : undefined);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil data session', error: error.message });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const data = await sessionService.getSessionById(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    if (error instanceof sessionService.SessionError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil session', error: error.message });
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ message: 'user_id wajib diisi' });
    const data = await sessionService.createSession({ user_id: Number(user_id) });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal membuat session', error: error.message });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    await sessionService.deleteSession(Number(req.params.id));
    res.json({ message: 'Session berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof sessionService.SessionError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus session', error: error.message });
  }
};

// ==== Pembobotan (nested) ====

export const getPembobotanBySession = async (req: Request, res: Response) => {
  try {
    const data = await sessionService.getPembobotanBySession(Number(req.params.id));
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil pembobotan', error: error.message });
  }
};

export const createPembobotan = async (req: Request, res: Response) => {
  try {
    const sessionId = Number(req.params.id);
    const { criteria_id, nilai_bobot } = req.body;

    if (!criteria_id || nilai_bobot === undefined) {
      return res.status(400).json({ message: 'criteria_id dan nilai_bobot wajib diisi' });
    }

    const data = await sessionService.createPembobotan({
      recommendation_session_id: sessionId,
      criteria_id: Number(criteria_id),
      nilai_bobot: Number(nilai_bobot),
    });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal membuat pembobotan', error: error.message });
  }
};

export const updatePembobotan = async (req: Request, res: Response) => {
  try {
    const { nilai_bobot } = req.body;
    const data = await sessionService.updatePembobotan(Number(req.params.pembobotanId), {
      nilai_bobot: nilai_bobot !== undefined ? Number(nilai_bobot) : undefined,
    });
    res.json(data);
  } catch (error: any) {
    if (error instanceof sessionService.SessionError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal update pembobotan', error: error.message });
  }
};

export const deletePembobotan = async (req: Request, res: Response) => {
  try {
    await sessionService.deletePembobotan(Number(req.params.pembobotanId));
    res.json({ message: 'Pembobotan berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof sessionService.SessionError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus pembobotan', error: error.message });
  }
};