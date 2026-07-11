import { API } from "../lib/axios";
import type { RecommendationItem } from "../types/spk";

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
