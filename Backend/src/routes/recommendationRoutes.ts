import { Router } from 'express';
import { getSAW, getWP, getTOPSIS } from '../controllers/recommendationController';

const router = Router();

router.get('/saw', getSAW);       // GET /api/recommendation/saw?session_id=1
router.get('/wp', getWP);         // GET /api/recommendation/wp?session_id=1
router.get('/topsis', getTOPSIS); // GET /api/recommendation/topsis?session_id=1

export default router;