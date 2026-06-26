import { Router } from 'express';
import { 
  createApplication, 
  updateApplication, 
  deleteApplication, 
  getApplication,
  getApplicationById
} from '../controllers/applicationController';
import { createApplicationRules, updateApplicationRules } from '../middleware/validationMiddleware';

const router = Router();

router.post('/create', createApplicationRules, createApplication)
router.put('/:id', updateApplicationRules, updateApplication)
router.delete('/:id', deleteApplication)
router.get('/getAll', getApplication) 
router.get('/:id', getApplicationById)

export default router
