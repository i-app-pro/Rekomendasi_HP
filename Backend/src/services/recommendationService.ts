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

// Bungkus 6 kolom "prefix_c1".."prefix_c6" dari 1 row view jadi 1 objek { c1, c2, ..., c6 }.
// Dipakai supaya frontend/tabel dashboard bisa nge-loop kriteria tanpa hardcode nama kolom.
const pickPerKriteria = (row: any, prefix: string) => ({
  c1: row[`${prefix}_c1`] ?? null,
  c2: row[`${prefix}_c2`] ?? null,
  c3: row[`${prefix}_c3`] ?? null,
  c4: row[`${prefix}_c4`] ?? null,
  c5: row[`${prefix}_c5`] ?? null,
  c6: row[`${prefix}_c6`] ?? null,
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
      nama_customer: item.nama_customer,       // DITAMBAHKAN: sebelumnya ada di view tapi dibuang di sini
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
      nama_customer: item.nama_customer,       // DITAMBAHKAN: sebelumnya ada di view tapi dibuang di sini
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
      nama_customer: item.nama_customer,       // DITAMBAHKAN: sebelumnya ada di view tapi dibuang di sini
      // DITAMBAHKAN: solusi ideal A+ dan A- per kriteria. Sebelumnya kolom-kolom ini
      // (a_plus_c1..c6, a_minus_c1..c6) sudah ADA di view_perhitungan_topsis, tapi
      // fungsi ini tidak pernah meneruskannya ke response -> makanya tidak muncul di dashboard.
      a_plus: pickPerKriteria(item, 'a_plus'),
      a_minus: pickPerKriteria(item, 'a_minus'),
    })
  );
};

// BARU: matriks mentah dari view_alternatif_kriteria_bobot, dipakai khusus tab "Alternatif & Kriteria Bobot" di dashboard admin. 

export const getMatrixAlternatif = async (sessionId: number) => {
  const rows = await db.view_alternatif_kriteria_bobot.findMany({
    where: { session_id: sessionId },
    orderBy: { product_id: 'asc' },
  });

  if (rows.length === 0) {
    throw new RecommendationError(404, 'Belum ada data matriks untuk session ini (pastikan bobot kriteria sudah diisi)');
  }

  // c1..c6 bertipe BigInt di Prisma (lihat schema.prisma) -> wajib dikonversi ke Number
  // sebelum di-JSON-kan, karena BigInt tidak bisa langsung diserialisasi oleh res.json().
  return rows.map((row) => ({
    session_id: row.session_id,
    nama_customer: row.nama_customer,
    product_id: row.product_id,
    nama_produk: row.nama_produk,
    nama_brand: row.nama_brand,
    c1: row.c1 !== null ? Number(row.c1) : null,
    c2: row.c2 !== null ? Number(row.c2) : null,
    c3: row.c3 !== null ? Number(row.c3) : null,
    c4: row.c4 !== null ? Number(row.c4) : null,
    c5: row.c5 !== null ? Number(row.c5) : null,
    c6: row.c6 !== null ? Number(row.c6) : null,
    bobot_c1: row.bobot_c1,
    bobot_c2: row.bobot_c2,
    bobot_c3: row.bobot_c3,
    bobot_c4: row.bobot_c4,
    bobot_c5: row.bobot_c5,
    bobot_c6: row.bobot_c6,
    pref_c1: row.pref_c1,
    pref_c2: row.pref_c2,
    pref_c3: row.pref_c3,
    pref_c4: row.pref_c4,
    pref_c5: row.pref_c5,
    pref_c6: row.pref_c6,
  }));
};

// Default export supaya cocok dengan cara import di recommendationController.ts

const recommendationService = {
  getRekomendasiSAW,
  getRekomendasiWP,
  getRekomendasiTOPSIS,
  getMatrixAlternatif,
  RecommendationError,
};

export default recommendationService;