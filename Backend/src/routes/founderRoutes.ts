import { Router } from 'express';
import {
  getAllFounders, getFounderById, createFounder, updateFounder, deleteFounder,
} from '../controllers/founderController';
import { authenticate } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/roleMiddleware';

const router = Router();

// Publik: dipakai halaman "Tentang" (klik "Lihat" -> ambil detail developer)
router.get('/', getAllFounders);
router.get('/:id', getFounderById);

// Admin only
router.post('/', authenticate, isAdmin, createFounder);
router.put('/:id', authenticate, isAdmin, updateFounder);
router.delete('/:id', authenticate, isAdmin, deleteFounder);

export default router;