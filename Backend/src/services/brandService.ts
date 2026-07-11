import { db } from '../lib/db';
import { CreateBrandInput, UpdateBrandInput } from "../types/products";

export class BrandError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const getAllBrands = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    db.brands.findMany({ skip, take: limit }),
    db.brands.count(),
  ]);

  return { data, total, page, limit };
};

export const getBrandById = async (id: number) => {
  const brand = await db.brands.findUnique({ where: { id }, include: { products: true } });
  if (!brand) throw new BrandError(404, 'Brand tidak ditemukan');
  return brand;
};

export const createBrand = async (input: CreateBrandInput) => {
  return db.brands.create({ data: input });
};

export const updateBrand = async (id: number, input: UpdateBrandInput) => {
  try {
    return await db.brands.update({ where: { id }, data: input });
  } catch (error: any) {
    if (error.code === 'P2025') throw new BrandError(404, 'Brand tidak ditemukan');
    throw error;
  }
};

export const deleteBrand = async (id: number) => {
  try {
    await db.brands.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new BrandError(404, 'Brand tidak ditemukan');
    if (error.code === 'P2003') throw new BrandError(409, 'Brand tidak bisa dihapus karena masih dipakai produk lain');
    throw error;
  }
};