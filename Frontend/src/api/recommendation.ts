import { API } from "../lib/axios";
import type { RecommendationItem, MatrixAlternatifRow } from "../types/spk";

export type SpkMethod = "saw" | "wp" | "topsis";

function unwrap<T>(payload: any): T {
  return (payload?.data ?? payload) as T;
}

export async function getRecommendation(
  method: SpkMethod,
  sessionId: number
): Promise<RecommendationItem[]> {
  const res = await API.get(`/recommendation/${method}`, {
    params: { session_id: sessionId },
  });
  return unwrap<RecommendationItem[]>(res.data);
}

// GET /api/recommendation/matrix?session_id=<id>
// Matriks mentah view_alternatif_kriteria_bobot (c1..c6, bobot, preferensi per produk),
// dipakai khusus tab "Alternatif & Kriteria Bobot" di dashboard admin.
export async function getMatrixAlternatif(sessionId: number): Promise<MatrixAlternatifRow[]> {
  const res = await API.get(`/recommendation/matrix`, {
    params: { session_id: sessionId },
  });
  return unwrap<MatrixAlternatifRow[]>(res.data);
}