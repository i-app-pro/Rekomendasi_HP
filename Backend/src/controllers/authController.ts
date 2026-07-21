import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ message: 'nama, email, dan password wajib diisi' });
    }

    const user = await authService.registerUser({ nama, email, password });
    res.status(201).json({ message: 'Registrasi berhasil', user });
  } catch (error: any) {
    if (error instanceof authService.AuthError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal melakukan registrasi', error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const result = await authService.loginUser({ email, password });
    res.status(200).json({ message: 'Login berhasil', ...result });
  } catch (error: any) {
    if (error instanceof authService.AuthError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal melakukan login', error: error.message });
  }
};