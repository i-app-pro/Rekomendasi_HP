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

export interface HasilTOPSIS {
  session_id: number;
  nama_customer: string;
  product_id: number;
  nama_produk: string;
  nama_brand: string;
  d_plus: number;
  d_minus: number;
  nilai_topsis: number;
  ranking_topsis: number;
}