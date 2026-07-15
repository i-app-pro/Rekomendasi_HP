import { Router } from 'express';
import {
  getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,
} from '../controllers/productController';
import { authenticate } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/roleMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
// upload.single('foto') aman dipakai walau request-nya JSON biasa (bukan multipart):
// Multer akan langsung lewat (next()) kalau Content-Type bukan multipart/form-data,
// jadi client lama yang masih kirim foto sebagai string URL di body JSON tetap jalan.
router.post('/', authenticate, isAdmin, upload.single('foto'), createProduct);
router.put('/:id', authenticate, isAdmin, upload.single('foto'), updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;