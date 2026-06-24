import { Router } from "express";
import authController from "../controllers/authController";
import { registerRules, loginRules } from "../middleware/validationMiddleware";
import { protect } from "../middleware/authMiddleware";

const router = Router()

router.post('/register', registerRules, authController.Register)
router.post('/login', loginRules, authController.Login)
router.get('/me', protect, authController.GetMe)
router.post('/logout', protect, authController.Logout)


export default router