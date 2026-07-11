import type { ApiProduct } from "./product";

export type Atribut = "cost" | "benefit";

// GET /api/criteria
export interface Criteria {
  id: number;
  nama: string;
  atribut: Atribut;
  default_bobot: number;
}

// GET /api/criteria/values/all
export interface CriteriaValue {
  id: number;
  label: string;
  nilai: number;
  criteria_id: number;
}

// POST /api/sessions -> response session milik user yang login
export interface SpkSession {
  id: number;
  user_id?: number;
  created_at?: string;
}

// GET/POST /api/sessions/:id/pembobotan
export interface Pembobotan {
  id: number;
  session_id: number;
  criteria_id: number;
  nilai_bobot: number;
  criteria?: Criteria;
}

// GET /api/recommendation/saw|wp|topsis?session_id=<id>
// ASUMSI bentuk item hasil ranking. Backend SPK biasanya mengembalikan
// array berisi data produk + skor akhir + urutan ranking. Kalau field
// aslinya berbeda (mis. "nilai_preferensi" jadi "score"), cukup sesuaikan
// interface ini + adapter di src/api/recommendation.ts.
export interface RecommendationItem {
  rank: number;
  product: ApiProduct;
  nilai_akhir: number;
}
