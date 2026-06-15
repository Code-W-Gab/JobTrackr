import { Router } from "express";
import authController from "../controllers/autoController";
import { registerRules, loginRules } from "../middleware/validationMiddleware";

const router = Router()

router.post('/register', registerRules, authController.Register)
router.post('/login', loginRules, authController.Login)


export default router