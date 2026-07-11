import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await userService.getAllUsers(page, limit);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil data user', error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (error: any) {
    if (error instanceof userService.UserError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil user', error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nama, email, password, role } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ message: 'nama, email, dan password wajib diisi' });
    }

    const user = await userService.createUser({ nama, email, password, role });
    res.status(201).json(user);
  } catch (error: any) {
    if (error instanceof userService.UserError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal membuat user', error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  } catch (error: any) {
    if (error instanceof userService.UserError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal update user', error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    res.json({ message: 'User berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof userService.UserError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus user', error: error.message });
  }
};