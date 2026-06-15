import { Router } from "express";
import authController from "../controllers/autoController";
import { registerRules } from "../middleware/validationMiddleware";

const router = Router()

router.post('/register', registerRules, authController.Register)

export default router