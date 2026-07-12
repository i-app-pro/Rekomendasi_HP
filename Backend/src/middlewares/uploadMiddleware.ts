import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// uploads/ ada di root project backend (sejajar dengan folder src/), bukan di dalam src/.
// __dirname saat dev (ts-node) = src/middlewares, saat build (dist) = dist/middlewares,
// jadi ../../uploads sama-sama nunjuk ke root project di kedua kondisi.
export const uploadDir = path.join(__dirname, '..', '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung. Gunakan JPG, PNG, WEBP, atau GIF.'));
  }
};

// Dipakai sebagai middleware: upload.single('foto')
// Field 'foto' pada form-data dianggap sebagai file gambar.
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});