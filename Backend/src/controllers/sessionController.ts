import { Request, Response } from 'express';
import * as sessionService from '../services/sessionService';

// Helper kecil: ambil user dari req (sudah di-set oleh middleware `authenticate`)
function getAuthUser(req: Request): { id: number; role: string } {
  return (req as any).user;
}

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const authUser = getAuthUser(req);

    // Customer hanya boleh lihat sesi miliknya sendiri.
    // Admin boleh filter by user_id (query) atau lihat semua kalau tidak diisi.
    let userId: number | undefined;
    if (authUser.role === 'admin') {
      const userIdRaw = req.query.user_id;
      const raw = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw;
      userId = raw ? Number(raw as string) : undefined;
    } else {
      userId = authUser.id;
    }

    const data = await sessionService.getAllSessions(userId);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil data session', error: error.message });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const authUser = getAuthUser(req);
    const data = await sessionService.getSessionById(Number(req.params.id));

    // Cegah IDOR: customer hanya boleh akses sesi miliknya sendiri.
    if (authUser.role !== 'admin' && data.user_id !== authUser.id) {
      return res.status(403).json({ message: 'Kamu tidak punya akses ke session ini' });
    }

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
    const authUser = getAuthUser(req);
    // user_id SELALU dari token, bukan dari body — mencegah user membuat
    // sesi atas nama user lain.
    const data = await sessionService.createSession({ user_id: authUser.id });
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal membuat session', error: error.message });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const authUser = getAuthUser(req);
    const sessionId = Number(req.params.id);

    // Fetch dulu untuk cek kepemilikan sebelum dihapus.
    const existing = await sessionService.getSessionById(sessionId);
    if (authUser.role !== 'admin' && existing.user_id !== authUser.id) {
      return res.status(403).json({ message: 'Kamu tidak punya akses ke session ini' });
    }

    await sessionService.deleteSession(sessionId);
    res.json({ message: 'Session berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof sessionService.SessionError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus session', error: error.message });
  }
};

// ==== Pembobotan (nested) — tidak diubah untuk sekarang, lihat catatan di bawah ====

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

export const getPreferencesBySession = async (req: Request, res: Response) => {
  try {
    const authUser = getAuthUser(req);
    const sessionId = Number(req.params.id);
    const session = await sessionService.getSessionById(sessionId);

    if (authUser.role !== 'admin' && session.user_id !== authUser.id) {
      return res.status(403).json({ message: 'Kamu tidak punya akses ke session ini' });
    }

    const data = await sessionService.getUserPreferencesBySession(sessionId);
    res.json(data);
  } catch (error: any) {
    if (error instanceof sessionService.SessionError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil preferensi', error: error.message });
  }
};

export const setPreference = async (req: Request, res: Response) => {
  try {
    const authUser = getAuthUser(req);
    const sessionId = Number(req.params.id);
    const session = await sessionService.getSessionById(sessionId);

    if (authUser.role !== 'admin' && session.user_id !== authUser.id) {
      return res.status(403).json({ message: 'Kamu tidak punya akses ke session ini' });
    }

    const { criteria_value_id } = req.body;
    if (!criteria_value_id) {
      return res.status(400).json({ message: 'criteria_value_id wajib diisi' });
    }

    const data = await sessionService.setUserPreference(sessionId, Number(criteria_value_id));
    res.status(201).json(data);
  } catch (error: any) {
    if (error instanceof sessionService.SessionError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menyimpan preferensi', error: error.message });
  }
};

export const deletePreference = async (req: Request, res: Response) => {
  try {
    await sessionService.deleteUserPreference(Number(req.params.preferenceId));
    res.json({ message: 'Preferensi berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof sessionService.SessionError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus preferensi', error: error.message });
  }
};