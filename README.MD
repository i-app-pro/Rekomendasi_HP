![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![TiDB Cloud](https://img.shields.io/badge/Database-TiDB%20Cloud-00B3A4?logo=tidb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss)


# 📱 Rekomendasi HP

Sistem Pendukung Keputusan (SPK) berbasis web untuk membantu pengguna memilih smartphone terbaik sesuai kebutuhan menggunakan beberapa metode pengambilan keputusan, yaitu:

- ✅ SAW (Simple Additive Weighting)
- ✅ WP (Weighted Product)
- ✅ TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)

---

## 📖 Deskripsi

Rekomendasi HP merupakan aplikasi web yang dirancang untuk membantu pengguna menentukan smartphone terbaik berdasarkan berbagai kriteria seperti harga, RAM, penyimpanan, baterai, kamera, chipset, dan update sistem operasi.

Pengguna dapat memberikan bobot sesuai kebutuhannya, kemudian sistem akan menghitung dan menampilkan hasil rekomendasi menggunakan tiga metode SPK.

---

## ✨ Fitur

### 👤 User

- Login & Register
- Melihat daftar produk HP
- Memilih kebutuhan
- Memberikan bobot setiap kriteria
- Melihat hasil rekomendasi
- Perbandingan hasil metode SAW, WP, dan TOPSIS
- Detail spesifikasi smartphone

### 👨‍💼 Admin

- Dashboard Admin
- CRUD Produk HP
- CRUD Brand
- CRUD Kriteria
- CRUD Kebutuhan
- Kelola Data User
- Melihat hasil rekomendasi pengguna

---

## ⚙️ Metode SPK

### SAW
Menghitung nilai akhir berdasarkan penjumlahan terbobot dari setiap kriteria.

### Weighted Product (WP)
Menggunakan perkalian nilai atribut yang dipangkatkan dengan bobot masing-masing.

### TOPSIS
Menentukan alternatif terbaik berdasarkan jarak terhadap solusi ideal positif dan negatif.

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- React Hook Form
- Zod

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---

## 🗄️ Database

Project ini menggunakan **TiDB Cloud** sebagai database utama yang kompatibel dengan MySQL serta mendukung skalabilitas tinggi dan performa yang baik.

Database diakses menggunakan **Prisma ORM** sebagai Object Relational Mapping (ORM).

### Struktur Database

Beberapa tabel utama:

- Users
- Produk
- Brand
- Kriteria
- Kebutuhan
- Pembobotan
- Hasil Rekomendasi
            
---
            
## ☁️ Cloud Database

Aplikasi ini menggunakan **TiDB Cloud** sebagai layanan database cloud.

Keunggulan TiDB Cloud:

- Database SQL yang kompatibel dengan MySQL
- High Availability
- Auto Scaling
- Managed Database
- Mendukung koneksi melalui Prisma ORM
- Cocok untuk aplikasi web modern
            
---

            
## 📂 Struktur Project

```
Rekomendasi_HP
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## 🚀 Instalasi

### Clone Repository

```bash
git clone https://github.com/i-app-pro/Rekomendasi_HP.git
```

Masuk ke folder project

```bash
cd Rekomendasi_HP
```

---

### Backend

```bash
cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment

Buat file `.env` pada folder backend.

```env
DATABASE_URL="mysql://username:password@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/rekomendasi_hp?sslaccept=strict"

JWT_SECRET=your_secret_key

PORT=5000
```

> **Catatan:** Ganti `username`, `password`, `host`, dan `database` sesuai dengan konfigurasi TiDB Cloud Anda.

---

## 📊 Kriteria Penilaian

- Harga
- RAM
- Penyimpanan
- Kapasitas Baterai
- Resolusi Kamera
- Chipset
- Update OS

---

## 📸 Tampilan Aplikasi

Tambahkan screenshot aplikasi pada bagian ini.

Contoh:

```
docs/
├── login.png
├── dashboard.png
├── rekomendasi.png
├── admin.png
```

Lalu tampilkan menggunakan:

```md
## Login

![Login](docs/login.png)

## Dashboard

![Dashboard](docs/dashboard.png)
```

---

## 👥 Tim Pengembang

Kelompok Pengembang

- Ramdani Ardin Pasha
- Faizal Isman
- Amirul Madjid Ibrahim

---

## 📄 Lisensi

Project ini dibuat untuk keperluan pembelajaran dan tugas mata kuliah Sistem Pendukung Keputusan.

---

⭐ Jika repository ini bermanfaat, jangan lupa berikan **Star** pada repository GitHub.
