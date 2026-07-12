# Catatan Perubahan Frontend (integrasi ke backend Express + TiDB)

Scope yang dikerjakan: **Auth (login/register/token)** + **halaman customer**
(Beranda, Produk, Rekomendasi) dipasang ke API asli. Dashboard admin CRUD
**belum** dikerjakan (belum diminta) — file `layout/DashboardLayout.tsx`
sengaja dibiarkan kosong.

## 1. Dependensi baru yang WAJIB di-install
```bash
npm install zustand
```
`useAuthStore` pakai zustand (state management ringan untuk token & user).
Kalau kamu sudah lain preferensi (Context API, dll), kasih tau saja, gampang diganti.

## 2. File yang diisi dari kosong
- `src/lib/axios.ts` → baseURL default `http://localhost:3000/api` (sebelumnya
  salah, mengarah ke `:8000`). Sekarang otomatis kirim header
  `Authorization: Bearer <token>` di tiap request, dan auto-logout kalau dapat 401.
- `src/store/useAuthStore.ts` → state `token`, `user`, fungsi `login()`,
  `register()`, `logout()`. Disimpan ke localStorage (key `rekophone-auth`)
  supaya sesi tidak hilang saat refresh.
- `src/routes/ProtectedRoute.tsx` → dipakai membungkus route yang wajib login
  (dipasang di `/rekomendasi`, karena endpoint sessions/pembobotan/recommendation
  butuh token).
- `src/types/auth.ts` → tipe `User`, `LoginPayload`, `RegisterPayload`, dll.

## 3. File baru
- `src/types/spk.ts` — tipe `Criteria`, `CriteriaValue`, `SpkSession`,
  `Pembobotan`, `RecommendationItem`.
- `src/api/*.ts` — wrapper axios per resource: `auth.ts`, `products.ts`,
  `brands.ts`, `criteria.ts`, `sessions.ts`, `recommendation.ts`.
- `.env.example` — cara override `VITE_API_BASE_URL` kalau backend tidak di
  localhost:3000.

## 4. File yang diubah
- `src/types/product.ts` — tetap ada `ProductData` (dipakai komponen UI lama
  seperti `CardProduk`, `CardDetail`), ditambah `ApiProduct` (bentuk mentah dari
  backend) + `mapApiProductToProductData()` supaya nggak perlu ubah komponen kartu.
- `src/pages/main/Beranda.tsx`, `src/pages/main/Produk.tsx` — fetch
  `GET /api/products` asli, hapus data dummy.
- `src/pages/main/Rekomendasi.tsx` — alur SPK real:
  1. `GET /api/criteria` → render slider bobot per kriteria (dinamis, bukan
     hardcode lagi).
  2. Klik **"Cari Rekomendasi"** → `POST /api/sessions` → kirim tiap bobot lewat
     `POST /api/sessions/:id/pembobotan` → `GET /api/recommendation/<method>?session_id=`.
  3. Ganti tab WP/SAW/TOPSIS → refetch hasil pakai session yang sama (tidak
     bikin session baru tiap ganti tab).
- `src/pages/auth/LoginForm.tsx`, `RegisterForm.tsx` — submit ke
  `useAuthStore().login()/register()`, redirect ke `/`, tampilkan error dari backend.
- `src/components/ui/Navbar.tsx` — kalau sudah login, tombol "Login/Register"
  berubah jadi nama user + tombol Logout.
- `src/App.tsx` — bungkus `/rekomendasi` dengan `<ProtectedRoute />`.

## 5. Asumsi yang PERLU kamu cek ke Postman (karena aku tidak lihat kode controller asli)
Backend README hanya menjelaskan endpoint & contoh body, bukan bentuk response.
Aku asumsikan pola umum Express: `{ message: "...", data: {...} }`. Semua fungsi
di `src/api/*.ts` sudah pakai helper `unwrap()` yang otomatis coba `res.data.data`
lalu fallback ke `res.data` langsung — jadi kemungkinan besar tetap jalan walau
tidak persis dibungkus `data`. Yang paling perlu kamu cek manual di Postman:

1. **`RecommendationItem`** (`src/types/spk.ts`) — aku asumsikan tiap item hasil
   ranking berbentuk `{ rank, product, nilai_akhir }`. Kalau field aslinya beda
   (misal `skor` bukan `nilai_akhir`, atau produk ada di field `produk` bukan
   `product`), tinggal sesuaikan interface ini + 1 baris map di `Rekomendasi.tsx`.
2. **`ApiProduct.brand`** — aku asumsikan `GET /api/products` meng-include relasi
   brand (`{ ...produk, brand: { id, nama } }`). Kalau ternyata cuma
   `brands_id` tanpa nama brand, tinggal fetch `GET /api/brands` sekali lalu
   join manual di frontend (aku bisa bantu tambahkan kalau perlu).
3. **`SpkSession.id`** — asumsi `POST /api/sessions` balikin object session yang
   punya field `id`.
4. Produk di backend **tidak punya field gambar**, jadi semua kartu produk pakai
   1 gambar placeholder (`assets/brand/reko.png`). Kalau mau tiap produk/brand
   punya foto beda, kasih tau — aku bisa bikin mapping per brand atau tambah
   input upload gambar di admin nanti.

## 6. Yang belum dikerjakan (di luar scope kali ini)
- Dashboard admin (CRUD products/brands/criteria/users/founders) — file
  `DashboardLayout.tsx` masih kosong.
- Halaman Profile (`GET/PUT/DELETE /api/profile`).
- Halaman detail produk sebagai route terpisah (`DetailProduk.tsx` saat ini
  cuma dipakai sebagai modal lewat `CardDetail.tsx`, sudah otomatis kepakai).

Kalau mau lanjut ke bagian dashboard admin atau profile, tinggal bilang aja ya.
