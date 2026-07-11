import bcrypt from 'bcrypt';
import { db } from '../lib/db';
import { CreateUserInput, UpdateUserInput, UpdateProfileInput } from '../types/user';

const userSafeSelect = {
  id: true,
  nama: true,
  email: true,
  role: true,
  created_at: true,
  updated_at: true,
};

export class UserError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

// ==== CRUD Admin ====

export const getAllUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    db.user.findMany({ skip, take: limit, select: userSafeSelect }),
    db.user.count(),
  ]);

  return { data, total, page, limit };
};

export const getUserById = async (id: number) => {
  const user = await db.user.findUnique({ where: { id }, select: userSafeSelect });
  if (!user) throw new UserError(404, 'User tidak ditemukan');
  return user;
};

export const createUser = async (input: CreateUserInput) => {
  const { nama, email, password, role } = input;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) throw new UserError(409, 'Email sudah terdaftar');

  const hashedPassword = await bcrypt.hash(password, 10);

  return db.user.create({
    data: { nama, email, password: hashedPassword, role },
    select: userSafeSelect,
  });
};

export const updateUser = async (id: number, input: UpdateUserInput) => {
  const { nama, email, password, role } = input;

  const dataToUpdate: any = { nama, email, role };
  if (password) {
    dataToUpdate.password = await bcrypt.hash(password, 10);
  }

  try {
    return await db.user.update({
      where: { id },
      data: dataToUpdate,
      select: userSafeSelect,
    });
  } catch (error: any) {
    if (error.code === 'P2025') throw new UserError(404, 'User tidak ditemukan');
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await db.user.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new UserError(404, 'User tidak ditemukan');
    throw error;
  }
};

// ==== Profile (untuk user yang sedang login) ====

export const getProfile = async (userId: number) => {
  const user = await db.user.findUnique({ where: { id: userId }, select: userSafeSelect });
  if (!user) throw new UserError(404, 'User tidak ditemukan');
  return user;
};

export const updateProfile = async (userId: number, input: UpdateProfileInput) => {
  // PENTING: password (kalau ada di input) wajib di-hash dulu, jangan disimpan mentah.
  const { password, ...rest } = input as UpdateProfileInput & { password?: string };

  const dataToUpdate: any = { ...rest };
  if (password) {
    dataToUpdate.password = await bcrypt.hash(password, 10);
  }

  try {
    return await db.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select: userSafeSelect,
    });
  } catch (error: any) {
    if (error.code === 'P2025') throw new UserError(404, 'User tidak ditemukan');
    throw error;
  }
};

export const deleteAccount = async (userId: number) => {
  try {
    await db.user.delete({ where: { id: userId } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new UserError(404, 'User tidak ditemukan');
    throw error;
  }
};