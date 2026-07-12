// =========================================================
// ProductData -> shape yang dipakai komponen UI (CardProduk, CardDetail, dll)
// Dipertahankan agar komponen yang sudah ada tidak perlu diubah.
// =========================================================
export interface ProductData {
  id: string | number;
  nama: string;
  brand: string;
  harga: number;
  ram: string;
  penyimpanan: string;
  kamera: string;
  baterai: string;
  updateOs: string;
  nanometer?: string;
  chipset: string;
  os?: string;
  fastCharging?: string;
  display?: string;
  imageUrl: string;
  tahunrilis?: string;
}

// =========================================================
// Brand -> sesuai tabel `brands` (GET /api/brands)
// =========================================================
export interface Brand {
  id: number;
  nama: string;
}

// =========================================================
// ApiProduct -> field mentah sesuai body contoh POST /api/products di README
// (nama, harga, ram, penyimpanan, baterai, update_os, resolusi_kamera, chipset,
//  os, tahun_rilis, fast_charging, display, brands_id)
// Backend diasumsikan meng-include relasi `brand` saat GET /api/products.
// =========================================================
export interface ApiProduct {
  id: number;
  nama: string;
  harga: number;
  ram: number;
  penyimpanan: number;
  baterai: number;
  update_os: number;
  resolusi_kamera: number;
  chipset: string;
  os: string;
  tahun_rilis: string;
  fast_charging: string;
  display: string;
  brands_id: number;
  brand?: Brand;
}

// Placeholder gambar produk (backend tidak menyimpan foto produk).
// Ganti / tambahkan mapping per-brand di sini kalau nanti ada asset resmi.
import placeholderImg from "../assets/brand/reko.png";
import type { RecommendationItem } from "./spk";

// Mengubah data mentah dari backend (ApiProduct) menjadi ProductData
// yang dipahami oleh komponen UI (CardProduk, CardDetail, DetailProduk).
// `resolvedBrand` opsional: kirim ini kalau GET /api/products TIDAK meng-include
// relasi brand (cuma balikin `brands_id`), supaya nama brand tetap benar
// (join manual pakai hasil GET /api/brands di halaman pemanggilnya).
export function mapApiProductToProductData(p: ApiProduct, resolvedBrand?: Brand): ProductData {
  return {
    id: p.id,
    nama: p.nama,
    brand: resolvedBrand?.nama ?? p.brand?.nama ?? "Lainnya",
    harga: p.harga,
    ram: `${p.ram} GB`,
    penyimpanan: `${p.penyimpanan} GB`,
    kamera: `${p.resolusi_kamera} MP`,
    baterai: `${p.baterai} mAh`,
    updateOs: `${p.update_os} Tahun`,
    chipset: p.chipset,
    os: p.os,
    fastCharging: p.fast_charging,
    display: p.display,
    imageUrl: placeholderImg,
    tahunrilis: p.tahun_rilis ? new Date(p.tahun_rilis).getFullYear().toString() : undefined,
  };
}

// Mengubah 1 item hasil SAW/WP/TOPSIS (bentuk FLAT dari recommendationService
// backend: ranking, skor, product_id, nama_hp, brand, foto, harga, spesifikasi)
// menjadi ProductData yang dipahami komponen UI (CardProduk, CardDetail).
// DITAMBAHKAN — sebelumnya HalamanRekomendasi.tsx salah pakai
// mapApiProductToProductData() dengan asumsi bentuk data nested "product"
// yang sebenarnya tidak pernah dikirim backend.
export function mapRecommendationItemToProductData(item: RecommendationItem): ProductData {
  return {
    id: item.product_id,
    nama: item.nama_hp,
    brand: item.brand,
    harga: item.harga,
    ram: `${item.spesifikasi.ram} GB`,
    penyimpanan: `${item.spesifikasi.penyimpanan} GB`,
    kamera: `${item.spesifikasi.kamera} MP`,
    baterai: `${item.spesifikasi.baterai} mAh`,
    updateOs: `${item.spesifikasi.update_os} Tahun`,
    chipset: item.spesifikasi.chipset,
    imageUrl: item.foto || placeholderImg,
  };
}