import { db } from '../lib/db';

export class RecommendationError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

const getSpesifikasi = async (productIds: number[]) => {
  const products = await db.products.findMany({ where: { id: { in: productIds } } });
  return new Map(products.map((p) => [p.id, p]));
};

const buildCard = (p: any, extra: Record<string, any>) => ({
  ...extra,
  foto: p?.foto ?? null,
  harga: p?.harga ?? 0, // DITAMBAHKAN: sebelumnya tidak ada, padahal ProductData di frontend wajib butuh ini
  spesifikasi: {
    ram: p?.ram ?? '-',
    penyimpanan: p?.penyimpanan ?? '-',
    baterai: p?.baterai ?? '-',
    kamera: p?.resolusi_kamera ?? '-',
    chipset: p?.chipset ?? '-',
    update_os: p?.update_os ?? '-',
  },
});

export const getRekomendasiSAW = async (sessionId: number) => {
  const rows = await db.view_perhitungan_saw.findMany({
    where: { session_id: sessionId },
    orderBy: { ranking_saw: 'asc' },
  });

  if (rows.length === 0) throw new RecommendationError(404, 'Belum ada hasil SAW untuk session ini');

  const productMap = await getSpesifikasi(rows.map((r) => r.product_id!));

  return rows.map((item) =>
    buildCard(productMap.get(item.product_id!), {
      ranking: Number(item.ranking_saw),       // bigint -> number
      skor: Number(item.nilai_saw),            // Decimal -> number
      product_id: item.product_id,
      nama_hp: item.nama_produk,
      brand: item.nama_brand,
    })
  );
};

export const getRekomendasiWP = async (sessionId: number) => {
  const rows = await db.view_perhitungan_wp.findMany({
    where: { session_id: sessionId },
    orderBy: { ranking: 'asc' },
  });

  if (rows.length === 0) throw new RecommendationError(404, 'Belum ada hasil WP untuk session ini');

  const productMap = await getSpesifikasi(rows.map((r) => r.product_id!));

  return rows.map((item) =>
    buildCard(productMap.get(item.product_id!), {
      ranking: Number(item.ranking),           // bigint -> number
      skor: item.nilai_v,                      // Float, aman
      nilai_s: item.nilai_s,                   // Float, aman
      product_id: item.product_id,
      nama_hp: item.nama_produk,
      brand: item.nama_brand,
    })
  );
};

export const getRekomendasiTOPSIS = async (sessionId: number) => {
  const rows = await db.view_perhitungan_topsis.findMany({
    where: { session_id: sessionId },
    orderBy: { ranking_topsis: 'asc' },
  });

  if (rows.length === 0) throw new RecommendationError(404, 'Belum ada hasil TOPSIS untuk session ini');

  const productMap = await getSpesifikasi(rows.map((r) => r.product_id!));

  return rows.map((item) =>
    buildCard(productMap.get(item.product_id!), {
      ranking: Number(item.ranking_topsis),    // bigint -> number
      skor: item.nilai_topsis,                 // Float, aman
      d_plus: item.d_plus,                     // Float, aman
      d_minus: item.d_minus,                   // Float, aman
      product_id: item.product_id,
      nama_hp: item.nama_produk,
      brand: item.nama_brand,
    })
  );
};

// Default export supaya cocok dengan cara import di recommendationController.ts
// (`import recommendationService from '...'`). Named export di atas tetap
// dipertahankan kalau ada file lain yang pakai itu.
const recommendationService = {
  getRekomendasiSAW,
  getRekomendasiWP,
  getRekomendasiTOPSIS,
  RecommendationError,
};

export default recommendationService;