import { Router } from 'express';
import {
  getAllSessions, getSessionById, createSession, deleteSession,
  getPembobotanBySession, createPembobotan, updatePembobotan, deletePembobotan,
} from '../controllers/sessionController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticate);

// Session
router.get('/', getAllSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.delete('/:id', deleteSession);

// Pembobotan (nested di dalam session)
router.get('/:id/pembobotan', getPembobotanBySession);
router.post('/:id/pembobotan', createPembobotan);
router.put('/pembobotan/:pembobotanId', updatePembobotan);
router.delete('/pembobotan/:pembobotanId', deletePembobotan);

export default router;