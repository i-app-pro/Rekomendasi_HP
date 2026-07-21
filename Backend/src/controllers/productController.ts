import { Request, Response } from 'express';
import * as productService from '../services/productService';
import { resolveFoto, toNumberOrUndefined } from '../utils/resolveFoto';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 1000;

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

// Body bisa berupa JSON biasa (foto = URL string) ATAU multipart/form-data
// (field lain sebagai teks + field "foto" sebagai file). Kedua kasus diproses sama
// karena Multer mengisi req.body dengan field teks form-data, mirip express.json().
function buildProductPayload(req: Request) {
  const b = req.body;
  return {
    nama: b.nama,
    harga: toNumberOrUndefined(b.harga),
    ram: toNumberOrUndefined(b.ram),
    penyimpanan: toNumberOrUndefined(b.penyimpanan),
    baterai: toNumberOrUndefined(b.baterai),
    update_os: toNumberOrUndefined(b.update_os),
    resolusi_kamera: toNumberOrUndefined(b.resolusi_kamera),
    chipset: b.chipset,
    os: b.os,
    tahun_rilis: b.tahun_rilis,
    fast_charging: b.fast_charging,
    display: b.display,
    brands_id: toNumberOrUndefined(b.brands_id),
    foto: resolveFoto(req),
  };
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const payload = buildProductPayload(req);
    const product = await productService.createProduct(payload as any);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: 'Gagal membuat produk', error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const payload = buildProductPayload(req);
    const product = await productService.updateProduct(Number(req.params.id), payload as any);
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