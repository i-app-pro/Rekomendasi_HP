import { API } from "../lib/axios";
import type { Pembobotan, SpkSession, SpkPreference } from "../types/spk";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

// GET /api/sessions - daftar sesi milik user yang login (admin & customer sama-sama lihat sesinya sendiri)
export async function getSessions(): Promise<SpkSession[]> {
  const res = await API.get("/sessions");
  return unwrap<SpkSession[]>(res.data);
}

// GET /api/sessions/:id - detail 1 sesi
export async function getSessionById(id: number): Promise<SpkSession> {
  const res = await API.get(`/sessions/${id}`);
  return unwrap<SpkSession>(res.data);
}

// POST /api/sessions - tidak perlu body, otomatis terikat ke user yang login
export async function createSession(): Promise<SpkSession> {
  const res = await API.post("/sessions", {});
  return unwrap<SpkSession>(res.data);
}

// DELETE /api/sessions/:id
export async function deleteSession(id: number): Promise<void> {
  await API.delete(`/sessions/${id}`);
}

// GET /api/sessions/:id/pembobotan - lihat semua bobot kriteria yang sudah diset untuk 1 sesi
export async function getPembobotanBySession(sessionId: number): Promise<Pembobotan[]> {
  const res = await API.get(`/sessions/${sessionId}/pembobotan`);
  return unwrap<Pembobotan[]>(res.data);
}

// PUT /api/sessions/pembobotan/:id - update nilai_bobot 1 baris pembobotan
export async function updatePembobotan(
  pembobotanId: number,
  nilaiBobot: number
): Promise<Pembobotan> {
  const res = await API.put(`/sessions/pembobotan/${pembobotanId}`, {
    nilai_bobot: nilaiBobot,
  });
  return unwrap<Pembobotan>(res.data);
}

// DELETE /api/sessions/pembobotan/:id
export async function deletePembobotan(pembobotanId: number): Promise<void> {
  await API.delete(`/sessions/pembobotan/${pembobotanId}`);
}

// GET /api/sessions/:id/preferences - preferensi spek yang tersimpan untuk 1 sesi
export async function getPreferences(sessionId: number): Promise<SpkPreference[]> {
  const res = await API.get(`/sessions/${sessionId}/preferences`);
  return unwrap<SpkPreference[]>(res.data);
}

// DELETE /api/sessions/preferences/:preferenceId
export async function deletePreference(preferenceId: number): Promise<void> {
  await API.delete(`/sessions/preferences/${preferenceId}`);
}

// POST /api/sessions/:id/pembobotan  { criteria_id, nilai_bobot }
export async function setPembobotan(
  sessionId: number,
  criteriaId: number,
  nilaiBobot: number
): Promise<Pembobotan> {
  const res = await API.post(`/sessions/${sessionId}/pembobotan`, {
    criteria_id: criteriaId,
    nilai_bobot: nilaiBobot,
  });
  return unwrap<Pembobotan>(res.data);
}

// Kirim semua bobot kriteria sekaligus (dipanggil berurutan tiap kriteria)
export async function submitAllPembobotan(
  sessionId: number,
  bobotPerCriteria: { criteriaId: number; nilaiBobot: number }[]
): Promise<void> {
  for (const item of bobotPerCriteria) {
    await setPembobotan(sessionId, item.criteriaId, item.nilaiBobot);
  }
}


// POST /api/sessions/:id/preferences  { criteria_value_id }
export async function setPreference(
  sessionId: number,
  criteriaValueId: number
): Promise<void> {
  await API.post(`/sessions/${sessionId}/preferences`, {
    criteria_value_id: criteriaValueId,
  });
}

// Kirim semua preferensi yang dipilih user sekaligus (dipanggil berurutan per kriteria)
export async function submitAllPreferences(
  sessionId: number,
  criteriaValueIds: number[]
): Promise<void> {
  for (const id of criteriaValueIds) {
    await setPreference(sessionId, id);
  }
}