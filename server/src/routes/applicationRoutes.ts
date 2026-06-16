import { Router } from 'express';
import { createApplication, updateApplication, deleteApplication, getApplication } from '../controllers/applicationController';
import { createApplicationRules } from '../middleware/validationMiddleware';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/create', protect, createApplicationRules, createApplication)
router.put('/:id', protect, updateApplication)
router.delete('/:id', protect, deleteApplication)
router.get('/all', protect, getApplication) 


export default router
