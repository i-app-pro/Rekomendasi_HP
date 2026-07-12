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

// GET /api/sessions/:id/preferences
export interface SpkPreference {
  id: number;
  session_id: number;
  criteria_value_id: number;
  criteriaValue?: CriteriaValue;
}

// Bentuk objek "spesifikasi" di dalam tiap item hasil rekomendasi
// (lihat buildCard() di recommendationService.ts backend)
export interface RecommendationSpesifikasi {
  ram: number | string;
  penyimpanan: number | string;
  baterai: number | string;
  kamera: number | string;
  chipset: string;
  update_os: number | string;
}

// GET /api/recommendation/saw|wp|topsis?session_id=<id>
// Bentuk asli PERSIS sesuai recommendationService.ts (buildCard) di backend —
// flat (bukan nested "product"), dan field "nilai_s"/"d_plus"/"d_minus"
// cuma muncul tergantung metode (WP / TOPSIS).
export interface RecommendationItem {
  ranking: number;
  skor: number;
  product_id: number;
  nama_hp: string;
  brand: string;
  foto: string | null;
  harga: number;
  spesifikasi: RecommendationSpesifikasi;
  nilai_s?: number;   // hanya ada di response WP
  d_plus?: number;    // hanya ada di response TOPSIS
  d_minus?: number;   // hanya ada di response TOPSIS
}