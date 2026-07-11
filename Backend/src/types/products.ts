export interface CreateProductInput {
  nama?: string;
  harga: number;
  ram: number;
  penyimpanan: number;
  baterai: number;
  update_os: number;
  resolusi_kamera: number;
  chipset: string;
  os: string;
  tahun_rilis: string | Date;
  fast_charging: string;
  display: string;
  foto?: string;
  brands_id: number;
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface CreateBrandInput {
  nama: string;
}

export type UpdateBrandInput = Partial<CreateBrandInput>;