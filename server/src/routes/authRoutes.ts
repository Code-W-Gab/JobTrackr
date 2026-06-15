import { Router } from "express";
import authController from "../controllers/autoController";

const router = Router()

router.post('/register', authController.Register)

export default router