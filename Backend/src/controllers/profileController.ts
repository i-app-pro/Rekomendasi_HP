import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await userService.getProfile(userId);
    res.json(user);
  } catch (error: any) {
    if (error instanceof userService.UserError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil profile', error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { nama, email } = req.body;

    const user = await userService.updateProfile(userId, { nama, email });
    res.json({ message: 'Profil berhasil diperbarui', user });
  } catch (error: any) {
    if (error instanceof userService.UserError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal update profile', error: error.message });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    await userService.deleteAccount(userId);
    res.json({ message: 'Akun berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof userService.UserError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus akun', error: error.message });
  }
};