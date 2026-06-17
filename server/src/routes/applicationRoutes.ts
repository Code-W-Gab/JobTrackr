import { Router } from 'express';
import { createApplication, updateApplication, deleteApplication, getApplication } from '../controllers/applicationController';
import { createApplicationRules } from '../middleware/validationMiddleware';

const router = Router();

router.post('/create', createApplicationRules, createApplication)
router.put('/:id', updateApplication)
router.delete('/:id', deleteApplication)
router.get('/all', getApplication) 


export default router
