import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100000;
    const brandsIdRaw = req.query.brands_id;
    const brandsId = Array.isArray(brandsIdRaw) ? brandsIdRaw[0] : brandsIdRaw;

    const result = await productService.getAllProducts(
      page,
      limit,
      brandsId ? Number(brandsId as string) : undefined
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal mengambil data produk', error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(Number(req.params.id));
    res.json(product);
  } catch (error: any) {
    if (error instanceof productService.ProductError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal mengambil produk', error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal membuat produk', error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(Number(req.params.id), req.body);
    res.json(product);
  } catch (error: any) {
    if (error instanceof productService.ProductError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal update produk', error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(Number(req.params.id));
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error: any) {
    if (error instanceof productService.ProductError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: 'Gagal menghapus produk', error: error.message });
  }
};
