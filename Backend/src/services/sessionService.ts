import { db } from '../lib/db';
import { CreateSessionInput, CreatePembobotanInput, UpdatePembobotanInput } from '../types/recommendation';

export class SessionError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

// ==== RecommendationSession ====

export const getAllSessions = async (userId?: number) => {
  return db.recommendationSession.findMany({
    where: userId ? { user_id: userId } : undefined,
    include: { user: { select: { id: true, nama: true, email: true } } },
  });
};

export const getSessionById = async (id: number) => {
  const session = await db.recommendationSession.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, nama: true, email: true } },
      pembobotan: { include: { criteria: true } },
    },
  });
  if (!session) throw new SessionError(404, 'Session tidak ditemukan');
  return session;
};

export const createSession = async (input: CreateSessionInput) => {
  return db.recommendationSession.create({ data: { user_id: input.user_id } });
};

export const deleteSession = async (id: number) => {
  try {
    await db.recommendationSession.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new SessionError(404, 'Session tidak ditemukan');
    throw error;
  }
};

// ==== Pembobotan (nested di dalam session) ====

export const getPembobotanBySession = async (sessionId: number) => {
  return db.pembobotan.findMany({
    where: { recommendation_session_id: sessionId },
    include: { criteria: true },
  });
};

export const createPembobotan = async (input: CreatePembobotanInput) => {
  return db.pembobotan.create({ data: input });
};

export const updatePembobotan = async (id: number, input: UpdatePembobotanInput) => {
  try {
    return await db.pembobotan.update({ where: { id }, data: input });
  } catch (error: any) {
    if (error.code === 'P2025') throw new SessionError(404, 'Pembobotan tidak ditemukan');
    throw error;
  }
};

export const deletePembobotan = async (id: number) => {
  try {
    await db.pembobotan.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new SessionError(404, 'Pembobotan tidak ditemukan');
    throw error;
  }
};

// ==== User Preferences (nested di dalam session) ====

export const getUserPreferencesBySession = async (sessionId: number) => {
  return db.userPreferences.findMany({
    where: { recommendation_session_id: sessionId },
    include: { criteria_value: { include: { criteria: true } } },
  });
};

// Satu kriteria hanya boleh punya SATU preferensi aktif per session.
// Kalau user pilih ulang (ganti dropdown), preferensi lama untuk
// kriteria yang sama dihapus dulu supaya tidak ada duplikat/ambigu.
export const setUserPreference = async (sessionId: number, criteriaValueId: number) => {
  const criteriaValue = await db.criteriaValue.findUnique({ where: { id: criteriaValueId } });
  if (!criteriaValue) throw new SessionError(404, 'Criteria value tidak ditemukan');

  await db.userPreferences.deleteMany({
    where: {
      recommendation_session_id: sessionId,
      criteria_value: { criteria_id: criteriaValue.criteria_id },
    },
  });

  return db.userPreferences.create({
    data: {
      recommendation_session_id: sessionId,
      criteria_value_id: criteriaValueId,
    },
  });
};

export const deleteUserPreference = async (id: number) => {
  try {
    await db.userPreferences.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new SessionError(404, 'Preferensi tidak ditemukan');
    throw error;
  }
};