import { Router } from 'express';
import {
  getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand,
} from '../controllers/brandController';
import { authenticate } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/roleMiddleware';

const router = Router();

router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.post('/', authenticate, isAdmin, createBrand);
router.put('/:id', authenticate, isAdmin, updateBrand);
router.delete('/:id', authenticate, isAdmin, deleteBrand);

export default router;