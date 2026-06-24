import { Request, Response } from 'express';
import { prisma } from '../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan password harus diisi",
            });
        }
        // cek exitsing user
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                message: "Email atau password salah",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Email atau password salah",
            });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(200).json({ message: "Login berhasil", user: { id: user.id, name: user.name, email: user.email }, token });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const register = async (req: Request, res: Response) => {
    // menangkap data yang dikirimkan oleh client
    const { name, email, password } = req.body;

    // validasi input user
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Nama, email, dan password harus diisi"
        });
    }

    // cek exsisting user
    // jika user sudah ada, maka kembalikan response error
    // jika user belum ada, maka buat user baru dan simpan ke database
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    if (existingUser) {
        return res.status(400).json({
            message: "Email sudah terdaftar"
        });
    }
    // jika user belum ada, maka buat user baru dan simpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    res.status(201).json({
        message: "User berhasil didaftarkan",
        user: {
            name: newUser.name,
            email: newUser.email
        }
    });
}