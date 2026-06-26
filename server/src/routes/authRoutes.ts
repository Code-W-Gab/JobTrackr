import { Router } from "express";
import { Register, Login, Logout, GetMe, UpdateMe} from "../controllers/authController";
import { registerRules, loginRules, updateMeRules } from "../middleware/validationMiddleware";
import { protect } from "../middleware/authMiddleware";

const router = Router()

router.post('/register', registerRules, Register)
router.post('/login', loginRules, Login)
router.get('/me', protect, GetMe)
router.put('/me/update', protect, updateMeRules, UpdateMe)
router.post('/logout', protect, Logout)


export default router