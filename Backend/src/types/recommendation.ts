export interface CreateSessionInput {
  user_id: number;
}

export interface CreatePembobotanInput {
  recommendation_session_id: number;
  criteria_id: number;
  nilai_bobot: number;
}

export type UpdatePembobotanInput = Partial<Pick<CreatePembobotanInput, 'nilai_bobot'>>;

export interface HasilSAW {
  session_id: number;
  nama_customer: string;
  product_id: number;
  nama_produk: string;
  nama_brand: string;
  nilai_saw: number;
  ranking_saw: number;
}

export interface HasilWP {
  session_id: number;
  nama_customer: string;
  product_id: number;
  nama_produk: string;
  nama_brand: string;
  nilai_s: number;
  nilai_v: number;
  ranking: number;
}

// Nilai kriteria kategorisasi (c1..c6), bobot (bobot_c1..c6), atau solusi ideal
// (a_plus_c1..c6 / a_minus_c1..c6) per kriteria. Dipakai supaya frontend tidak perlu
// tahu nama kolom literal "c1", "c2", dst — cukup iterasi objek ini.
export interface PerKriteria {
  c1: number | null;
  c2: number | null;
  c3: number | null;
  c4: number | null;
  c5: number | null;
  c6: number | null;
}

export interface HasilTOPSIS {
  session_id: number;
  nama_customer: string;
  product_id: number;
  nama_produk: string;
  nama_brand: string;
  a_plus: PerKriteria;   // solusi ideal positif (A+) per kriteria — dari view_perhitungan_topsis
  a_minus: PerKriteria;  // solusi ideal negatif (A-) per kriteria — dari view_perhitungan_topsis
  d_plus: number;
  d_minus: number;
  nilai_topsis: number;
  ranking_topsis: number;
}

// Baris mentah dari view_alternatif_kriteria_bobot — matriks dasar sebelum dihitung
// dengan metode SAW/WP/TOPSIS manapun. c1..c6 = nilai kategorisasi kriteria per produk,
// bobot_c1..c6 = bobot yang diset admin/user untuk sesi ini, pref_c1..c6 = preferensi
// (nilai kriteria_value) yang dipilih user untuk sesi ini (bisa null kalau tidak diisi).
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