import { Router } from "express";
import {
  DeleteAccount,
  GetMe,
  Login,
  Logout,
  Register,
  UpdateMe,
  UpdatePassword
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import {
  loginRules,
  registerRules,
  updateMeRules,
  updatePassRules
} from "../middleware/validation.middleware";

const router = Router()

router.post('/register', registerRules, Register)
router.post('/login', loginRules, Login)
router.get('/me', protect, GetMe)
router.put('/me/update', protect, updateMeRules, UpdateMe)
router.put('/me/updatePass', protect, updatePassRules, UpdatePassword)
router.delete('/me/delete', protect, DeleteAccount)
router.post('/logout', protect, Logout)


export default router