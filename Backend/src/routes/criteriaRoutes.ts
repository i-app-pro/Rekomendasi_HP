import { Router } from 'express';
import {
  getAllCriteria, getCriteriaById, createCriteria, updateCriteria, deleteCriteria,
} from '../controllers/criteriaController';
import {
  getAllCriteriaValues, getCriteriaValueById, createCriteriaValue, updateCriteriaValue, deleteCriteriaValue,
} from '../controllers/criteriaValueController';
import { authenticate } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/roleMiddleware';

const router = Router();

// Criteria
router.get('/', getAllCriteria);
router.get('/:id', getCriteriaById);
router.post('/', authenticate, isAdmin, createCriteria);
router.put('/:id', authenticate, isAdmin, updateCriteria);
router.delete('/:id', authenticate, isAdmin, deleteCriteria);

// Criteria Values (nested path: /api/criteria/values/...)
router.get('/values/all', getAllCriteriaValues);
router.get('/values/:id', getCriteriaValueById);
router.post('/values', authenticate, isAdmin, createCriteriaValue);
router.put('/values/:id', authenticate, isAdmin, updateCriteriaValue);
router.delete('/values/:id', authenticate, isAdmin, deleteCriteriaValue);

export default router;