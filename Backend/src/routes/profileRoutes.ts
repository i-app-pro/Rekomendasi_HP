import { Router } from 'express';
import { getProfile, updateProfile, deleteAccount } from '../controllers/profileController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getProfile);
router.put('/', updateProfile);
router.delete('/', deleteAccount);

export default router;