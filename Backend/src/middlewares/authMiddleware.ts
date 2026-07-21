import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 1. MIDDLEWARE UNTUK MENGECEK APAKAH USER SUDAH LOGIN (Bisa dipakai Customer & Admin)
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Jika headernya masih kosong
    if (!authHeader) {
        return res.status(401).json({
            message: "Token tidak ditemukan",
        });
    }

    // Dapatkan token (split dari format "Bearer <token>")
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Format token tidak valid",
        });
    }

    // Jika tokennya ada, maka cocokkan dengan secret key yang ada di .env 
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        // Menyimpan data hasil dekode token (userId, role) ke dalam objek req.user
        (req as any).user = decoded;

        // Lanjut ke middleware berikutnya atau ke controller
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Token tidak valid atau telah kadaluwarsa",
        });
    }
};

// 2. MIDDLEWARE KHUSUS UNTUK MEMPROTEKSI DASHBOARD ADMIN (Gambar 1)
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Pastikan req.user sudah diisi oleh middleware 'authenticate' sebelumnya
    const user = (req as any).user;

    if (!user || user.role !== 'admin') {
        return res.status(403).json({
            message: "Akses ditolak! Endpoint ini hanya dapat diakses oleh Admin.",
        });
    }

    // Jika role-nya valid sebagai admin, izinkan akses ke fungsi CRUD
    next();
};