import { Router } from 'express';
import { 
  createApplication, 
  updateApplication, 
  deleteApplication, 
  getApplication,
  getApplicationById
} from '../controllers/application.controller';
import { 
  createApplicationRules, 
  updateApplicationRules 
} from '../middleware/validation.middleware';

const router = Router();

router.post('/create', createApplicationRules, createApplication)
router.put('/:id', updateApplicationRules, updateApplication)
router.delete('/:id', deleteApplication)
router.get('/getAll', getApplication) 
router.get('/:id', getApplicationById)

export default router
