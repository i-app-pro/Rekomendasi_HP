import { db } from '../lib/db';
import { CreateProductInput, UpdateProductInput } from '../types/products';

export class ProductError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const getAllProducts = async (page: number, limit: number, brandsId?: number) => {
  const skip = (page - 1) * limit;
  const where = brandsId ? { brands_id: brandsId } : undefined;

  const [data, total] = await Promise.all([
    db.products.findMany({ where, skip, take: limit, include: { brands: true } }),
    db.products.count({ where }),
  ]);

  return { data, total, page, limit };
};

export const getProductById = async (id: number) => {
  const product = await db.products.findUnique({ where: { id }, include: { brands: true } });
  if (!product) throw new ProductError(404, 'Produk tidak ditemukan');
  return product;
};

export const createProduct = async (input: CreateProductInput) => {
  return db.products.create({
    data: { ...input, tahun_rilis: new Date(input.tahun_rilis) },
  });
};

export const updateProduct = async (id: number, input: UpdateProductInput) => {
  try {
    return await db.products.update({
      where: { id },
      data: {
        ...input,
        tahun_rilis: input.tahun_rilis ? new Date(input.tahun_rilis) : undefined,
      },
    });
  } catch (error: any) {
    if (error.code === 'P2025') throw new ProductError(404, 'Produk tidak ditemukan');
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await db.products.delete({ where: { id } });
  } catch (error: any) {
    if (error.code === 'P2025') throw new ProductError(404, 'Produk tidak ditemukan');
    throw error;
  }
};