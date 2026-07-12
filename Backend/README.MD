# Rekophone Backend API

Backend untuk sistem rekomendasi pembelian HP menggunakan metode **SAW**, **WP**, dan **TOPSIS**.

## Tech Stack
- Node.js + Express + TypeScript
- Prisma ORM
- MySQL (TiDB Cloud)
- JWT untuk autentikasi
- bcrypt untuk hashing password

## Menjalankan Project

```bash
npm install
npx prisma generate
npm run dev
```

Server berjalan di `http://localhost:3000` (diatur lewat `.env` → `PORT=3000`).

## Autentikasi

Sebagian besar endpoint butuh header berikut setelah login:

```
Authorization: Bearer <token>
```

Token didapat dari response `POST /api/auth/login`. Role user (`customers` / `admin`) ikut tersimpan di dalam token, jadi setiap ganti role harus login ulang untuk dapat token baru.

Untuk membuat akun admin: register seperti biasa, lalu ubah `role` jadi `admin` langsung di database, baru login ulang.

## Daftar Endpoint

| No | Endpoint | Method | Login? | Role |
|----|----------|--------|--------|------|
| 1 | `/` | GET | ❌ | Publik |
| 2 | `/api/auth/register` | POST | ❌ | Publik |
| 3 | `/api/auth/login` | POST | ❌ | Publik |
| 4 | `/api/profile` | GET | ✅ | Customer & Admin |
| 5 | `/api/profile` | PUT | ✅ | Customer & Admin |
| 6 | `/api/profile` | DELETE | ✅ | Customer & Admin |
| 7 | `/api/users` | GET | ✅ | Admin only |
| 8 | `/api/users/:id` | GET | ✅ | Admin only |
| 9 | `/api/users` | POST | ✅ | Admin only |
| 10 | `/api/users/:id` | PUT | ✅ | Admin only |
| 11 | `/api/users/:id` | DELETE | ✅ | Admin only |
| 12 | `/api/products` | GET | ❌ | Publik |
| 13 | `/api/products/:id` | GET | ❌ | Publik |
| 14 | `/api/products` | POST | ✅ | Admin only |
| 15 | `/api/products/:id` | PUT | ✅ | Admin only |
| 16 | `/api/products/:id` | DELETE | ✅ | Admin only |
| 17 | `/api/brands` | GET | ❌ | Publik |
| 18 | `/api/brands/:id` | GET | ❌ | Publik |
| 19 | `/api/brands` | POST | ✅ | Admin only |
| 20 | `/api/brands/:id` | PUT | ✅ | Admin only |
| 21 | `/api/brands/:id` | DELETE | ✅ | Admin only |
| 22 | `/api/criteria` | GET | ❌ | Publik |
| 23 | `/api/criteria/:id` | GET | ❌ | Publik |
| 24 | `/api/criteria` | POST | ✅ | Admin only |
| 25 | `/api/criteria/:id` | PUT | ✅ | Admin only |
| 26 | `/api/criteria/:id` | DELETE | ✅ | Admin only |
| 27 | `/api/criteria/values/all` | GET | ❌ | Publik |
| 28 | `/api/criteria/values/:id` | GET | ❌ | Publik |
| 29 | `/api/criteria/values` | POST | ✅ | Admin only |
| 30 | `/api/criteria/values/:id` | PUT | ✅ | Admin only |
| 31 | `/api/criteria/values/:id` | DELETE | ✅ | Admin only |
| 32 | `/api/sessions` | GET | ✅ | Customer & Admin |
| 33 | `/api/sessions/:id` | GET | ✅ | Customer & Admin |
| 34 | `/api/sessions` | POST | ✅ | Customer & Admin |
| 35 | `/api/sessions/:id` | DELETE | ✅ | Customer & Admin |
| 36 | `/api/sessions/:id/pembobotan` | GET | ✅ | Customer & Admin |
| 37 | `/api/sessions/:id/pembobotan` | POST | ✅ | Customer & Admin |
| 38 | `/api/sessions/pembobotan/:id` | PUT | ✅ | Customer & Admin |
| 39 | `/api/sessions/pembobotan/:id` | DELETE | ✅ | Customer & Admin |
| 40 | `/api/recommendation/saw` | GET | ✅ | Customer & Admin |
| 41 | `/api/recommendation/wp` | GET | ✅ | Customer & Admin |
| 42 | `/api/recommendation/topsis` | GET | ✅ | Customer & Admin |
| 43 | `/api/founders` | GET | ❌ | Publik |
| 44 | `/api/founders/:id` | GET | ❌ | Publik |
| 45 | `/api/founders` | POST | ✅ | Admin only |
| 46 | `/api/founders/:id` | PUT | ✅ | Admin only |
| 47 | `/api/founders/:id` | DELETE | ✅ | Admin only |

## Contoh Body Request

### Auth
```json
// POST /api/auth/register
{
  "nama": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

// POST /api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Users (admin)
```json
// POST /api/users
{
  "nama": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "customers"
}

// PUT /api/users/1
{
  "nama": "Nama Diupdate",
  "role": "admin"
}
```

### Profile
```json
// PUT /api/profile
{
  "nama": "Nama Baru Saya",
  "password": "passwordBaru123"
}
```

### Brands (admin)
```json
// POST /api/brands
{
  "nama": "Samsung"
}
```

### Products (admin)
```json
// POST /api/products
{
  "nama": "Galaxy S24",
  "harga": 12000000,
  "ram": 8,
  "penyimpanan": 256,
  "baterai": 4000,
  "update_os": 3,
  "resolusi_kamera": 50,
  "chipset": "Snapdragon 8 Gen 3",
  "os": "Android 14",
  "tahun_rilis": "2024-01-17T00:00:00.000Z",
  "fast_charging": "25W",
  "display": "AMOLED 6.2 inch",
  "brands_id": 1
}
```

### Criteria (admin)
`atribut` hanya boleh `"cost"` atau `"benefit"`.
```json
// POST /api/criteria
{
  "nama": "Harga",
  "atribut": "cost",
  "default_bobot": 5
}
```

### Criteria Values (admin)
```json
// POST /api/criteria/values
{
  "label": "Murah (< 3 juta)",
  "nilai": 1,
  "criteria_id": 1
}
```

### Sessions & Pembobotan
`POST /api/sessions` tidak perlu body — sesi otomatis terikat ke user yang login.
```json
// POST /api/sessions/1/pembobotan
{
  "criteria_id": 1,
  "nilai_bobot": 5
}
```

### Founders (admin)
```json
// POST /api/founders
{
  "nama": "John Doe",
  "status": "Backend Developer",
  "universitas": "Universitas Contoh",
  "framework": "Express + Prisma + TypeScript",
  "username_ig": "johndoe",
  "email": "john@example.com",
  "github": "johndoe"
}
```

## Alur Testing yang Disarankan

1. `GET /` — pastikan server hidup.
2. `POST /api/auth/register` — buat akun.
3. `POST /api/auth/login` — dapatkan token, set di Postman tab **Authorization → Bearer Token**.
4. Test resource publik (`products`, `brands`, `criteria`, `founders`).
5. `POST /api/sessions` → `POST /api/sessions/:id/pembobotan` (isi bobot tiap kriteria).
6. `GET /api/recommendation/saw|wp|topsis?session_id=<id>` untuk lihat hasil rekomendasi.
7. Untuk endpoint admin-only, pastikan akun yang login rolenya `admin` (ubah manual di database lalu login ulang).

## Postman Collection

Gunakan file `Rekophone_API.postman_collection.json` yang sudah disediakan — variable `{{token}}` otomatis terisi setelah request **Login** dijalankan.