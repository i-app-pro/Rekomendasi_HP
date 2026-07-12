import { db } from '../lib/db';
import { CreateFounderInput, UpdateFounderInput } from '../types/founder';

export class FounderError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const getAllFounders = async () => {
  return db.founder.findMany({ orderBy: { id: 'asc' } });
};

export const getFounderById = async (id: number) => {
  const founder = await db.founder.findUnique({ where: { id } });
  if (!founder) throw new FounderError(404, 'Founder tidak ditemukan');
  return founder;
};

export const createFounder = async (input: CreateFounderInput) => {
  return db.founder.create({ data: input });
};

export const updateFounder = async (id: number, input: UpdateFounderInput) => {
  try {
    return await db.founder.update({ where: { id }, data: input });
  } catch (error: any) {
    if (error.code === 'P2025') throw new FounderError(404, 'Founder tidak ditemukan');
    throw error;
  }
};

export const deleteFounder = async (id: number) => {
  try {
    await db.founder.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new FounderError(404, 'Founder tidak ditemukan');
    throw error;
  }
};