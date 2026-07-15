import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import { db } from './lib/db';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import profileRoutes from './routes/profileRoutes';
import productRoutes from './routes/productRoutes';
import brandRoutes from './routes/brandRoutes';
import criteriaRoutes from './routes/criteriaRoutes';
import sessionRoutes from './routes/sessionRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import founderRoute from './routes/founderRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sajikan file yang di-upload (foto product & founder) secara statis lewat
// http://<host>/uploads/<nama-file>. Folder "uploads" ada di root project backend.
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Rekophone API is running', status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/criteria', criteriaRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use('/api/founders', founderRoute);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Error dari Multer (ukuran file kelewatan, dll) atau dari fileFilter kita
  // (format file tidak didukung) -> balikin 400 dengan pesan yang jelas,
  // bukan 500 generik.
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Upload gagal: ${err.message}` });
  }
  if (err?.message?.includes('Format file tidak didukung')) {
    return res.status(400).json({ message: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// PENTING: Vercel serverless function TIDAK boleh manual app.listen()
// terus-menerus seperti server biasa. Vercel yang mengatur siklus hidup
// request-nya sendiri lewat file di /api yang meng-import `app` ini.
// Jadi app.listen() hanya dijalankan kalau dijalankan lokal (bukan di Vercel).
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });

  process.on('SIGINT', async () => {
    await db.$disconnect();
    process.exit(0);
  });
}

export default app;