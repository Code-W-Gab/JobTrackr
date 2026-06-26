import { Router } from "express";
import { Register, Login, Logout, GetMe, UpdateMe, UpdatePassword} from "../controllers/authController";
import { registerRules, loginRules, updateMeRules, updatePassRules } from "../middleware/validationMiddleware";
import { protect } from "../middleware/authMiddleware";

const router = Router()

router.post('/register', registerRules, Register)
router.post('/login', loginRules, Login)
router.get('/me', protect, GetMe)
router.put('/me/update', protect, updateMeRules, UpdateMe)
router.put('/me/updatePass', protect, updatePassRules, UpdatePassword)
router.post('/logout', protect, Logout)


export default router