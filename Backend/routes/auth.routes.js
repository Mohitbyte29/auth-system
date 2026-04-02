import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";
import { loginValidation, signUpValidation } from "../middlewares/authValidation.js";

const router = Router();

router.post('/auth/login',loginValidation, login)
router.post('/auth/signup',signUpValidation, signup)

export const authRouter = router
