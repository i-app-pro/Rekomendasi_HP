import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// BUAT FUNGSI MIDDLEWARE UNTUK AUTENTIKASI
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // LOGIC NYA DISINI
    const authHeader = req.headers.authorization;

    // jika headernya masih kosong
    if (!authHeader) {
        return res.status(401).json({
            message: "Token tidak ditemukan",
        });
    }

    // dapatkan token
    const token = authHeader.split(" ")[1];


    if (!token) {
        return res.status(401).json({
            message: "Format token tidak valid",
        });
    }

    //jika tokennya ada, maka cocokkan dengan secret key yang ada di .env 
    try {
        // cocokkan pasword yang dikirimkan dengan password yang ada di database
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );

        (req as any).user = decoded;

        // jika password nya sama maka lanjut ke controller selanjutnya
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Token tidak valid",
        });
    }
};