import { API } from "../lib/axios";
import type { Pembobotan, SpkSession } from "../types/spk";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

// POST /api/sessions - tidak perlu body, otomatis terikat ke user yang login
export async function createSession(): Promise<SpkSession> {
  const res = await API.post("/sessions", {});
  return unwrap<SpkSession>(res.data);
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