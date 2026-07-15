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

// Nilai per kriteria (c1..c6) dibungkus 1 objek, dipakai untuk solusi ideal TOPSIS
// (a_plus/a_minus) dan matriks alternatif -- supaya tidak perlu hardcode "c1", "c2", dst
// di banyak tempat, cukup Object.entries() atau array [1,2,3,4,5,6].map(...)
export interface PerKriteria {
  c1: number | null;
  c2: number | null;
  c3: number | null;
  c4: number | null;
  c5: number | null;
  c6: number | null;
}

// GET /api/recommendation/saw|wp|topsis?session_id=<id>
// Bentuk asli PERSIS sesuai recommendationService.ts (buildCard) di backend —
// flat (bukan nested "product"), dan field "nilai_s"/"a_plus"/"a_minus"/"d_plus"/"d_minus"
// cuma muncul tergantung metode (WP / TOPSIS).
export interface RecommendationItem {
  ranking: number;
  skor: number;
  product_id: number;
  nama_hp: string;
  brand: string;
  nama_customer?: string;
  foto: string | null;
  harga: number;
  spesifikasi: RecommendationSpesifikasi;
  nilai_s?: number;        // hanya ada di response WP
  a_plus?: PerKriteria;    // hanya ada di response TOPSIS (solusi ideal positif)
  a_minus?: PerKriteria;   // hanya ada di response TOPSIS (solusi ideal negatif)
  d_plus?: number;         // hanya ada di response TOPSIS
  d_minus?: number;        // hanya ada di response TOPSIS
}

// GET /api/recommendation/matrix?session_id=<id>
// Baris mentah dari view_alternatif_kriteria_bobot -- matriks dasar per produk
// SEBELUM dihitung dengan metode SAW/WP/TOPSIS manapun.
export interface MatrixAlternatifRow {
  session_id: number;
  nama_customer: string;
  product_id: number;
  nama_produk: string;
  nama_brand: string;
  c1: number | null;
  c2: number | null;
  c3: number | null;
  c4: number | null;
  c5: number | null;
  c6: number | null;
  bobot_c1: number | null;
  bobot_c2: number | null;
  bobot_c3: number | null;
  bobot_c4: number | null;
  bobot_c5: number | null;
  bobot_c6: number | null;
  pref_c1: number | null;
  pref_c2: number | null;
  pref_c3: number | null;
  pref_c4: number | null;
  pref_c5: number | null;
  pref_c6: number | null;
}